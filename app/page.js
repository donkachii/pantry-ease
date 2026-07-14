import { SESSION_COOKIE_NAME } from "../constant";
import { cookies } from "next/headers";
import Homepage from "../components/Homepage";
import { parseSession } from "../libs/parse-session";

export default function Home() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  const session = parseSession(sessionCookie);

  return (
    <>
      <Homepage session={session} />
    </>
  );
}
