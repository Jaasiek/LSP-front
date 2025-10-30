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
import { History, Clock, User, ArrowRight } from "lucide-react";

// Funkcja do generowania dat z ostatnich 3 tygodni
function generateRandomDate() {
  const now = new Date();
  const threeWeeksAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);
  const randomTime = threeWeeksAgo.getTime() + Math.random() * (now.getTime() - threeWeeksAgo.getTime());
  return new Date(randomTime);
}

// Generowanie przykładowych danych historii zmian
function generateHistoryData() {
  const safeTableData = Array.isArray(table_data) ? table_data : [];
  const history = [];
  const users = ["Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Katarzyna Dąbrowska", "Marek Lewandowski"];
  
  // Generuj 40 losowych zmian z ostatnich 3 tygodni
  for (let i = 0; i < 40; i++) {
    const vehicle = safeTableData[Math.floor(Math.random() * safeTableData.length)];
    if (!vehicle) continue;
    
    const oldRoute = Math.floor(Math.random() * 10) + 1;
    const newRoute = Math.floor(Math.random() * 10) + 1;
    const changeDate = generateRandomDate();
    const user = users[Math.floor(Math.random() * users.length)];
    
    history.push({
      id: `CHANGE-${String(i + 1).padStart(4, '0')}`,
      vehicleId: vehicle.id,
      licencePlate: vehicle.licencePlate,
      make: vehicle.make,
      oldRoute: `Trasa ${oldRoute}`,
      newRoute: `Trasa ${newRoute}`,
      changeDate: changeDate,
      changedBy: user,
      reason: Math.random() > 0.5 ? "Optymalizacja tras" : "Zmiana zapotrzebowania",
    });
  }
  
  // Sortuj od najnowszych
  return history.sort((a, b) => b.changeDate - a.changeDate);
}

export default function HistoryPage() {
  const [historyData] = useState(generateHistoryData());
  const [filterDays, setFilterDays] = useState(21);

  // Filtrowanie danych według wybranego okresu
  const filteredHistory = historyData.filter(change => {
    const now = new Date();
    const filterDate = new Date(now.getTime() - filterDays * 24 * 60 * 60 * 1000);
    return change.changeDate >= filterDate;
  });

  // Formatowanie daty
  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return "Przed chwilą";
    } else if (diffHours < 24) {
      return `${diffHours} godz. temu`;
    } else if (diffDays === 1) {
      return "Wczoraj";
    } else if (diffDays < 7) {
      return `${diffDays} dni temu`;
    } else {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'tydzień' : 'tygodnie'} temu`;
    }
  };

  const formatFullDate = (date) => {
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-slate-100 flex items-center">
              <History className="mr-2 h-5 w-5 text-red-500" />
              Historia Zmian
            </CardTitle>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">Pokaż zmiany z ostatnich:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterDays(7)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    filterDays === 7
                      ? "bg-red-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  7 dni
                </button>
                <button
                  onClick={() => setFilterDays(14)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    filterDays === 14
                      ? "bg-red-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  14 dni
                </button>
                <button
                  onClick={() => setFilterDays(21)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    filterDays === 21
                      ? "bg-red-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  21 dni
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Znaleziono <span className="text-red-400 font-semibold">{filteredHistory.length}</span> zmian
            </div>
            <Badge variant="outline" className="bg-slate-800/50 text-green-400 border-green-500/50 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Ostatnie 3 tygodnie
            </Badge>
          </div>
          
          <style>{`
            .history-table-scroll {
              scrollbar-color: rgba(68, 74, 239, 0.5) rgba(30, 41, 59, 0.3);
            }
          `}</style>
          <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden max-h-[600px] overflow-y-hidden history-table-scroll">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                  <TableHead className="text-slate-300">ID Zmiany</TableHead>
                  <TableHead className="text-slate-300">Pojazd</TableHead>
                  <TableHead className="text-slate-300">Marka</TableHead>
                  <TableHead className="text-slate-300">Zmiana Trasy</TableHead>
                  <TableHead className="text-slate-300">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-400 py-8">
                      Brak zmian w wybranym okresie
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistory.map((change) => (
                    <TableRow
                      key={change.id}
                      className="border-slate-700/30 hover:bg-slate-700/30"
                    >
                      <TableCell className="font-mono text-xs text-slate-400">
                        {change.id}
                      </TableCell>
                      <TableCell>
                        <LicencePlate licenceNumber={change.licencePlate} />
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {change.make}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-slate-700/50 text-slate-400 border-slate-600/50 text-xs"
                          >
                            {change.oldRoute}
                          </Badge>
                          <ArrowRight className="h-3 w-3 text-slate-600" />
                          <Badge
                            variant="outline"
                            className="bg-red-500/20 text-red-400 border-red-500/50 text-xs"
                          >
                            {change.newRoute}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-slate-300 text-sm">
                            {formatDate(change.changeDate)}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {formatFullDate(change.changeDate)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Statystyki zmian */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 text-base">
            Statystyki Zmian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Łączna liczba zmian</span>
                <History className="h-4 w-4 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-red-400">
                {filteredHistory.length}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                w ostatnich {filterDays} dniach
              </p>
            </div>
            
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Średnio dziennie</span>
                <Clock className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-purple-400">
                {(filteredHistory.length / filterDays).toFixed(1)}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                zmian na dzień
              </p>
            </div>
            
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Unikalnych pojazdów</span>
                <User className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400">
                {new Set(filteredHistory.map(h => h.vehicleId)).size}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                różnych pojazdów
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

