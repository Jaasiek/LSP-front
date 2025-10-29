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
      <Table>
        <TableHeader>
          <TableRow>
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
                <TableCell className="column">{row.odometer}</TableCell>
                <TableCell className="column">{row.timeToService}</TableCell>
                <TableCell className="column">
                  {row.distanceToService}
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
