import L from "leaflet";

// L.Icon nesnesini oluşturun
export const departureIcon = new L.Icon({
  iconUrl: "/departure.png",
  iconSize: [50, 50],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});
export const arrivalIcon = new L.Icon({
  iconUrl: "/arrival.png",
  iconSize: [50, 50],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});
export const markerIcon = new L.Icon({
  // iconUrl: "/marker.png",
  iconUrl: "/airplane.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});
export const markerLocation = new L.Icon({
  // iconUrl: "/marker.png",
  iconUrl: "/locationMarker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});
