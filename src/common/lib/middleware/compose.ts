import {NextApiRequest, NextApiResponse} from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function compose<const M extends readonly Middleware<any>[]>(middlewares: M, fn: Handler<MiddlewareRequestIntersect<M>>) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    middlewares.reduce((previous, current) =>
      withinBoundary(current(previous)), fn)(req as MiddlewareRequestIntersect<M>, res);
}

function withinBoundary(fn: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await fn(req, res);
      // @ts-expect-error: TS1196: Catch clause variable type annotation must be any or unknown if specified.
    } catch (e: never) {
      let code: undefined | string;
      console.error(e);
      switch (e?.code) {
        case 'PGRST301':
          return Response.json({
            meta: {links: {self: req.url}},
            content: {code: e?.code},
            status: 'ERROR',
          }, {status: 401});
        case 'validation_failed':
          switch (e?.message) {
            case 'An email address is too long':
              code = 'too_long_email';
              break;
            case 'Signup requires a valid password':
              code = 'invalid_password';
              break;
            case 'Password cannot be longer than 72 characters':
              code = 'too_long_password';
              break;
          }
          break;
        case 'weak_password':
          switch (e?.message) {
            case 'Password should be at least 6 characters.':
              code = 'too_short_password';
              break;
          }
      }
      return Response.json({
        content: code ? {code} : undefined,
        meta: {links: {self: req.url}},
        status: 'ERROR',
      }, {status: code ? 422 : 500});
    }
  }
}

type Middleware<RQ extends NextApiRequest = NextApiRequest> = (next: Handler<RQ>) => Handler;
type Handler<RQ extends NextApiRequest = NextApiRequest> = (req: RQ, res: NextApiResponse) => unknown;

type MiddlewareRequestIntersect<M, R = unknown> = M extends readonly [Middleware<infer I>, ...infer MM]
  ? MiddlewareRequestIntersect<MM, I & R>
  : R;
