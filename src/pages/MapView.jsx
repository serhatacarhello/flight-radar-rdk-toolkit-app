import { Marker, Popup, useMapEvent, useMapEvents } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { Box, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SideDetail from "../components/side-detail";
import { markerIcon } from "../utils/marker";

export default function MapView() {
  const { flights } = useSelector((store) => store.flight);
  // console.log("🚀 ~ file: MapView.jsx:16 ~ MapView ~ state:", flights[0]);

  let center = [39.1505, 34.8];
  const animateRef = useRef(false);
  const [position, setPosition] = useState(center);
  const [id, setId] = useState(null);
  useEffect(() => {}, []);

  function LocationMarker() {
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
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }
  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      });
    });

    return null;
  }

  // for model
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (id) => {
    setId(id);
    onOpen();
  };
  return (
    <Box width={"full"} height={"full"} mt={5}>
      <MapContainer
        center={center}
        style={{ height: "80vh" }}
        zoom={6.7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {flights?.map((fly, index) => (
          <>
            <Marker
              key={index}
              position={[fly.latitude, fly.longitude]}
              icon={markerIcon}
            >
              <Popup>
                <Text fontSize={"lg"}>
                  {fly?.code && `Code: ${fly?.code}`}
                  <br />
                  <br />
                  {fly?.model && `Model:${fly?.model}`} <br />
                  <br />
                  {fly?.identifier && `Identifier:${fly?.identifier}`}
                  {/* <br />
                  <br />
                  {fly?.speed && `Speed:${fly?.speed}`} */}
                </Text>
                <HStack>
                  <Button
                    w={"full"}
                    variant={"solid"}
                    size={"md"}
                    colorScheme="pink"
                    onClick={() => handleClick(fly.id)}
                  >
                    Detail
                  </Button>
                </HStack>
              </Popup>
            </Marker>
          </>
        ))}
        <SideDetail isOpen={isOpen} flyId={id} onClose={onClose} />
        <LocationMarker />
        <DraggableMarker />
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </Box>
  );
}
