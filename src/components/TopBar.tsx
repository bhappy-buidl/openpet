import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import openPetLogo from "../app/openpet-logo.png";

export function TopBar() {
  const [scrolling, setScrolling] = useState<boolean>(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrolling(position > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full z-50 transition-all flex ${
        scrolling ? "fixed top-0 bg-white" : ""
      }`}
    >
      <div
        className={`flex flex-row flex-grow place-content-between items-center max-w-screen-xl mx-auto ${
          scrolling ? "py-2" : "p-4"
        }`}
      >
        <div className={`flex-grow ${scrolling ? "lg:flex-grow-0" : ""}`}>
          <a
            href={!scrolling ? "/" : undefined}
            className="flex justify-center lg:justify-start"
          >
            <Image
              onClick={() =>
                scrolling &&
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              width={scrolling ? 30 : 50}
              height={scrolling ? 30 : 50}
              alt="OpenPet Logo"
              src={openPetLogo}
            />
          </a>
        </div>
        {!scrolling && <ConnectButton />}
      </div>
    </div>
  );
}
