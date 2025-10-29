import "./licencePlate.scss";

export default function LicencePlate({ licenceNumber }) {
  const licencePlate = licenceNumber.split(" ");

  return (
    <div className="licencePlate">
      <div className="marker"></div>
      <div className="registration">
        <p>{licencePlate[0]}</p>
        <p>{licencePlate[1]}</p>
      </div>
    </div>
  );
}
