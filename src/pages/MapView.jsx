import { Marker, Popup, useMapEvent } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SideDetail from "../components/side-detail";
import { markerIcon } from "../utils/marker";
import Info from "../components/info";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import LocationMarker from "../components/location-marker";

export default function MapView() {
  const { flights, isLoading } = useSelector((store) => store.flight);
  const center = [39.1505, 34.8];
  const animateRef = useRef(false);
  const [id, setId] = useState(null);

  // // LocationMarker component
  // function LocationMarker() {
  //   const map = useMapEvent("locationfound", (e) => {
  //     setPosition(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom());
  //   });

  //   return position === null ? null : (
  //     <Marker icon={markerIcon} position={position}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   );
  // }

  // SetViewOnClick component
  function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      });
    });

    return null;
  }

  // Handle marker click and open detail
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = useCallback((id) => {
    setId(id);
    onOpen();
  }, []);

  return (
    <Box width={"full"} height={"full"} mt={5}>
      <Center mb={2}>
        <Info flights={flights} isLoading={isLoading} />
      </Center>
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
          <Marker
            key={index}
            position={[fly.latitude, fly.longitude]}
            icon={markerIcon}
            onClick={() => handleClick(fly.id)}
          >
            <Popup>
              <Text fontSize={"lg"}>
                {fly?.code && `Code: ${fly?.code}`}
                <br />
                <br />
                {fly?.model && `Model:${fly?.model}`} <br />
                <br />
                {fly?.identifier && `Identifier:${fly?.identifier}`}
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
        ))}

        <SideDetail isOpen={isOpen} flyId={id} onClose={onClose} />
        <LocationMarker center={center} />
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </Box>
  );
}
