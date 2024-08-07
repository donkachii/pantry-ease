import { SESSION_COOKIE_NAME } from "../constant";
import { cookies } from "next/headers";
import Homepage from "../components/Homepage";

export default function Home() {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  console.log("🚀 ~ Home ~ session:", session);

  return (
    <>
      <Homepage session={session} />
    </>
  );
}
