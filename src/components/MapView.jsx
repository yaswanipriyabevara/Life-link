import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapView({
  latitude,
  longitude,
  hospitals = [],
  recommendedHospital = null
}) {
  return (
    <div className="map-container">
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Accident Location */}
        <CircleMarker
          center={[latitude, longitude]}
          radius={12}
        >
          <Popup>
            <strong>🚨 Accident Location</strong>
            <br />
            Latitude: {latitude}
            <br />
            Longitude: {longitude}
          </Popup>
        </CircleMarker>

        {/* Hospital Locations */}
        {hospitals.map((hospital) => {
          if (
            hospital.latitude === undefined ||
            hospital.longitude === undefined
          ) {
            return null;
          }

          const isRecommended =
            recommendedHospital?.id === hospital.id;

          return (
            <Marker
              key={hospital.id}
              position={[
                hospital.latitude,
                hospital.longitude
              ]}
            >
              <Popup>
                <strong>
                  {isRecommended
                    ? "⭐ Recommended Hospital"
                    : "🏥 Hospital"}
                </strong>

                <br />
                {hospital.name}

                <br />
                Distance: {hospital.distance} km

                <br />
                Trauma Level: {hospital.traumaLevel}

                <br />
                Availability:{" "}
                {hospital.availability
                  ? "Available"
                  : "Unavailable"}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;