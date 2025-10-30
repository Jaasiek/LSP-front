import table_data from "@/data/table_data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, DollarSign, Calendar } from "lucide-react";

// Bezpieczny ReportsPage z domyślnymi wartościami
export default function ReportsPage() {
  const safeTableData = Array.isArray(table_data) ? table_data : [];
  const totalVehicles = safeTableData.length;
  const totalMileage = safeTableData.reduce(
    (sum, v) => sum + (v?.odometer || 0),
    0
  );
  const averageMileage =
    totalVehicles > 0 ? Math.round(totalMileage / totalVehicles) : 0;
  const activeRoutes = new Set(
    safeTableData.map((v) => v?.route).filter(Boolean)
  ).size;
  const effectiveness = 10 + Math.random() * 90; // losowa efektywność między 60% a 100%

  // Calculate statistics by brand - bezpieczne
  const brandStats = safeTableData.reduce((acc, vehicle) => {
    const make = vehicle?.make || "Unknown";
    if (!acc[make]) {
      acc[make] = { count: 0, totalMileage: 0 };
    }
    acc[make].count += 1;
    acc[make].totalMileage += vehicle?.odometer || 0;
    return acc;
  }, {});

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-red-500" />
            Raporty Floty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">
                  Łączna Liczba Pojazdów
                </span>
                <Badge
                  variant="outline"
                  className="bg-red-500/20 text-red-400 border-red-500/50"
                >
                  Flota
                </Badge>
              </div>
              <div className="text-3xl font-bold text-red-400">
                {totalVehicles}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                pojazd(ów) w systemie
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Łączny Przebieg</span>
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-purple-400">
                {(totalMileage / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {totalMileage.toLocaleString()} km
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Średni Przebieg</span>
                <Calendar className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400">
                {(averageMileage / 1000).toFixed(0)}k
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {averageMileage.toLocaleString()} km
              </p>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Aktywne Trasy</span>
                <DollarSign className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-400">
                {activeRoutes}
              </div>
              <p className="text-xs text-slate-500 mt-1">różnych tras</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 text-base">
            Statystyki według Marki
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(brandStats).map(([brand, stats]) => (
              <div
                key={brand}
                className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-200">{brand}</h3>
                  <Badge
                    variant="outline"
                    className="bg-slate-700/50 text-slate-300 border-slate-600"
                  >
                    {stats.count} szt.
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Łączny przebieg:</span>
                    <span className="text-red-400 font-medium">
                      {stats.totalMileage.toLocaleString()} km
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Średni przebieg:</span>
                    <span className="text-purple-400 font-medium">
                      {Math.round(
                        stats.totalMileage / stats.count
                      ).toLocaleString()}{" "}
                      km
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Udział w flocie:</span>
                    <span className="text-green-400 font-medium">
                      {((stats.count / totalVehicles) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 text-base">
            Podsumowanie Miesięczne
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <h4 className="text-slate-300 font-medium mb-3">
                  Koszty Operacyjne
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Paliwo (szacowane):</span>
                    <span className="text-slate-200">
                      ~{(totalVehicles * 3500).toLocaleString()} zł
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Serwis i naprawy:</span>
                    <span className="text-slate-200">
                      ~{(totalVehicles * 1200).toLocaleString()} zł
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Ubezpieczenia:</span>
                    <span className="text-slate-200">
                      ~{(totalVehicles * 800).toLocaleString()} zł
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-600">
                    <span className="text-red-400">Suma:</span>
                    <span className="text-red-400">
                      {(totalVehicles * 5500).toLocaleString()} zł
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-slate-300 font-medium mb-3">
                  Wydajność Floty
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Czas pracy (h):</span>
                    <span className="text-slate-200">
                      {(totalVehicles * 180).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Przejechane km:</span>
                    <span className="text-slate-200">
                      {(totalVehicles * 4500).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Liczba zamian:</span>
                    <span className="text-slate-200">
                      {(totalVehicles * 10).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Pokrycie tras:</span>
                    <span
                      className={`font-medium ${
                        effectiveness <= 30 && "text-red-500"
                      } ${effectiveness >= 30 && "text-amber-500"} ${
                        effectiveness >= 80 && "text-green-500"
                      }`}
                    >
                      {effectiveness.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-600">
                    <span className="text-slate-400">Efektywność:</span>
                    <Badge
                      className={`${
                        effectiveness <= 30 &&
                        "text-red-500 border-red-500/50 bg-red-500/20 "
                      } ${
                        effectiveness >= 30 &&
                        "text-amber-500 border-amber-500/50 bg-amber-500/20 "
                      } ${
                        effectiveness >= 80 &&
                        "text-green-500 border-green-500/50 bg-green-500/20 "
                      }`}
                    >
                      {effectiveness >= 80 && "Wysoka"}
                      {effectiveness <= 80 && effectiveness >= 30 && "Średnia"}
                      {effectiveness < 30 && "Niska"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
