import DashboardPage from "./components/dashboard/Dashboard";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../../constant";

const Dashboard = () => {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return <DashboardPage session={JSON.parse(session)} />;
};

export default Dashboard;
