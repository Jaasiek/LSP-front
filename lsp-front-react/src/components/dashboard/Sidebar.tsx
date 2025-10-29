"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, MapPin, Wrench, FileText, Settings } from "lucide-react"
import { StatusItem } from "./shared"
import { Link, useLocation } from "react-router-dom"

export function Sidebar({ systemStatus, securityLevel, networkStatus }: { systemStatus: number; securityLevel: number; networkStatus: number }) {
  const location = useLocation();
  
  const navItems = [
    { icon: Truck, label: "Dashboard", path: "/" },
    { icon: MapPin, label: "Mapa", path: "/map" },
    { icon: Truck, label: "Przydział Pojazdów", path: "/vehicles" },
    { icon: Wrench, label: "Serwisy", path: "/services" },
    { icon: FileText, label: "Raporty", path: "/reports" },
  ];

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
      <CardContent className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-2 font-mono">SYSTEM STATUS</div>
          <div className="space-y-3">
            <StatusItem label="Core Systems" value={systemStatus} color="cyan" />
            <StatusItem label="Security" value={securityLevel} color="green" />
            <StatusItem label="Network" value={networkStatus} color="blue" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


