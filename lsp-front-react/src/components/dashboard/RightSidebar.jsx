import { Card, CardContent } from "@/components/ui/card";

// Bezpieczny RightSidebar z domyślnymi wartościami - uproszczona wersja
export function RightSidebar({ currentTime = new Date() }) {
  const formatTime = (date) => {
    try {
      return date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch (e) {
      return "00:00:00";
    }
  };

  const formatDate = (date) => {
    try {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "N/A";
    }
  };
  const utcOffset = new Date().getTimezoneOffset() / -60;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1 font-mono">
                SYSTEM TIME
              </div>
              <div className="text-3xl font-mono text-cyan-400 mb-1">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-slate-400">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50 flex flex-col items-center">
                <div className="text-xs text-slate-500 mb-1">Time Zone</div>
                <div className="text-sm font-mono text-slate-200">
                  UTC{utcOffset >= 0 ? `+${utcOffset}` : `-${utcOffset}`} (
                  {timeZone})
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
