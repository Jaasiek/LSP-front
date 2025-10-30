import { useRef, useState, useMemo, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import Select from "react-select";
// import locations from "@/data/locations";
import table_data from "@/data/table_data";
import LicencePlate from "@/components/LicencePlate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";

// Zhardcodowane trasy dla 5 lokalizacji (na potrzeby testów)
const routesData = {
  "LOC-0001": {
    from: ["LOC-0006", "LOC-0020", "LOC-0052"], // Trasy wychodzące z LOC-0001
    to: ["LOC-0002", "LOC-0014", "LOC-0027"], // Trasy przychodzące do LOC-0001
  },
  "LOC-0002": {
    from: ["LOC-0015", "LOC-0025", "LOC-0027"],
    to: ["LOC-0001", "LOC-0003", "LOC-0005"],
  },
  "LOC-0003": {
    from: ["LOC-0008", "LOC-0011", "LOC-0013"],
    to: ["LOC-0002", "LOC-0004", "LOC-0016"],
  },
  "LOC-0004": {
    from: ["LOC-0007", "LOC-0018", "LOC-0031"],
    to: ["LOC-0003", "LOC-0005", "LOC-0012"],
  },
  "LOC-0005": {
    from: ["LOC-0063", "LOC-0069", "LOC-0111"],
    to: ["LOC-0002", "LOC-0004", "LOC-0035"],
  },
};

const containerStyle = {
  width: "100%",
  height: "520px",
};

const center = {
  lat: 52.2297,
  lng: 21.0122,
};

export default function MapPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [routesData, setRotesData] = useState([]);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const [selectedId, setSelectedId] = useState("");
  const [directionsResults, setDirectionsResults] = useState({
    outgoing: [],
    incoming: [],
  });

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        const res = await fetch("http://10.7.221.120:6123/api/locations");

        if (!res.ok) throw new Error("Błąd pobierania danych");

        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          console.error("Błąd parsowania JSON:", parseErr);
          console.log("Otrzymane dane:", text + "...");
          throw new Error("Niepoprawny format JSON z API");
        }

        if (!Array.isArray(data)) {
          throw new Error("Oczekiwano tablicy obiektów lokalizacji");
        }

        const cleaned = data.map((item) => ({
          id: String(item.id ?? ""),
          lat: Number(item.lat ?? item.latitude ?? 0),
          lng: Number(item.long ?? item.lng ?? 0),
        }));

        setLocations(cleaned);
        console.log("✅ Pobrane lokalizacje:", cleaned);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  function focusLocationById(id) {
    const loc = locations.find((l) => String(l.id) === String(id));
    if (loc && mapRef.current) {
      mapRef.current.panTo({ lat: loc.lat, lng: loc.long });
      mapRef.current.setZoom(8);
    }
  }

  const options = useMemo(
    () =>
      locations.map((loc) => ({
        value: String(loc.id),
        label: String(loc.id),
      })),
    [locations]
  );

  // Pobieranie tras przez Directions API
  useEffect(() => {
    if (!selectedId || !routesData[selectedId] || !window.google) {
      setDirectionsResults({ outgoing: [], incoming: [] });
      return;
    }

    const routes = routesData[selectedId];
    const selectedLoc = locations.find((l) => l.id === selectedId);
    if (!selectedLoc) return;

    const directionsService = new window.google.maps.DirectionsService();
    const outgoingPromises = [];
    const incomingPromises = [];

    // Trasy wychodzące (niebieski) - dostosowane dla TIRów
    routes.from.forEach((targetId) => {
      const targetLoc = locations.find((l) => l.id === targetId);
      if (!targetLoc) return;

      const promise = new Promise((resolve) => {
        directionsService.route(
          {
            origin: { lat: selectedLoc.lat, lng: selectedLoc.lng },
            destination: { lat: targetLoc.lat, lng: targetLoc.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
            avoidFerries: true, // TIRy - unikaj promów
            avoidTolls: false, // TIRy mogą jeździć po autostradach płatnych
            provideRouteAlternatives: false, // Tylko najlepsza trasa
            optimizeWaypoints: true, // Optymalizuj trasę
          },
          (result, status) => {
            if (status === "OK") {
              resolve({ result, targetId });
            } else {
              resolve(null);
            }
          }
        );
      });
      outgoingPromises.push(promise);
    });

    // Trasy przychodzące (zielony) - dostosowane dla TIRów
    routes.to.forEach((sourceId) => {
      const sourceLoc = locations.find((l) => l.id === sourceId);
      if (!sourceLoc) return;

      const promise = new Promise((resolve) => {
        directionsService.route(
          {
            origin: { lat: sourceLoc.lat, lng: sourceLoc.lng },
            destination: { lat: selectedLoc.lat, lng: selectedLoc.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
            avoidFerries: true, // TIRy - unikaj promów
            avoidTolls: false, // TIRy mogą jeździć po autostradach płatnych
            provideRouteAlternatives: false, // Tylko najlepsza trasa
            optimizeWaypoints: true, // Optymalizuj trasę
          },
          (result, status) => {
            if (status === "OK") {
              resolve({ result, sourceId });
            } else {
              resolve(null);
            }
          }
        );
      });
      incomingPromises.push(promise);
    });

    Promise.all([...outgoingPromises, ...incomingPromises]).then((results) => {
      const outgoing = results.slice(0, routes.from.length).filter(Boolean);
      const incoming = results.slice(routes.from.length).filter(Boolean);
      setDirectionsResults({ outgoing, incoming });
    });
  }, [selectedId]);

  const { outgoing, incoming } = directionsResults;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCXH8M2htOaqMfhLSn55G2nXj1x7FrXIQ",
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-400 text-lg">Ładowanie mapy...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-slate-100 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-red-500" />
              Mapa Lokalizacji
            </CardTitle>
            <div className="flex items-center gap-4 flex-wrap">
              {selectedId && (
                <>
                  <Badge
                    variant="outline"
                    className="bg-slate-800/50 text-amber-400 border-amber-500/50 text-xs"
                  >
                    🚛 Trasy dla TIRów
                  </Badge>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-400" />
                      <span className="text-slate-300">Wychodzące</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4 text-green-400" />
                      <span className="text-slate-300">Przychodzące</span>
                    </div>
                  </div>
                </>
              )}
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
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: "#1e293b",
                      borderColor: "#ef4444",
                      color: "#e2e8f0",
                      boxShadow: "none",
                      outline: "none",
                      "&:hover": {
                        borderColor: "#dc2626",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#1e293b",
                      border: "1px solid #ef4444",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#334155" : "#1e293b",
                      color: "#e2e8f0",

                      cursor: "pointer",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#ef4444",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#e2e8f0",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#94a3b8",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        {!loading && error === null && (
          <CardContent>
            <div className="rounded-lg overflow-hidden border border-slate-700/50">
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
                {/* Markery lokalizacji */}
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

                {/* Trasy wychodzące (niebieski) - Z wybranej lokalizacji - renderowane przez Directions API */}
                {outgoing.map((route, idx) => (
                  <DirectionsRenderer
                    key={`outgoing-${idx}`}
                    directions={route.result}
                    options={{
                      suppressMarkers: true, // Ukryj domyślne markery
                      polylineOptions: {
                        strokeColor: "#3B82F6", // Niebieski
                        strokeOpacity: 0.7,
                        strokeWeight: 4,
                      },
                    }}
                  />
                ))}

                {/* Trasy przychodzące (zielony) - DO wybranej lokalizacji - renderowane przez Directions API */}
                {incoming.map((route, idx) => (
                  <DirectionsRenderer
                    key={`incoming-${idx}`}
                    directions={route.result}
                    options={{
                      suppressMarkers: true, // Ukryj domyślne markery
                      polylineOptions: {
                        strokeColor: "#10B981", // Zielony
                        strokeOpacity: 0.7,
                        strokeWeight: 4,
                      },
                    }}
                  />
                ))}
              </GoogleMap>
            </div>
          </CardContent>
        )}
      </Card>
      {loading && (
        <div className="flex items-center justify-center h-52">
          <p className="text-slate-400">Ładowanie lokalizacji...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center justify-center h-52">
          <p className="text-red-400 text-lg">
            Wystąpił błąd podczas ładowania lokalizacji
          </p>
        </div>
      )}

      {selectedId &&
        routesData[selectedId] &&
        outgoing.length > 0 &&
        incoming.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            key={`routes-${selectedId}`}
          >
            <Card
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm"
              key={`outgoing-card-${selectedId}`}
            >
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center text-base">
                  <ArrowRight className="mr-2 h-4 w-4 text-blue-400" />
                  Trasy Wychodzące ({outgoing.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {outgoing.map((route, idx) => {
                    const distance =
                      route.result?.routes?.[0]?.legs?.[0]?.distance?.text;
                    const duration =
                      route.result?.routes?.[0]?.legs?.[0]?.duration?.text;
                    return (
                      <div
                        key={idx}
                        className="p-3 bg-slate-800/30 rounded border border-blue-500/30"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-300 text-sm font-medium">
                            {selectedId}
                          </span>
                          <ArrowRight className="h-4 w-4 text-blue-400" />
                          <span className="text-slate-300 text-sm font-medium">
                            {route.targetId}
                          </span>
                        </div>
                        {distance && duration && (
                          <div className="flex gap-3 text-xs text-slate-400">
                            <span>📍 {distance}</span>
                            <span>⏱️ {duration}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm"
              key={`incoming-card-${selectedId}`}
            >
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center text-base">
                  <ArrowLeft className="mr-2 h-4 w-4 text-green-400" />
                  Trasy Przychodzące ({incoming.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {incoming.map((route, idx) => {
                    const distance =
                      route.result?.routes?.[0]?.legs?.[0]?.distance?.text;
                    const duration =
                      route.result?.routes?.[0]?.legs?.[0]?.duration?.text;
                    return (
                      <div
                        key={idx}
                        className="p-3 bg-slate-800/30 rounded border border-green-500/30"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-300 text-sm font-medium">
                            {route.sourceId}
                          </span>
                          <ArrowRight className="h-4 w-4 text-green-400" />
                          <span className="text-slate-300 text-sm font-medium">
                            {selectedId}
                          </span>
                        </div>
                        {distance && duration && (
                          <div className="flex gap-3 text-xs text-slate-400">
                            <span>📍 {distance}</span>
                            <span>⏱️ {duration}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100">Pojazdy w Trasie</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                <TableHead className="text-slate-300">Marka</TableHead>
                <TableHead className="text-slate-300">
                  Nr Rejestracyjny
                </TableHead>
                <TableHead className="text-slate-300">Trasa</TableHead>
                <TableHead className="text-slate-300">Przebieg</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(table_data) &&
                table_data.map((vehicle) => (
                  <TableRow
                    key={vehicle?.id || Math.random()}
                    className="border-slate-700/30 hover:bg-slate-700/30"
                  >
                    <TableCell className="font-medium text-slate-200">
                      {vehicle?.make || "N/A"}
                    </TableCell>
                    <TableCell>
                      <LicencePlate
                        licenceNumber={vehicle?.licencePlate || "XXX 0000"}
                      />
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <Badge
                        variant="outline"
                        className="bg-slate-800/50 text-red-400 border-red-500/50"
                      >
                        Trasa {vehicle?.route || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {(vehicle?.odometer || 0).toLocaleString()} km
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
