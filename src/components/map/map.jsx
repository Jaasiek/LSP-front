import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 52.2297,
  lng: 21.0122,
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBCXH8M2htOaqMfhLSn55G2nXj1x7FrXIQ"
  }); 
  if (!isLoaded) {
    return <p>Ładowanie mapy...</p>;
  }


  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      <Marker position={center} title="Warszawa" />
    </GoogleMap>
  );
}
