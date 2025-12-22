import { LoginForm } from "./login-form";

type SearchParams = {
  next?: string | string[];
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const next = typeof sp?.next === "string" ? sp.next : undefined;
  return <LoginForm next={next} />;
}


