import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import "./upcomingChanges.scss";
import table_data from "../map/table_data";
import upcomingChangesTable from "../../models/upcomingChanges";
import LicencePlate from "../licencePlate/licencePlate";

export default function UpcomingChanges() {
  return (
    <div className="upcomingChanges">
      <h2>Nachodzące zmiany</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {upcomingChangesTable.map((header, idx) => (
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
              <TableCell>{row.previoustRoute}</TableCell>
              <TableCell>{row.upcomingRoute}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
