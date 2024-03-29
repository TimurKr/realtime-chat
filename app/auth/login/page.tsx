import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createServerSupabase, getServerUser } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default function Login({
  searchParams,
}: {
  searchParams: { redirectUrl: string };
}) {
  const logIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createServerSupabase(cookies());

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    redirect(searchParams.redirectUrl || "/dashboard");
  };

  return (
    <div className="grid h-full w-full animate-in place-content-center">
      <LoginForm action={logIn} />
      <Link
        href="/auth/signup"
        className="mt-2 rounded-lg p-2 text-center text-sm tracking-wide text-gray-500 transition-all hover:text-gray-700 hover:underline"
      >
        Vytvoriť účet
      </Link>
    </div>
  );
}
