import "./licencePlate.scss";

export default function LicencePlate({ licenceNumber }) {
  return (
    <div className="licencePlate">
      <div className="marker"></div>
      <div className="registration">{licenceNumber}</div>
    </div>
  );
}
