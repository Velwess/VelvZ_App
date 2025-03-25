import {is, OfType} from "@velz/common/lib/middleware/with-payload.ts";
import {NextApiRequest, NextApiResponse} from "next";

export function withQuery<T>(type: OfType<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RQ extends NextApiRequest>(next: (req: RQ & { readonly query: Readonly<T> }, res: NextApiResponse) => any) => {
    return (req: NextApiRequest, res: NextApiResponse) => {
      const query: Partial<Record<string, string>> = [...new URL(req.url!).searchParams.entries()]
        .reduce((_, [key, value]) => ({..._, [key]: value}), {});

      return is(query, type)
        ? next(Object.assign(req as RQ, {query}), res)
        : Response.json({status: 'ERROR', meta: {links: {self: req.url}}}, {status: 422});
    };
  };
}
