import { useState } from "react";
import table_data from "@/data/table_data";
import LicencePlate from "@/components/LicencePlate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  AlertTriangle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Bezpieczny UpcomingServicesPage z domyślnymi wartościami
export default function UpcomingServicesPage() {
  // Vehicles needing service (high mileage) - bezpieczne filtrowanie
  const safeTableData = Array.isArray(table_data) ? table_data : [];
  const vehiclesNeedingService = safeTableData.filter(
    (v) => (v?.odometer || 0) > 400000
  );
  
  // State do sortowania
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // "asc" lub "desc"
  
  // Funkcja sortująca
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Jeśli ta sama kolumna, zmień kierunek
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Nowa kolumna, ustaw na rosnąco
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  
  // Posortowane pojazdy
  const sortedVehicles = [...vehiclesNeedingService].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aValue, bValue;
    
    switch (sortColumn) {
      case "make":
        aValue = (a?.make || "").toLowerCase();
        bValue = (b?.make || "").toLowerCase();
        break;
      case "licencePlate":
        aValue = (a?.licencePlate || "").toLowerCase();
        bValue = (b?.licencePlate || "").toLowerCase();
        break;
      case "route":
        aValue = a?.route || 0;
        bValue = b?.route || 0;
        break;
      case "odometer":
        aValue = a?.odometer || 0;
        bValue = b?.odometer || 0;
        break;
      case "priority":
        const getPriorityValue = (vehicle) => {
          const odometer = vehicle?.odometer || 0;
          if (odometer > 480000) return 3; // Wysoki
          if (odometer > 450000) return 2; // Średni
          return 1; // Niski
        };
        aValue = getPriorityValue(a);
        bValue = getPriorityValue(b);
        break;
      case "daysUntilService":
        aValue = Math.max(0, Math.floor((500000 - (a?.odometer || 0)) / 200));
        bValue = Math.max(0, Math.floor((500000 - (b?.odometer || 0)) / 200));
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  
  // Komponent ikony sortowania
  const SortIcon = ({ column }) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-slate-500" />;
    }
    return sortDirection === "asc" 
      ? <ArrowUp className="h-4 w-4 ml-1 text-red-400" />
      : <ArrowDown className="h-4 w-4 ml-1 text-red-400" />;
  };

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <Wrench className="mr-2 h-5 w-5 text-amber-500" />
              Nadchodzące Serwisy
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-amber-500/20 text-amber-400 border-amber-500/50"
            >
              {vehiclesNeedingService.length} pojazdów wymaga uwagi
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-red-400 transition-colors"
                  onClick={() => handleSort("make")}
                >
                  <div className="flex items-center">
                    Marka
                    <SortIcon column="make" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-red-400 transition-colors"
                  onClick={() => handleSort("licencePlate")}
                >
                  <div className="flex items-center">
                    Nr Rejestracyjny
                    <SortIcon column="licencePlate" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-red-400 transition-colors"
                  onClick={() => handleSort("route")}
                >
                  <div className="flex items-center">
                    Trasa
                    <SortIcon column="route" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-red-400 transition-colors"
                  onClick={() => handleSort("odometer")}
                >
                  <div className="flex items-center">
                    Przebieg
                    <SortIcon column="odometer" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-red-400 transition-colors"
                  onClick={() => handleSort("priority")}
                >
                  <div className="flex items-center">
                    Priorytet
                    <SortIcon column="priority" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-red-400 transition-colors"
                  onClick={() => handleSort("daysUntilService")}
                >
                  <div className="flex items-center">
                    Szacowany Serwis
                    <SortIcon column="daysUntilService" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVehicles.map((vehicle) => {
                const odometer = vehicle?.odometer || 0;
                const daysUntilService = Math.max(
                  0,
                  Math.floor((500000 - odometer) / 200)
                );
                const priority =
                  odometer > 480000
                    ? "Wysoki"
                    : odometer > 450000
                    ? "Średni"
                    : "Niski";
                const priorityColor =
                  priority === "Wysoki"
                    ? "red"
                    : priority === "Średni"
                    ? "amber"
                    : "green";

                return (
                  <TableRow
                    key={vehicle.id}
                    className="border-slate-700/30 hover:bg-slate-700/30"
                  >
                    <TableCell className="font-medium text-slate-200">
                      {vehicle?.make || "N/A"}
                    </TableCell>
                    <TableCell>
                      <LicencePlate
                        licenceNumber={vehicle?.licencePlate || "XXX 0000"}
                      />
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <Badge
                        variant="outline"
                        className="bg-slate-800/50 text-red-400 border-red-500/50"
                      >
                        Trasa {vehicle?.route || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center gap-2">
                        {odometer.toLocaleString()} km
                        {odometer > 480000 && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          priorityColor === "red"
                            ? "bg-red-500/20 text-red-400 border-red-500/50"
                            : priorityColor === "amber"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                            : "bg-green-500/20 text-green-400 border-green-500/50"
                        }`}
                      >
                        {priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {daysUntilService === 0
                        ? "Natychmiast"
                        : `~${daysUntilService} dni`}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100 text-base">
              Wysoki Priorytet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">
              {
                vehiclesNeedingService.filter(
                  (v) => (v?.odometer || 0) > 480000
                ).length
              }
            </div>
            <p className="text-sm text-slate-400 mt-1">pojazd(ów)</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100 text-base">
              Średni Priorytet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400">
              {
                vehiclesNeedingService.filter((v) => {
                  const odometer = v?.odometer || 0;
                  return odometer > 450000 && odometer <= 480000;
                }).length
              }
            </div>
            <p className="text-sm text-slate-400 mt-1">pojazd(ów)</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100 text-base">
              Niski Priorytet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {
                vehiclesNeedingService.filter((v) => {
                  const odometer = v?.odometer || 0;
                  return odometer > 400000 && odometer <= 4500000;
                }).length
              }
            </div>
            <p className="text-sm text-slate-400 mt-1">pojazd(ów)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
