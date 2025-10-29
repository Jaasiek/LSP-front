import { useRef, useState, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Select from "react-select";
import locations from "@/data/locations";
import table_data from "@/data/table_data";
import LicencePlate from "@/components/LicencePlate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "520px",
};

const center = {
  lat: 52.2297,
  lng: 21.0122,
};

export default function MapPage() {
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

  function focusLocationById(id: string) {
    const loc = locations.find((l) => String(l.id) === String(id));
    if (loc && mapRef.current) {
      (mapRef.current as any).panTo({ lat: loc.lat, lng: loc.lng });
      (mapRef.current as any).setZoom(8);
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCXH8M2htOaqMfhLSn55G2nXj1x7FrXIQ",
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-cyan-400 text-lg">Ładowanie mapy...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-cyan-500" />
              Mapa Lokalizacji
            </CardTitle>
            <div className="w-64">
              <Select
                className="text-sm"
                classNamePrefix="rs"
                placeholder="Wybierz lokalizację..."
                options={options}
                value={options.find((o) => o.value === selectedId) || null}
                onChange={(opt) => {
                  const id = opt ? opt.value : "";
                  setSelectedId(id);
                  if (id) focusLocationById(id);
                }}
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#e2e8f0',
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: '#1e293b',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#334155' : '#1e293b',
                    color: '#e2e8f0',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#22d3ee',
                  }),
                  input: (base) => ({
                    ...base,
                    color: '#e2e8f0',
                  }),
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-slate-700/50">
            <GoogleMap
              onLoad={(map) => {
                mapRef.current = map as any;
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
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100">Pojazdy w Trasie</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                <TableHead className="text-slate-300">Marka</TableHead>
                <TableHead className="text-slate-300">Nr Rejestracyjny</TableHead>
                <TableHead className="text-slate-300">Trasa</TableHead>
                <TableHead className="text-slate-300">Przebieg</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table_data.slice(0, 10).map((vehicle) => (
                <TableRow key={vehicle.id} className="border-slate-700/30 hover:bg-slate-700/30">
                  <TableCell className="font-medium text-slate-200">{vehicle.make}</TableCell>
                  <TableCell>
                    <LicencePlate licenceNumber={vehicle.licencePlate} />
                  </TableCell>
                  <TableCell className="text-slate-300">
                    <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50">
                      Trasa {vehicle.route}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">{vehicle.odometer.toLocaleString()} km</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

