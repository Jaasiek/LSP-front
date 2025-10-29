import upcomingServicesTable from "../../models/upcomingServices";
import "./upcomingService.scss";
import LicencePlate from "../licencePlate/licencePlate";
import table_data from "../map/table_data";

export default function UpcomingService() {
  return (
    <div className="upcomingService">
      <h2>Upcoming service</h2>
      <div className="table">
        <div className="table-header">
          {upcomingServicesTable.map((header) => (
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
              <div className="column">chuj</div>
              <div className="column">chuj</div>
              <div className="column">chuj</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
