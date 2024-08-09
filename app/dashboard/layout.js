import MainLayout from "./layout/Layout";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../../constant";

export default function DashboardLayout({ children }) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  return <MainLayout session={session}> {children} </MainLayout>;
}
