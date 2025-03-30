import {ApiResponse, Review} from "@velz/common/lib/database.types.ts";
import {SessionContext} from "@velz/common/domain/context.ts";
import {useContext, useEffect, useState} from "react";
import {Star} from "lucide-react";

export function ReviewComponent({dealId, onUpdate}: { dealId: string, onUpdate?: () => void }) {
  const [form, setForm] = useState<Partial<Pick<Review, 'rating' | 'comment'>>>({rating: 5});
  const [review, setReview] = useState<Review | null>(null);
  const [visibleForm, setVisibleForm] = useState(false);
  const [pending, setPending] = useState(false);
  const {session} = useContext(SessionContext);

  useEffect(() => {
    if (!review) return;
    setVisibleForm(!!review.id);
    setForm(review);
  }, [review]);
  useEffect(() => {
    if (!session?.access_token) return;
    fetch(`/api/deals/${dealId}/review`, {headers: {Authorization: `Bearer ${session.access_token}`}, method: 'GET'})
      .then(res => res.json() as Promise<ApiResponse<Review>>)
      .then(({status, content}) => setReview('SUCCESS' === status ? content : null));
  }, [dealId, session?.access_token]);

  return <div className="text-right my-4 pl-4">
    <button
      className="px-4 py-2 text-white rounded-full transition-colors font-medium disabled:bg-gray-300 bg-[#E6A4B4] hover:bg-[#DA70D6]"
      onClick={visibleForm ? () => {
        if (!session?.access_token) return;
        setPending(true);
        fetch(`/api/deals/${dealId}/review`, {
          body: JSON.stringify({comment: form.comment, rating: form.rating}),
          headers: {Authorization: `Bearer ${session.access_token}`},
          method: 'PATCH',
        })
          .then(() => onUpdate?.())
          // TODO: handler failure
          .finally(() => setPending(false));
      } : () => setVisibleForm(true)}
      disabled={!session?.access_token || pending}>
      {visibleForm
        ? review?.id
          ? 'Modifier'
          : 'Publier'
        : session?.access_token
          ? 'Je laisse une revue'
          : 'Je laisse une revue'}
    </button>

    {visibleForm && <>
      <div>
        {[...Array(5)].map((_, i) => i + 1).map(i => <Star
          className={['text-[#FFD700] inline-block mr-1', i <= (form.rating ?? 1) ? 'fill-[#FFD700]' : ''].join(' ')}
          onClick={() => setForm({...form, rating: i})}
          key={i}/>)}
      </div>
      <textarea className="px-2 py-1 my-4 w-full border rounded drop-shadow"
                onChange={e => setForm({...form, comment: e.target.value})}
                value={form.comment ??= ''}/>
    </>}
  </div>;
}
