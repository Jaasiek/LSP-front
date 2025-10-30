// Bezpieczny LicencePlate z domyślnymi wartościami
export default function LicencePlate({ licenceNumber = "XXX 0000" }) {
  try {
    const licencePlate = licenceNumber.split(" ");

    return (
      <div className="inline-flex items-center h-6 border border-black rounded bg-white text-black overflow-hidden min-w-[5.5rem]">
        <div className="bg-blue-600 w-2 h-full flex-shrink-0" />
        <div className="flex items-center justify-center flex-nowrap px-1.5 gap-1 text-xs font-semibold flex-1">
          <span className="whitespace-nowrap">{licencePlate[0]}</span>
          <span className="whitespace-nowrap">{licencePlate[1]}</span>
        </div>
      </div>
    );
  } catch (error) {
    // Fallback w przypadku błędu
    return (
      <div className="inline-flex items-center h-6 border border-black rounded bg-white text-black overflow-hidden min-w-[5.5rem]">
        <div className="bg-blue-600 w-2 h-full flex-shrink-0" />
        <div className="flex items-center justify-center flex-nowrap px-1.5 gap-1 text-xs font-semibold flex-1">
          <span className="whitespace-nowrap">XXX</span>
          <span className="whitespace-nowrap">0000</span>
        </div>
      </div>
    );
  }
}
