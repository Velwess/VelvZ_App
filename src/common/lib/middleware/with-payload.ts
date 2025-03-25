/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextApiRequest, NextApiResponse} from "next";


export function withPayload<T = unknown>(type: OfType<T>) {
  return <RQ extends NextApiRequest>(next: (req: RQ & {
    readonly payload: Readonly<T>
  }, res: NextApiResponse) => any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      let payload: T;
      try {
        payload = await (req as never as { json(): Promise<any> }).json();
        if (!(!type || is(payload, type))) throw void 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        return Response.json({status: 'ERROR', meta: {links: {self: req.url}}}, {status: 422});
      }

      return next(Object.assign(req as RQ, {payload}), res);
    }
  }
}

export type OfType<T> = { (obj: any): obj is T } | { [K in keyof T]: OfType<T[K]> }

export function is<T>(obj: any, ofType: OfType<T>): obj is T {
  return 'object' === typeof ofType
    ? Array.isArray(ofType)
      ? Array.isArray(obj) && ofType.every((ofType, i) => is(obj[i], ofType)) && ofType.length === obj.length
      : 'object' === typeof obj && Object.entries(ofType).every(([key, ofType]) => is(obj[key], ofType as OfType<unknown>))
    : ofType(obj);
}

is.enum = function <const T extends readonly string[]>(members: T) {
    return function (obj: any): obj is T[number] {
      return members.includes(obj);
  };
};
is.arrayOf = function <T>(ofType: OfType<T>) {
  return function (obj: any): obj is readonly T[] {
    return is.array(obj) && obj.every(_ => is(_, ofType));
  };
};
is.array = function (obj: any): obj is readonly unknown[] {
  return Array.isArray(obj);
};
is.string = function (obj: any): obj is string {
  return 'string' === typeof obj || obj instanceof String;
}
is.boolean = function (obj: any): obj is boolean {
  return true === obj || false === obj;
};
is.finite = function (obj: any): obj is number {
  return isFinite(obj);
};
is.number = function (obj: any): obj is number {
  return 'number' === typeof obj;
};
is.optional = {
  enum: function <const T extends readonly string[]>(members: T) {
    return function (obj: any): obj is (T[number] | undefined) {
      return void 0 === obj || is.enum(members)(obj);
    };
  },
  string: function(obj: any): obj is (string | undefined) {
    return void 0 === obj || is.string(obj);
  },
};
