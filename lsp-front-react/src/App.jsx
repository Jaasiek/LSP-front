import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import MapPage from './pages/MapPage'
import VehicleAllocationPage from './pages/VehicleAllocationPage'
import UpcomingServicesPage from './pages/UpcomingServicesPage'
import ReportsPage from './pages/ReportsPage'
import HistoryPage from './pages/HistoryPage'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<Dashboard><MapPage /></Dashboard>} />
          <Route path="/vehicles" element={<Dashboard><VehicleAllocationPage /></Dashboard>} />
          <Route path="/services" element={<Dashboard><UpcomingServicesPage /></Dashboard>} />
          <Route path="/reports" element={<Dashboard><ReportsPage /></Dashboard>} />
          <Route path="/history" element={<Dashboard><HistoryPage /></Dashboard>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App

