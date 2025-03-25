import {is, OfType} from "@velz/common/lib/middleware/with-payload.ts";
import {NextApiRequest, NextApiResponse} from "next";
import {atob} from "node:buffer";

export function withJwt<U, RQ extends NextApiRequest, RS extends NextApiResponse>
(next: (req: RQ & { readonly jwt: Readonly<{ claims: Claims; token: string }> }, res: RS) => U) {
  return async (req: NextApiRequest, res: RS): Promise<U | Response> => {
    let claims: Claims;
    const [, token, disclaims = btoa('{}')] = (req as never as { headers: { get(name: string): string | null } }).headers
      .get('authorization')?.match(/^Bearer (.*\.(.*)\..*)$/) ?? [];

    try {
      claims = JSON.parse(atob(disclaims));
      if (!(is(claims, CLAIMS) && Date.now() < (claims.exp * 1_000))) throw void 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return Response.json({status: 'ERROR', meta: {links: {self: req.url}}}, {status: 401});
    }

    return next(Object.assign(req as RQ, {jwt: {token, claims}}), res);
  };
}

export const CLAIMS = {
  user_metadata: {email_verified: is.boolean, phone_verified: is.boolean, email: is.string, sub: is.string},
  app_metadata: {providers: is.arrayOf(is.string), provider: is.string},
  amr: is.arrayOf({method: is.string, timestamp: is.finite}),
  is_anonymous: is.boolean,
  session_id: is.string,
  phone: is.string,
  email: is.string,
  role: is.string,
  aal: is.string,
  aud: is.string,
  exp: is.number,
  iat: is.number,
  sub: is.string,
  iss: is.string,
} as const;

export type Claims = typeof CLAIMS extends OfType<infer I> ? I : never;
