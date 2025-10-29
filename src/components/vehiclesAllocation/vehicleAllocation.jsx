import vehicleAllocation from "../../models/vehicleAllocation";
import ChangeAllocForm from "../changeAllocForm/changeAllocForm";
import LicencePlate from "../licencePlate/licencePlate";
import table_data from "../map/table_data";
import "./vehicleAllocation.scss";
import { useState } from "react";

export default function VehicleAllocation() {
  const [toEdit, setToEdit] = useState(false);
  const [id, setID] = useState(null);
  const [currentAlloc, setCurrentAlloc] = useState(null);
  const [brand, setBrand] = useState(null);
  const [licencePlate, setLicencePlate] = useState(null);

  return (
    <div className="vehicleAllocation">
      <h2>Przydział pojazdów</h2>
      <div className="table">
        <div className="table-header">
          {vehicleAllocation.map((header) => (
            <div key={header} className="column header">
              {header}
            </div>
          ))}
        </div>
        <div className="table-body">
          {table_data.map((row, index) => (
            <div key={index} className="table-row">
              <div className="column">{row.make}</div>
              <div className="column">
                <LicencePlate licenceNumber={row.licencePlate} />
              </div>
              <div className="column">{row.route}</div>
              <div
                className="column edit"
                onClick={() => {
                  setToEdit(true);
                  setID(row.id);
                  setCurrentAlloc(row.route);
                  setBrand(row.make);
                  setLicencePlate(row.licencePlate);
                }}
              >
                Edytuj
              </div>
            </div>
          ))}
        </div>
      </div>
      {toEdit && (
        <ChangeAllocForm
          key={id}
          id={id}
          currentAlloc={currentAlloc}
          brand={brand}
          licencePlate={licencePlate}
        />
      )}
    </div>
  );
}
