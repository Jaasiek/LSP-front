import { useState, useEffect, useRef } from "react";
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
import { Button } from "@/components/ui/button";
import { Truck, Edit, Filter } from "lucide-react";
import { Label } from "@/components/ui/label";

// Bezpieczny EditModal z domyślnymi wartościami
function EditModal({ vehicle, onClose = () => {}, onSuccess = () => {} }) {
  if (!vehicle) return null;

  const [newRoute, setNewRoute] = useState(String(vehicle.route || ""));

  const handleSubmit = () => {
    console.log(`Vehicle ${vehicle.id} now allocated to route ${newRoute}`);
    onSuccess(
      `Pojazd ${vehicle.licencePlate} został przypisany do trasy ${newRoute}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-red-400 mb-2">
          Zmień przypisanie pojazdu
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          (Wiąże się to ze zmianami przypisań dla innych pojazdów)
        </p>

        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <Truck className="h-6 w-6 text-red-400" />
            <span className="text-slate-200 font-medium">
              {vehicle.make || "N/A"}
            </span>
            <LicencePlate licenceNumber={vehicle.licencePlate || "XXX 0000"} />
          </div>
          <p className="text-sm text-slate-300">
            Aktualne przypisanie:{" "}
            <span className="font-bold text-red-400">
              Trasa {vehicle.route || "N/A"}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <Label htmlFor="newRoute" className="text-slate-300 mb-2 block">
            Zmień przypisanie:
          </Label>
          <input
            id="newRoute"
            type="text"
            value={newRoute}
            onChange={(e) => setNewRoute(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-red-500"
            placeholder="Numer trasy"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          Zmień przypisanie
        </Button>
      </div>
    </div>
  );
}

// Custom Dropdown Component z LicencePlate
function VehicleDropdown({ vehicles, selectedVehicleId, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  // Filtrowanie pojazdów po wpisanym tekście
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.licencePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (vehicleId) => {
    onChange(vehicleId);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Focus na input po otwarciu
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // Zamykanie dropdowna po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-red-500 cursor-pointer hover:bg-slate-750 transition-colors min-w-[220px] flex items-center justify-between gap-2"
      >
        {selectedVehicle ? (
          <LicencePlate licenceNumber={selectedVehicle.licencePlate} />
        ) : (
          <span className="text-slate-400">Wybierz pojazd</span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg overflow-hidden">
          {/* Pole wyszukiwania */}
          <div className="p-2 border-b border-slate-600">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Wpisz numer rejestracyjny..."
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-red-500 placeholder-slate-400"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* Lista opcji */}
          <div className="max-h-60 overflow-auto">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => handleSelect(vehicle.id)}
                  className="w-full px-3 py-2 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LicencePlate licenceNumber={vehicle.licencePlate} />
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-slate-400 text-sm">
                Nie znaleziono pojazdu
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Funkcja do pobierania listy wszystkich pojazdów
const getAllVehicles = () => {
  const vehicles = Array.isArray(table_data) ? table_data : [];
  return vehicles.map(v => ({ id: v.id, licencePlate: v.licencePlate }));
};

// Symulacja API call z parametrem pojazdu (zhardcodowane dla testów)
const fetchVehicleData = (vehicleId) => {
  console.log(`Fetching data for vehicle ID: ${vehicleId}`);
  const allData = Array.isArray(table_data) ? table_data : [];
  
  // Jeśli nie wybrano żadnego pojazdu, zwracamy pustą tablicę
  if (!vehicleId) {
    return [];
  }
  
  // W przeciwnym razie filtrujemy po ID pojazdu
  return allData.filter(v => v.id === vehicleId);
};

// Bezpieczny VehicleAllocationPage z domyślnymi wartościami
export default function VehicleAllocationPage() {
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);
  
  const vehicles = getAllVehicles();

  // Ładowanie danych przy zmianie wybranego pojazdu
  useEffect(() => {
    const data = fetchVehicleData(selectedVehicleId);
    setVehicleData(data);
  }, [selectedVehicleId]);

  const handleSuccess = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 5000);
  };

  const safeTableData = Array.isArray(vehicleData) ? vehicleData : [];

  return (
    <div className="grid gap-6">
      {alertMessage && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400">
          <p className="font-medium">Sukces!</p>
          <p className="text-sm">{alertMessage}</p>
        </div>
      )}

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Truck className="mr-2 h-5 w-5 text-red-500" />
              Przydział Pojazdów
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-slate-400" />
              <Label className="text-slate-300 text-sm">
                Filtruj:
              </Label>
              <VehicleDropdown
                vehicles={vehicles}
                selectedVehicleId={selectedVehicleId}
                onChange={setSelectedVehicleId}
              />
              {selectedVehicleId && (
                <button
                  onClick={() => setSelectedVehicleId(null)}
                  className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
                  title="Wyczyść filtr"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                <TableHead className="text-slate-300">Marka</TableHead>
                <TableHead className="text-slate-300">
                  Nr Rejestracyjny
                </TableHead>
                <TableHead className="text-slate-300">
                  Przypisana Trasa
                </TableHead>
                <TableHead className="text-slate-300">Edycja</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeTableData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-slate-800/50 rounded-full p-6 mb-4">
                        <Truck className="h-12 w-12 text-slate-600" />
                      </div>
                      <h3 className="text-slate-300 text-lg font-medium mb-2">
                        Wybierz pojazd
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Użyj filtra powyżej, aby wybrać pojazd i zobaczyć szczegóły przydziału
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                safeTableData.map((vehicle) => (
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
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingVehicle(vehicle)}
                        className="text-red-400 hover:text-red-300 hover:bg-slate-700/50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edytuj
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {editingVehicle && (
        <EditModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
