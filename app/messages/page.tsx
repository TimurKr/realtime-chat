import { getServerUser } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Messages() {
  const user = await getServerUser(cookies());
  return <div>Messages for: {user?.email}</div>;
}
