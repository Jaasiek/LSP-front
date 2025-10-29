// Bezpieczny LicencePlate z domyślnymi wartościami
export default function LicencePlate({ licenceNumber = "XXX 0000" }) {
  try {
    const licencePlate = licenceNumber.split(" ");

    return (
      <div className="inline-flex items-center h-6 border border-black rounded bg-white text-black overflow-hidden">
        <div className="bg-blue-600 w-2 h-full" />
        <div className="flex items-center justify-between flex-nowrap px-1 gap-1 text-xs font-semibold">
          <span>{licencePlate[0] || "XXX"}</span>
          <span>{licencePlate[1] || "0000"}</span>
        </div>
      </div>
    );
  } catch (error) {
    // Fallback w przypadku błędu
    return (
      <div className="inline-flex items-center h-6 border border-black rounded bg-white text-black overflow-hidden">
        <div className="bg-blue-600 w-2 h-full" />
        <div className="flex items-center justify-between flex-nowrap px-1 gap-1 text-xs font-semibold">
          <span>XXX</span>
          <span>0000</span>
        </div>
      </div>
    );
  }
}

