import { useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainDashboard } from "./MainDashboard";
import { RightSidebar } from "./RightSidebar";

// Klasa Particle dla efektu tła
class Particle {
  constructor(canvas, index = 0) {
    if (!canvas) {
      this.x = 0;
      this.y = 0;
      this.size = 1;
      this.speedX = 0;
      this.speedY = 0;
      this.color = "rgba(255,255,255,0.2)";
      return;
    }
    this.canvas = canvas;
    this.index = index;
    // Zahardcodowane wartości zamiast losowych
    this.x = (index * 10) % canvas.width;
    this.y = (index * 15) % canvas.height;
    this.size = 2;
    this.speedX = 0.1;
    this.speedY = 0.1;
    // Kolor będzie ustawiony przez context
    this.color = "rgba(150, 200, 220, 0.3)";
  }

  update() {
    if (!this.canvas) return;
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    if (this.y < 0) this.y = this.canvas.height;
  }

  draw(ctx) {
    if (!ctx) return;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Bezpieczny Dashboard z domyślnymi wartościami i obsługą błędów
export default function Dashboard({ children }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas, i));
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">
              SYSTEM INITIALIZING
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
