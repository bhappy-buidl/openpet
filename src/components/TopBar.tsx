import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import openPetLogo from "../app/openpet-logo.png";

export function TopBar() {
  return (
    <div className="w-full flex">
      <div className="flex flex-row flex-grow place-content-between p-4 items-center max-w-screen-xl mx-auto">
        <a href="/">
          <Image width={50} height={50} alt="OpenPet Logo" src={openPetLogo} />
        </a>
        <ConnectButton />
      </div>
    </div>
  );
}
