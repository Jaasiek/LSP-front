import upcomingServicesTable from "../../models/upcomingServices";
import "./upcomingService.scss";
import LicencePlate from "../licencePlate/licencePlate";
import table_data from "../map/table_data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function UpcomingService() {
  return (
    <div className="upcomingService">
      <h2>Upcoming service</h2>
      {/* <div className="table">
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
      </div> */}
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead> */}
            {upcomingServicesTable.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table_data.map((row, index) => (
            <>
              <TableRow>
                <TableCell className="column" key={index}>
                  {row.make}
                </TableCell>
                <TableCell className="column">
                  <LicencePlate licenceNumber={row.licencePlate} />
                </TableCell>
                <TableCell className="column">{row.route}</TableCell>
                <TableCell className="column">chuj</TableCell>
                <TableCell className="column">chuj</TableCell>
                <TableCell className="column">chuj</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
