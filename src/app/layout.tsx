import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Providers } from "./providers";
import { TopBar } from "../components/TopBar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          {/* <TopBar /> */}
            {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
