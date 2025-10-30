import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Truck, MapPin, Gauge, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Shield, AlertCircle, MessageSquare } from "lucide-react";
import { MetricCard, PerformanceChart } from "./shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LicencePlate from "../LicencePlate";
import table_data from "@/data/table_data";

// Bezpieczny MainDashboard z domyślnymi wartościami i obsługą błędów
export function MainDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [key, setKey] = useState(0);
  const [vehicleData, setVehicleData] = useState([]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    // Symulacja odświeżania danych z efektem dźwiękowym (opcjonalnie)
    // new Audio('/refresh-sound.mp3').play().catch(() => {});

    setTimeout(() => {
      setIsRefreshing(false);
      setKey((prev) => prev + 1); // Force re-render z animacją
    }, 2000);
  };
  // Bezpieczne obliczenia statystyk z domyślnymi wartościami
  const safeTableData = Array.isArray(vehicleData) ? vehicleData : [];
  const totalVehicles = safeTableData.length || 0;
  const averageOdometer =
    totalVehicles > 0
      ? Math.round(
          safeTableData.reduce((sum, v) => sum + (v?.odometer || 0), 0) /
            totalVehicles
        )
      : 0;
  const activeRoutes =
    totalVehicles > 0
      ? new Set(safeTableData.map((v) => v?.route).filter(Boolean)).size
      : 0;
  const vehiclesNeedingService = safeTableData.filter(
    (v) => (v?.odometer || 0) > 450000
  ).length;

  // Bezpieczne obliczenie zdrowia floty
  const fleetHealth =
    totalVehicles > 0 ? Math.round(100 - (averageOdometer / 600000) * 100) : 0;

  return (
    <div className="grid gap-6">
      <Card
        key={key}
        className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden relative transition-all duration-500 ${
          isRefreshing ? "scale-[0.99] opacity-90" : "scale-100 opacity-100"
        }`}
      >
        <CardHeader className="border-b border-slate-700/50 pb-3 relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <Activity
                className={`mr-2 h-5 w-5 text-red-500 transition-all duration-500 ${
                  isRefreshing ? "animate-spin scale-110" : ""
                }`}
              />
              <span
                className={`transition-all duration-300 ${
                  isRefreshing ? "text-red-400" : ""
                }`}
              >
                Przegląd Floty
              </span>
            </CardTitle>
            <div className="flex items-center space-x-2 relative">
              <Badge
                variant="outline"
                className="bg-slate-800/50 text-red-400 border-red-500/50 text-xs transition-all duration-300"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1 animate-pulse"></div>
                {isRefreshing ? "ODŚWIEŻANIE..." : "NA ŻYWO"}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`h-8 w-8 transition-all duration-300 relative group ${
                  isRefreshing
                    ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                    : "text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:scale-110"
                }`}
              >
                <RefreshCw
                  className={`h-4 w-4 transition-all duration-700 ${
                    isRefreshing
                      ? "animate-spin scale-110"
                      : "group-hover:rotate-180"
                  }`}
                />
                {!isRefreshing && (
                  <div className="absolute inset-0 rounded-md bg-red-500/0 group-hover:bg-red-500/10 transition-all duration-300"></div>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent
          className={`p-6 transition-all duration-500 ${
            isRefreshing ? "blur-[2px] opacity-60" : "blur-0 opacity-100"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Łączna Liczba Pojazdów"
              value={totalVehicles}
              icon={Truck}
              trend="stable"
              color="cyan"
              detail={`${activeRoutes} aktywnych tras`}
            />
            <MetricCard
              title="Średni Przebieg"
              value={Math.round(averageOdometer / 1000)}
              icon={Gauge}
              trend="up"
              color="purple"
              detail={`${averageOdometer.toLocaleString()} km`}
            />
            <MetricCard
              title="Stan Floty"
              value={fleetHealth}
              icon={Shield}
              trend="stable"
              color="blue"
              detail={`${vehiclesNeedingService} wymaga serwisu`}
            />
          </div>
          <div className="mt-8">
            <Tabs defaultValue="vehicles" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-slate-800/50 p-1">
                  <TabsTrigger
                    value="vehicles"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-red-400"
                  >
                    Pojazdy
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                    Aktywne
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                    Serwis
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                    Dostępne
                  </div>
                </div>
              </div>
              <TabsContent value="vehicles" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                        <TableHead className="text-slate-300">Marka</TableHead>
                        <TableHead className="text-slate-300">
                          Nr Rejestracyjny
                        </TableHead>
                        <TableHead className="text-slate-300">Trasa</TableHead>
                        <TableHead className="text-slate-300">
                          Przebieg
                        </TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {safeTableData.slice(0, 8).map((vehicle) => (
                        <TableRow
                          key={vehicle.id}
                          className="border-slate-700/30 hover:bg-slate-700/30"
                        >
                          <TableCell className="font-medium text-slate-200">
                            {vehicle.make || "N/A"}
                          </TableCell>
                          <TableCell>
                            <LicencePlate
                              licenceNumber={vehicle.licencePlate}
                            />
                          </TableCell>
                          <TableCell className="text-slate-300">
                            <Badge
                              variant="outline"
                              className="bg-slate-800/50 text-red-400 border-red-500/50"
                            >
                              Trasa {vehicle.route || "N/A"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {(vehicle.odometer || 0).toLocaleString()} km
                          </TableCell>
                          <TableCell>
                            {(vehicle.odometer || 0) > 450000 ? (
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                                Serwis
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                                Aktywny
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="routes" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from(new Set(safeTableData.map((v) => v.route)))
                      .slice(0, 8)
                      .map((route) => {
                        const vehiclesOnRoute = safeTableData.filter(
                          (v) => v.route === route
                        );
                        const avgOdometer =
                          vehiclesOnRoute.length > 0
                            ? Math.round(
                                vehiclesOnRoute.reduce(
                                  (s, v) => s + (v?.odometer || 0),
                                  0
                                ) / vehiclesOnRoute.length
                              )
                            : 0;
                        return (
                          <div
                            key={route}
                            className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-red-400 mr-2" />
                                <span className="text-slate-200 font-medium">
                                  Trasa {route}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-slate-800/50 text-red-400 border-red-500/50"
                              >
                                {vehiclesOnRoute.length} pojazd
                                {vehiclesOnRoute.length !== 1 ? "ów" : ""}
                              </Badge>
                            </div>
                            <div className="text-xs text-slate-400">
                              Średni przebieg: {avgOdometer.toLocaleString()} km
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-0">
                <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <PerformanceChart />
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                    <div className="text-xs text-slate-400">Stan Floty</div>
                    <div className="text-lg font-mono text-red-400">
                      {fleetHealth}%
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
