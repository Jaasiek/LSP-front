import vehicleAllocationTable from "../../models/vehicleAllocation";
import ChangeAllocForm from "../changeAllocForm/changeAllocForm";
import LicencePlate from "../licencePlate/licencePlate";
import table_data from "../map/table_data";
import Alert from "../alert/alert";
import "./vehicleAllocation.scss";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function VehicleAllocation() {
  const [toEdit, setToEdit] = useState(false);
  const [id, setID] = useState(null);
  const [currentAlloc, setCurrentAlloc] = useState(null);
  const [brand, setBrand] = useState(null);
  const [licencePlate, setLicencePlate] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [alertKey, setAlertKey] = useState(0);

  return (
    <div className="vehicleAllocation">
      <h2>Przydział pojazdów</h2>
      <div className="table">
        <Table>
          <TableHeader>
            <TableRow>
              {vehicleAllocationTable.map((header, idx) => (
                <TableHead key={idx}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table_data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.make}</TableCell>
                <TableCell>
                  <LicencePlate licenceNumber={row.licencePlate} />
                </TableCell>
                <TableCell>{row.route}</TableCell>
                <TableCell
                  className="edit"
                  onClick={() => {
                    setToEdit(true);
                    setID(row.id);
                    setCurrentAlloc(row.route);
                    setBrand(row.make);
                    setLicencePlate(row.licencePlate);
                  }}
                >
                  Edytuj
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {toEdit && (
        <div className="va-modal-root" role="dialog" aria-modal="true">
          <div className="va-modal-backdrop" onClick={() => setToEdit(false)} />
          <div className="va-modal">
            <button
              className="va-modal-close"
              aria-label="Zamknij"
              onClick={() => setToEdit(false)}
            >
              ×
            </button>
            <ChangeAllocForm
              key={id}
              id={id}
              currentAlloc={currentAlloc}
              brand={brand}
              licencePlate={licencePlate}
              onSuccess={({ title, message }) => {
                setToEdit(false);
                setAlertData({ title, message });
                setAlertKey((k) => k + 1);
              }}
            />
          </div>
        </div>
      )}
      {alertData && (
        <Alert
          key={alertKey}
          title={alertData.title}
          message={alertData.message}
        />
      )}
    </div>
  );
}
