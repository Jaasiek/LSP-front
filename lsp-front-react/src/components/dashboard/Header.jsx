import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell } from "lucide-react";
import { getUnreadNotifications } from "@/data/notifications";
import LSPGroup_logo_white from "../../../public/LSPGroup_logo_white.svg";
import { NotificationsPanel } from "@/components/Notifications";

export function Header() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const unreadCount = getUnreadNotifications().length;
  return (
    <header className="flex items-center justify-between py-2 border-b border-slate-700/50 mb-4">
      <div className="flex items-center space-x-2">
        <img src={LSPGroup_logo_white} className="h-17 w-auto" />
      </div>
      <div className="flex items-center space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationsOpen(true)}
                className="relative text-slate-400 hover:text-slate-100"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {unreadCount}
                    </span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Powiadomienia {unreadCount > 0 && `(${unreadCount})`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Panel notyfikacji */}
      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </header>
  );
}
