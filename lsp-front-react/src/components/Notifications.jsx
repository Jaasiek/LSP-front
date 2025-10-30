import { useState, useEffect } from "react"
import { X, AlertTriangle, AlertCircle, Info, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getAllNotifications, formatTimeAgo } from "@/data/notifications"

// Komponent pojedynczej notyfikacji
function NotificationItem({ notification, onClose }) {
  const getIcon = () => {
    switch (notification.type) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      default:
        return <Info className="h-5 w-5 text-red-500" />
    }
  }

  const getBorderColor = () => {
    switch (notification.type) {
      case "error":
        return "border-red-500/50"
      case "warning":
        return "border-amber-500/50"
      default:
        return "border-cyan-500/50"
    }
  }

  const getBgColor = () => {
    switch (notification.type) {
      case "error":
        return "bg-red-500/10"
      case "warning":
        return "bg-amber-500/10"
      default:
        return "bg-red-500/10"
    }
  }

  return (
    <div className={`${getBgColor()} ${getBorderColor()} border rounded-lg p-4 mb-3 relative group hover:shadow-lg transition-all ${notification.isRead ? 'opacity-50' : ''}`}>
      <button
        onClick={() => onClose(notification.id)}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-start space-x-3 ">
        <div className="mt-0.5 r ">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`text-sm font-semibold ${notification.isRead ? 'text-slate-400' : 'text-slate-100'}`}>
              {notification.title}
            </h4>
          </div>
          <p className={`text-xs mb-2 ${notification.isRead ? 'text-slate-400' : 'text-slate-300'}`}>
            {notification.message}
          </p>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${notification.isRead ? 'text-slate-600' : 'text-slate-500'}`}>
              {formatTimeAgo(notification.timestamp)}
            </span>
            {notification.vehicleId && (
              <Badge variant="outline" className={`text-xs ${notification.isRead ? 'bg-slate-800/30 text-slate-500 border-slate-600/50' : 'bg-slate-800/50 text-red-400 border-red-500/50'}`}>
                <Truck className="h-3 w-3 mr-1" />
                {notification.vehicleId}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Główny komponent panelu notyfikacji
export function NotificationsPanel({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Pobierz notyfikacje przy otwarciu
    if (isOpen) {
      setNotifications(getAllNotifications())
    }
  }, [isOpen])

  // Blokuj scroll na body gdy popup jest otwarty
  useEffect(() => {
    if (isOpen) {
      // Zapisz obecną pozycję scrolla
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflowY = 'scroll' // zachowaj szerokość scrollbara
      
      return () => {
        // Przywróć scroll po zamknięciu
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflowY = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  const handleCloseNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  if (!isOpen) return null

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Panel notyfikacji */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-slate-900 border-l border-slate-700 z-50 shadow-2xl overflow-hidden flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-slate-800/50 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-slate-100">Powiadomienia</h2>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {unreadCount} nowych
                </Badge>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="w-full text-xs border-slate-700 hover:bg-slate-700/50"
            >
              Wyczyść wszystkie
            </Button>
          )}
        </div>

        {/* Lista notyfikacji */}
        <style>{`
          /* Custom scrollbar styling dla panelu powiadomień */
          .notifications-scroll::-webkit-scrollbar {
            width: 8px;
          }
          
          .notifications-scroll::-webkit-scrollbar-track {
            background: rgba(68, 74, 239, 0.5);
            border-radius: 4px;
          }
          
          .notifications-scroll::-webkit-scrollbar-thumb {
            background: rgba(68, 74, 239, 0.5);
            border-radius: 4px;
            transition: background 0.3s ease;
          }
          
          .notifications-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(145, 68, 239, 0.7);
          }
          
          /* Firefox scrollbar */
          .notifications-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(68, 74, 239, 0.5) rgba(30, 41, 59, 0.3);
          }
        `}</style>
        <div className="flex-1 overflow-y-auto p-4 notifications-scroll">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-slate-800/50 rounded-full p-6 mb-4">
                <Info className="h-12 w-12 text-slate-600" />
              </div>
              <p className="text-slate-400 text-sm">Brak powiadomień</p>
              <p className="text-slate-600 text-xs mt-1">Wszystkie powiadomienia zostały przeczytane</p>
            </div>
          ) : (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClose={handleCloseNotification}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

