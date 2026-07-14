import Items from "../../../components/AllItems";
import { SESSION_COOKIE_NAME } from "../../../constant";
import { cookies } from "next/headers";
import { parseSession } from "../../../libs/parse-session";

const AllItems = () => {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  const session = parseSession(sessionCookie);
  return (
    <>
      <Items session={session} />
    </>
  );
};

export default AllItems;
