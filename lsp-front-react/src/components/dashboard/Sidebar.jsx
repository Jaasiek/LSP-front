import { Card, CardContent } from "@/components/ui/card"
import { Truck, MapPin, Wrench, FileText } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

// Bezpieczny Sidebar z domyślnymi wartościami - uproszczona wersja bez statusów
export function Sidebar() {
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
      </CardContent>
    </Card>
  )
}

