import NotFound from "@/components/NotFound";
import HeroSub from "@/SharedComponent/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page ",
};

const ErrorPage = () => {
  return (
    <>
      <HeroSub
        title="404"
      />
      <NotFound />
    </>
  );
};

export default ErrorPage;
