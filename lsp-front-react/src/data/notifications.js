// Zahardcodowane notyfikacje - w przyszłości będą przychodzić z backendu
export const hardcodedNotifications = [
  {
    id: 1,
    type: "warning", // warning, error, info
    title: "Przekroczenie limitu kilometrów",
    message: "Pojazd WX-1234 zbliża się do limitu serwisowego. Pozostało 250 km do przeglądu.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minut temu
    isRead: false,
    vehicleId: "WX-1234"
  },
  {
    id: 2,
    type: "error",
    title: "Upływająca data przeglądu",
    message: "Pojazd WX-5678 wymaga przeglądu technicznego za 3 dni (2024-11-02).",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minut temu
    isRead: false,
    vehicleId: "WX-5678"
  },
  {
    id: 3,
    type: "warning",
    title: "Niski stan paliwa",
    message: "Pojazd WX-9101 ma niski stan paliwa (15%). Zalecane uzupełnienie na trasie.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minut temu
    isRead: false,
    vehicleId: "WX-9101"
  },
  {
    id: 4,
    type: "error",
    title: "Przekroczenie czasu jazdy",
    message: "Kierowca pojazdu WX-3456 przekroczył dozwolony czas jazdy. Wymagana przerwa.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minut temu
    isRead: true,
    vehicleId: "WX-3456"
  },
  {
    id: 5,
    type: "warning",
    title: "Zbliżający się termin ubezpieczenia",
    message: "Ubezpieczenie pojazdu WX-7890 wygasa za 7 dni. Wymagane odnowienie.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 godziny temu
    isRead: true,
    vehicleId: "WX-7890"
  }
]

// Funkcja do pobierania nieprzeczytanych notyfikacji
export function getUnreadNotifications() {
  return hardcodedNotifications.filter(n => !n.isRead)
}

// Funkcja do pobierania wszystkich notyfikacji
export function getAllNotifications() {
  return hardcodedNotifications
}

// Funkcja formatująca czas (np. "5 minut temu")
export function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  
  if (seconds < 60) return "Przed chwilą"
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min temu`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h temu`
  
  const days = Math.floor(hours / 24)
  return `${days}d temu`
}

