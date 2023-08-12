import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Providers } from "./providers";
import { TopBar } from "../components/TopBar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-amber-600	">
        <Providers>
          <TopBar />
          <div className="flex flex-grow place-content-center p-4">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
