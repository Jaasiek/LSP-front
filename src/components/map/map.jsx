import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import locations from "./locations";

const containerStyle = {
  width: "50%",
  height: "500px",
};

// Środek mapy (Warszawa)
const center = {
  lat: 52.2297,
  lng: 21.0122,
};

// Lista punktów (lat, lng, title)

export default function Map() {
  function getData(id) {
    console.log("Location id: " + id);
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCXH8M2htOaqMfhLSn55G2nXj1x7FrXIQ",
  });

  if (!isLoaded) {
    return <p>Ładowanie mapy...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6} // zmniejszone zoom, aby wszystkie punkty się zmieściły
    >
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.id}
          onClick={() => getData(loc.id)}
        />
      ))}
    </GoogleMap>
  );
}
