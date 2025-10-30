import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainDashboard } from "./MainDashboard";
import { RightSidebar } from "./RightSidebar";

// Bezpieczny Dashboard z domyślnymi wartościami i obsługą błędów
export default function Dashboard({ children }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-slate-100 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-red-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-red-600 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-red-700 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-red-800 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-red-500 font-mono text-sm tracking-wider">
              Odświeżanie danych
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4 relative z-10">
        <Header />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            {children || <MainDashboard />}
          </div>
          <div className="col-span-12 lg:col-span-3">
            <RightSidebar currentTime={currentTime} />
          </div>
        </div>
      </div>
    </div>
  );
}
