import MainLayout from "./layout/Layout";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../../constant";
import { parseSession } from "../../libs/parse-session";

export default function DashboardLayout({ children }) {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  const session = parseSession(sessionCookie);

  return <MainLayout session={session}>{children}</MainLayout>;
}
