import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Heading,
  Stack,
  Box,
  StackDivider,
  Center,
  useColorMode,
  // useDisclosure,
} from "@chakra-ui/react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useEffect, useRef, useState } from "react";
import { api } from "../../utils/useApi";
import Loading from "../Loading";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import moment from "moment";
import { Marker, Polyline } from "react-leaflet";
import { arrivalIcon, departureIcon } from "../../utils/marker";
import ImgFallback from "../img-fallback";
import { TbPlaneArrival } from "react-icons/tb";
import { TbPlaneDeparture } from "react-icons/tb";

export default function SideDetail({ isOpen, flyId, onClose }) {
  const [detail, setDetail] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    (async () => {
      //?  const response = await api.get(`flights/detail?flight=${fly.id}`)
      setDetail(null);
      setShowMap(false);
      const response = await api.get(`flights/detail`, {
        params: { flight: flyId },
      });
      // console.log(response.data);
      setDetail(response.data);
      // console.log("useEffect detail");
      // console.log("flyId", flyId);
    })();
  }, [flyId]);

  const toggleShowMap = () => {
    setShowMap((prev) => (prev === true ? false : true));
  };

  const positions = detail?.trail?.map((point) => [point.lat, point.lng]);
  // console.log("positions", positions);

  let initialPosition = null;
  let lastPosition = null;

  if (positions && positions.length > 0) {
    initialPosition = positions[positions.length - 1];
    lastPosition = positions[0];
  }
  // console.log("initialPosition", initialPosition);
  const { colorMode } = useColorMode();
  return (
    <>
      <Box>
        <Modal
          onClose={onClose}
          size={"xl"}
          isOpen={isOpen}
          scrollBehavior={"inside"}
          motionPreset="scale"
          closeOnOverlayClick={true}
          isCentered
        >
          <ModalOverlay
            // first option
            // bg="blackAlpha.300"
            // backdropFilter="blur(10px) hue-rotate(90deg)"
            //second option
            bg="none"
            backdropFilter="auto"
            backdropInvert="80%"
            backdropBlur="2px"
          />
          <ModalContent
            // style={{ background: "white" }}
            color={colorMode === "dark" ? "whiteAlpha.700" : "ButtonText"}
          >
            {!detail ? (
              <Center w={"full"} h={"25vh"}>
                <Loading />
              </Center>
            ) : (
              <>
                <ModalHeader>Flight Detail</ModalHeader>

                <ModalCloseButton />
                <ModalBody>
                  <Center minH={"100px"}>
                    {!detail.aircraft.images ? (
                      <Loading />
                    ) : (
                      <Splide
                        aria-label="Aircraft Images"
                        options={{
                          rewind: true,
                          perPage: 1,
                          width: 800,
                          // type: "loop",
                          // perPage: 3,
                          // autoplay: true,
                          pagination: false,
                        }}
                      >
                        {detail?.aircraft?.images?.large?.map((img, index) => (
                          <SplideSlide key={index}>
                            <ImgFallback
                              src={img.src}
                              style={{
                                borderRadius: "5px",
                                width: "100%",
                                height: "auto",
                              }}
                              alt={img.source}
                            />
                          </SplideSlide>
                        ))}
                      </Splide>
                    )}
                  </Center>

                  <Stack divider={<StackDivider />} spacing="4">
                    <Box mt={4}>
                      <Heading mt={4} size="xs" textTransform="uppercase">
                        Model
                      </Heading>
                      <Text pt="2" fontSize="xl">
                        {detail?.aircraft?.model?.text}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Callsign & Hex
                      </Heading>
                      <Text pt="2" fontSize="xl">
                        {detail?.identification?.callsign} &{" "}
                        {detail?.aircraft.hex}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Airline
                      </Heading>
                      <Text pt="2" fontSize="xl">
                        {detail.airline?.name}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Airport
                      </Heading>
                      <Link to={detail.airport?.origin?.website}>
                        <Text pt="2" fontSize="xl">
                          Origin : <br />
                          <Box display={"inline-block"} pe={2}>
                            <TbPlaneDeparture />
                          </Box>
                          {detail.airport?.origin?.name}
                        </Text>
                      </Link>
                      <Link to={detail.airport?.destination?.website}>
                        <Text pt="2" fontSize="xl">
                          Destination :
                          <br />
                          <Box display={"inline-block"} pe={2}>
                            <TbPlaneArrival />
                          </Box>
                          {detail.airport?.destination?.name}
                        </Text>
                      </Link>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Analysis
                      </Heading>
                      <Text pt="2" fontSize="xl">
                        Status:{" "}
                        <Box
                          display={"inline-block"}
                          background={detail?.status?.icon}
                          px={"1"}
                          color={"white"}
                        >
                          {detail?.status?.text && ` ${detail?.status?.text}`}
                        </Box>
                        <br />
                        {detail?.time?.scheduled?.departure && (
                          <>
                            Scheduled Departure:
                            {moment
                              .unix(detail.time.scheduled.departure)
                              .format("HH:mm:ss")}
                          </>
                        )}
                        <br />
                        {detail?.time?.scheduled?.arrival && (
                          <>
                            Scheduled Arrival:{" "}
                            {moment
                              .unix(detail.time.scheduled.arrival)
                              .format("HH:mm:ss")}
                          </>
                        )}
                        <br />
                        {detail.time.other.updated && (
                          <>
                            Updated Arrival Time :{" "}
                            {moment
                              .unix(detail.time.other.updated)
                              .format("HH:mm:ss")}
                          </>
                        )}
                      </Text>

                      {showMap && detail && (
                        <Box mt="4">
                          <MapContainer
                            style={{ height: "400px" }}
                            center={lastPosition}
                            zoom={5}
                            scrollWheelZoom={false}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Polyline
                              positions={detail?.trail?.map((point) => [
                                point.lat,
                                point.lng,
                              ])}
                              pathOptions={{ color: "red" }}
                            />
                            <Marker
                              position={lastPosition}
                              icon={arrivalIcon}
                            ></Marker>
                            <Marker
                              position={initialPosition}
                              icon={departureIcon}
                            ></Marker>
                          </MapContainer>
                        </Box>
                      )}
                    </Box>
                    <Stack>
                      <Button
                        alignSelf={"end"}
                        mt={2}
                        colorScheme="pink"
                        variant={"solid"}
                        onClick={toggleShowMap}
                      >
                        {showMap === true ? "Close" : "Open"} Flight Map
                      </Button>
                    </Stack>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
