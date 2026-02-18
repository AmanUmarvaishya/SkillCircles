
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosConfig() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <></>
  );
}
