import { useRef, useState, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Select from "react-select";
import locations from "./locations";
import table_data from "./table_data";
import LicencePlate from "../licencePlate/licencePlate";
import onTheWayTable from "../../models/onTheWayTable";
import "./map.scss";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const containerStyle = {
  width: "100%",
  height: "520px",
};

const center = {
  lat: 52.2297,
  lng: 21.0122,
};

export default function Map() {
  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState("");
  const options = useMemo(
    () =>
      locations.map((loc) => ({
        value: String(loc.id),
        label: String(loc.id),
      })),
    []
  );

  function getData(id) {
    console.log("Location id: " + id);
  }

  function focusLocationById(id) {
    const loc = locations.find((l) => String(l.id) === String(id));
    if (loc && mapRef.current) {
      mapRef.current.panTo({ lat: loc.lat, lng: loc.lng });
      mapRef.current.setZoom(8);
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCXH8M2htOaqMfhLSn55G2nXj1x7FrXIQ",
  });

  if (!isLoaded) {
    return <p>Ładowanie mapy...</p>;
  }

  return (
    <section className="map-section">
      <div className="map-card">
        <div className="map-header">
          <h2 className="map-title">Mapa lokalizacji</h2>
          <div className="map-select">
            <Select
              className="rs-select"
              classNamePrefix="rs"
              placeholder="Wybierz lokalizację..."
              options={options}
              value={options.find((o) => o.value === selectedId)}
              onChange={(opt) => {
                const id = opt ? opt.value : "";
                setSelectedId(id);
                if (id) focusLocationById(id);
              }}
              isClearable
            />
          </div>
        </div>

        <div className="map-canvas">
          <GoogleMap
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onUnmount={() => {
              mapRef.current = null;
            }}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
          >
            {locations.map((loc) => {
              const isSelected =
                selectedId && String(loc.id) === String(selectedId);
              return (
                <Marker
                  key={loc.id}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  title={String(loc.id)}
                  opacity={isSelected ? 1 : selectedId ? 0.6 : 1}
                  zIndex={isSelected ? 1000 : 1}
                  animation={
                    isSelected && window.google
                      ? window.google.maps.Animation.BOUNCE
                      : undefined
                  }
                  onClick={() => {
                    const id = String(loc.id);
                    setSelectedId(id);
                    focusLocationById(id);
                  }}
                />
              );
            })}
          </GoogleMap>
        </div>
      </div>
      <div className="table">
        <Table>
          <TableHeader>
            <TableRow>
              {onTheWayTable.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table_data.map((row, index) => (
              <>
                <TableRow>
                  <TableCell key={index}>{row.make}</TableCell>
                  <TableCell>
                    <LicencePlate licenceNumber={row.licencePlate} />
                  </TableCell>
                  <TableCell>{row.route}</TableCell>
                  <TableCell>{row.odometer}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
