interface LicencePlateProps {
  licenceNumber: string;
}

export default function LicencePlate({ licenceNumber }: LicencePlateProps) {
  const licencePlate = licenceNumber.split(" ");

  return (
    <div className="inline-flex items-center h-6 border border-black rounded bg-white text-black overflow-hidden">
      <div className="bg-blue-600 w-2 h-full" />
      <div className="flex items-center justify-between flex-nowrap px-1 gap-1 text-xs font-semibold">
        <span>{licencePlate[0]}</span>
        <span>{licencePlate[1]}</span>
      </div>
    </div>
  );
}

