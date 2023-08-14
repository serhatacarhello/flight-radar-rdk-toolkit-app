import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { markerLocation } from "../../utils/marker";

export default function LocationMarker({ center }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerLocation}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
