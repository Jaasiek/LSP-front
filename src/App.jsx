import "./App.scss";
import Map from "./components/map/map";
import Header from "./components/header/header";
import VehicleAllocation from "./components/vehiclesAllocation/vehicleAllocation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notifications from "./components/notifications/notifications";
import Raports from "./components/raports/raports";
import UpcomingChanges from "./components/upcoming/upcomingChanges";
import UpcomingService from "./components/upcomingService/upcomingService";
import ChangesHistory from "./components/changesHistory/changesHistory";
import ChangeAllocForm from "./components/changeAllocForm/changeAllocForm";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<VehicleAllocation />} />
          <Route path="/map" element={<Map />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/raports" element={<Raports />} />
          <Route path="/upcomingChanges" element={<UpcomingChanges />} />
          <Route path="/upcomingServices" element={<UpcomingService />} />
          <Route path="/history" element={<ChangesHistory />} />
        </Routes>
        <ChangeAllocForm
          id={1}
          currentAlloc={8}
          brand={"MAN"}
          licencePlate={"WWL 1232K"}
        />
      </div>
    </Router>
  );
}

export default App;
