import Items from "../components/AllItems";
import { SESSION_COOKIE_NAME } from "../../../constant";
import { cookies } from "next/headers";

const AllItems = () => {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <>
      <Items session={session} />
    </>
  );
};

export default AllItems;
