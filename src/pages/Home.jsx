import { Box, Container, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import fetchFlights from "../redux/actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedFlights = JSON.parse(localStorage.getItem("flights"));

    if (!storedFlights || storedFlights.length < 1) {
      dispatch(fetchFlights());
    }
  }, []);

  const { colorMode } = useColorMode();

  return (
    <Container minW={"85vw"}>
      <Box
        width={"100%"}
        color={colorMode === "dark" ? "whiteAlpha.700" : "ButtonText"}
      >
        <Outlet />
      </Box>
    </Container>
  );
}
