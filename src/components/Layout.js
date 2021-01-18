import Head from "next/head";
import Signin from "../components/Signin";

export default function Layout() {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Signin />
    </div>
  );
}
