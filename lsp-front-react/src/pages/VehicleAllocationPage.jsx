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
import { Button } from "@/components/ui/button";
import { Truck, Edit } from "lucide-react";
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

// Bezpieczny VehicleAllocationPage z domyślnymi wartościami
export default function VehicleAllocationPage() {
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSuccess = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 5000);
  };

  const safeTableData = Array.isArray(table_data) ? table_data : [];

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
          <CardTitle className="text-slate-100 flex items-center">
            <Truck className="mr-2 h-5 w-5 text-red-500" />
            Przydział Pojazdów
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
              {safeTableData.map((vehicle) => (
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
              ))}
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
