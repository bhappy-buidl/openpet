"use client";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <div className="rainbow-bg"></div>
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
              <button className="mt-4 bg-indigo-500 rounded-br-lg p-2 px-5 hover:bg-indigo-700 transition ease-in-out duration-200 rounded text-white">
                Get Started
              </button>
            </a>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img src="your-image.jpg" alt="Your Image" className="w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
