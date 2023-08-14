import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Image,
  Spacer,
  Stack,
  useColorMode,
  // useColorMode,
} from "@chakra-ui/react";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header() {
  const store = useSelector((store) => {
    return store;
  });
  // console.log("🚀 ~ file: index.jsx:6 ~ Header ~ store:", store);

  const { colorMode, toggleColorMode } = useColorMode();
  const handleClick = () => {
    toggleColorMode();
    const styleEl = document.createElement("style");
    const cssText = document.createTextNode(
      "html * { transition: color, background-color 0.3s ease-out!important }"
    );
    styleEl.appendChild(cssText);
    document.head.appendChild(styleEl);
    setTimeout(() => {
      document.head.removeChild(styleEl);
    }, 300);
  };

  return (
    <Container
      minW={"85vw"}
      color={colorMode === "dark" ? "whiteAlpha.800" : ""}
    >
      <Stack
        bg={"InfoBackground"}
        mb={4}
        shadow={"lg"}
        flexDir={"row"}
        justifyContent={"space-between"}
        align={"center"}
      >
        <Box p={"1.5"}>
          <Image
            borderRadius="full"
            boxSize="70px"
            src={`/logo.png`}
            alt="logo image"
            bg={colorMode === "dark" ? "whiteAlpha.800" : ""}
          />
        </Box>
        <Spacer />
        <Box ml={20}>
          {store.flight.isLoading ? (
            <HStack>
              <Loading />
              <Alert borderRadius={5} status="info">
                <AlertIcon />
                <AlertTitle>Flights are loading!!!!</AlertTitle>
                <AlertDescription>Please keep calm.</AlertDescription>
              </Alert>
            </HStack>
          ) : (
            <Alert borderRadius={5} status="success">
              <AlertIcon />
              <AlertTitle>Flights are successfully loaded.</AlertTitle>
              {/* <AlertDescription>
              <span
                style={{ color: "red", fontSize: "20px" }}
              >{`${store?.flight.flights?.length}`}</span>{" "}
              aircraft has found.
            </AlertDescription> */}
            </Alert>
          )}
        </Box>

        <Spacer />
        <ButtonGroup me={2}>
          <Button
            variant={colorMode === "light" ? "outline" : "solid"}
            colorScheme={colorMode === "light" ? "purple" : "green"}
            onClick={handleClick}
          >
            {colorMode !== "light" ? <FaSun /> : <FaMoon />}
          </Button>
          <Button variant={"solid"} colorScheme="pink">
            Sign In
          </Button>
          <Button variant={"outline"} colorScheme="pink">
            Sign Up
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
}
