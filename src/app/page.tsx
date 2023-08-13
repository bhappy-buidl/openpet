"use client";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <div className="flex flex-col flex-grow justify-center">
        <div className="flex flex-row items-center justify-center max-w-screen-xl mx-auto">
          <div className="w-full md:w-1/2">
            <h1 className="text-7xl font-bold">
              Simple,
              <br />
              transparent <br />
              pet records.
            </h1>
            <p className="text-lg mt-4 font-light w-3/4">
              Giving pet owners and veterinarians the trust and confidence they
              need in managing pet care
            </p>
            <a href="/mypets">
              <button className="mt-4 bg-orange-500 rounded-lg p-2 px-4 hover:bg-orange-300 text-white button-grow drop-shadow-md">
                Get Started
              </button>
            </a>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <video
              src="https://www.youtube.com/watch?v=OvrGNZHdAJI"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
