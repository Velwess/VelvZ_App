import {Review} from "../lib/database.types.ts";
import {useContext, useEffect, useState} from "react";
import {Star} from "lucide-react";
import {UserContext} from "../domain/context.ts";
import {supabase} from "../lib/supabase.ts";

export function ReviewComponent({dealId}: { dealId: string }) {
  const {user} = useContext(UserContext);
  const [pending, setPending] = useState(false);
  const [review, setReview] = useState<Review | null>();
  const [visibleForm, setVisibleForm] = useState(false);
  const [form, setForm] = useState<Partial<Pick<Review, 'id' | 'deal_id' | 'user_id' | 'rating' | 'comment'>>>({rating: 5});

  useEffect(() => {
    if (!review) return;
    setVisibleForm(!!review.id);
    setForm(review);
  }, [review]);
  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from('reviews')
      .select().match({deal_id: dealId, user_id: user.id})
      .maybeSingle().then(({data}) => setReview(data as any))
  }, [dealId, user?.id]);

  return <div className="text-right my-4 pl-4">
    <button
      className="px-4 py-2 text-white rounded-full transition-colors font-medium disabled:bg-gray-300 bg-[#E6A4B4] hover:bg-[#DA70D6]"
      onClick={visibleForm ? () => {
        setPending(true);
        (async () => {
          if (user?.id) {
            if ((form as any)?.id)
              await supabase.from('reviews')
                .update({comment: form.comment, rating: form.rating, deal_id: dealId, user_id: user.id})
                .eq('id', form.id!);
            else await supabase.from('reviews').insert({...form, deal_id: dealId, user_id: user.id});
            setPending(false);
          }
        })();
      } : () => setVisibleForm(true)}
      disabled={!(user) || pending}>
      {visibleForm ? review?.id ? 'Modifier' : 'Publier' : user ? 'Je laisse une revue' : '(Je me connecte et laisse une revue)'}
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
