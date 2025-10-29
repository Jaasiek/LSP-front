import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Truck, MapPin, Gauge, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Shield, AlertCircle, MessageSquare } from "lucide-react"
import { MetricCard, PerformanceChart } from "./shared"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import LicencePlate from "../LicencePlate"
import table_data from "@/data/table_data"

// Bezpieczny MainDashboard z domyślnymi wartościami i obsługą błędów
export function MainDashboard() {
  // Bezpieczne obliczenia statystyk z domyślnymi wartościami
  const safeTableData = Array.isArray(table_data) ? table_data : []
  const totalVehicles = safeTableData.length || 0
  const averageOdometer = totalVehicles > 0 
    ? Math.round(safeTableData.reduce((sum, v) => sum + (v?.odometer || 0), 0) / totalVehicles)
    : 0
  const activeRoutes = totalVehicles > 0 
    ? new Set(safeTableData.map(v => v?.route).filter(Boolean)).size 
    : 0
  const vehiclesNeedingService = safeTableData.filter(v => (v?.odometer || 0) > 450000).length
  
  // Bezpieczne obliczenie zdrowia floty
  const fleetHealth = totalVehicles > 0 
    ? Math.round(100 - (averageOdometer / 600000) * 100)
    : 0

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-700/50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-cyan-500" />
              Przegląd Floty
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                NA ŻYWO
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
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
                  <TabsTrigger value="vehicles" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">Pojazdy</TabsTrigger>
                  <TabsTrigger value="routes" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">Trasy</TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">Analityka</TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <div className="flex items-center"><div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>Aktywne</div>
                  <div className="flex items-center"><div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>Serwis</div>
                  <div className="flex items-center"><div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>Dostępne</div>
                </div>
              </div>
              <TabsContent value="vehicles" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                        <TableHead className="text-slate-300">Marka</TableHead>
                        <TableHead className="text-slate-300">Nr Rejestracyjny</TableHead>
                        <TableHead className="text-slate-300">Trasa</TableHead>
                        <TableHead className="text-slate-300">Przebieg</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {safeTableData.slice(0, 8).map((vehicle) => (
                        <TableRow key={vehicle.id} className="border-slate-700/30 hover:bg-slate-700/30">
                          <TableCell className="font-medium text-slate-200">{vehicle.make || "N/A"}</TableCell>
                          <TableCell>
                            <LicencePlate licenceNumber={vehicle.licencePlate} />
                          </TableCell>
                          <TableCell className="text-slate-300">
                            <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50">
                              Trasa {vehicle.route || "N/A"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{(vehicle.odometer || 0).toLocaleString()} km</TableCell>
                          <TableCell>
                            {(vehicle.odometer || 0) > 450000 ? (
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Serwis</Badge>
                            ) : (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Aktywny</Badge>
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
                    {Array.from(new Set(safeTableData.map(v => v.route))).slice(0, 8).map((route) => {
                      const vehiclesOnRoute = safeTableData.filter(v => v.route === route);
                      const avgOdometer = vehiclesOnRoute.length > 0
                        ? Math.round(vehiclesOnRoute.reduce((s, v) => s + (v?.odometer || 0), 0) / vehiclesOnRoute.length)
                        : 0
                      return (
                        <div key={route} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <MapPin className="h-5 w-5 text-cyan-400 mr-2" />
                              <span className="text-slate-200 font-medium">Trasa {route}</span>
                            </div>
                            <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50">
                              {vehiclesOnRoute.length} pojazd{vehiclesOnRoute.length !== 1 ? 'ów' : ''}
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
                    <div className="text-lg font-mono text-cyan-400">{fleetHealth}%</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <Shield className="mr-2 h-5 w-5 text-green-500" />
              Status Bezpieczeństwa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">System GPS</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Aktywny</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">Monitoring Floty</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Aktywny</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">Alerty Serwisowe</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Aktywne</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">Aktualizacja Danych</div>
                <div className="text-sm text-cyan-400">Zaktualizowano <span className="text-slate-500">2 min temu</span></div>
              </div>
              <div className="pt-2 mt-2 border-t border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Poziom Bezpieczeństwa</div>
                  <div className="text-sm text-cyan-400">{fleetHealth}%</div>
                </div>
                <div>
                  <div className="h-2 bg-slate-700 rounded-md overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full" style={{ width: `${fleetHealth}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 flex items-center text-base">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
              Alerty Systemowe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-slate-800/50 rounded-lg p-3 border border-amber-500/30">
                <div className="flex items-start justify-between mb-1">
                  <div className="text-sm font-medium text-amber-400">Serwis Wymagany</div>
                  <div className="text-xs text-slate-500">14:32</div>
                </div>
                <div className="text-xs text-slate-400">{vehiclesNeedingService} pojazdów wymaga przeglądu serwisowego</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-500/30">
                <div className="flex items-start justify-between mb-1">
                  <div className="text-sm font-medium text-cyan-400">Aktualizacja Tras</div>
                  <div className="text-xs text-slate-500">13:45</div>
                </div>
                <div className="text-xs text-slate-400">Nowe przypisania tras dla {activeRoutes} pojazdów</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-green-500/30">
                <div className="flex items-start justify-between mb-1">
                  <div className="text-sm font-medium text-green-400">Raport Dzienny</div>
                  <div className="text-xs text-slate-500">09:12</div>
                </div>
                <div className="text-xs text-slate-400">Raport dla {totalVehicles} pojazdów wygenerowany pomyślnie</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
            Log Komunikacji
          </CardTitle>
          <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">4 Nowe Wiadomości</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { sender: "Administrator Systemu", time: "15:42", message: "Zaplanowana konserwacja o 02:00. Wszystkie systemy będą tymczasowo niedostępne." },
              { sender: "Moduł Serwisowy", time: "14:30", message: `${vehiclesNeedingService} pojazdów wymaga natychmiastowego przeglądu technicznego.` },
              { sender: "Kontrola Tras", time: "12:15", message: "Alokacja tras została dostosowana dla optymalnej efektywności floty." },
              { sender: "Centrum Danych", time: "09:05", message: "Weryfikacja kopii zapasowej zakończona. Wszystkie dane są poprawne." }
            ].map((comm, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                    <div className="text-sm font-medium text-slate-200">{comm.sender}</div>
                  </div>
                  <div className="text-xs text-slate-500">{comm.time}</div>
                </div>
                <div className="text-xs text-slate-400 ml-4">{comm.message}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

