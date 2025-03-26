import RootClientLayout from "@velz/app/layout.client.tsx";
import {ReactNode} from "react";
import {ApiResponse, Category} from "@velz/common/lib/database.types.ts";
import {cookies} from "next/headers";
import {is} from "@velz/common/lib/middleware/with-payload.ts";

export default async function RootLayout({children}: { children: ReactNode }) {
  const {PORT = 3000} = process.env;
  let favouriteDealIds: string[] = [];
  const {content: categories = []} = await fetch(`http://0.0.0.0:${PORT}/api/categories`)
    .then(_ => _.json() as Promise<ApiResponse<Category[]>>);

  try {
    const parsed = JSON.parse((await cookies()).get('favouriteDealIds')?.value ?? '[]');
    if (is(parsed, is.arrayOf(is.string))) favouriteDealIds = parsed as string[];
  } catch (_: any) {// eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  }

  return <RootClientLayout {...{children, categories, favouriteDealIds}}/>
}
