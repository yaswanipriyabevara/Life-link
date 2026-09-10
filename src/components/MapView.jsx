import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapView({ latitude, longitude }) {
  return (
    <div className="map-container">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker
          center={[latitude, longitude]}
          radius={12}
        >
          <Popup>
            <strong>Accident Location</strong>
            <br />
            Latitude: {latitude}
            <br />
            Longitude: {longitude}
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}

export default MapView;