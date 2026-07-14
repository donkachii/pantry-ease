import DashboardPage from "./components/dashboard/Dashboard";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../../constant";
import { parseSession } from "../../libs/parse-session";

const Dashboard = () => {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  const session = parseSession(sessionCookie);
  return <DashboardPage session={session} />;
};

export default Dashboard;
