import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Providers } from "./providers";
import { TopBar } from "../components/TopBar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-white via-white to-orange-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
