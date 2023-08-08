import { ConnectButton } from "@rainbow-me/rainbowkit";

export function TopBar() {
  return (
    <div className="flex flex-row justify-end p-4">
      <ConnectButton />
    </div>
  );
}
