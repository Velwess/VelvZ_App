import {is, OfType} from "@velz/common/lib/middleware/with-payload.ts";
import {NextApiRequest, NextApiResponse} from "next";

export function withPath<T>(type: OfType<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RQ extends NextApiRequest>(next: (req: RQ & { readonly path: Readonly<T> }, res: NextApiResponse) => any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      let path: T;
      try {
        path = await (res as never as {params: Promise<never>}).params;
        if (!is(path, type)) throw void 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        return Response.json({status: 'ERROR', meta: {links: {self: req.url}}}, {status: 422});
      }

      return next(Object.assign(req as RQ, {path}), res);
    };
  };
}
