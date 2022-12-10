import Router from "next/router";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Router.push("/");
  }, []);

  return <div>home</div>;
}
