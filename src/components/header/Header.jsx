import {
  Container,
  Spacer,
  Stack,
  useColorMode,
  // useColorMode,
} from "@chakra-ui/react";
import Logo from "./logo";
import Navbar from "./navbar";
import Auth from "./auth";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Logo colorMode={colorMode} />
        <Spacer />
        <Navbar colorMode={colorMode} />
        <Spacer />
        <Auth colorMode={colorMode} toggleColorMode={toggleColorMode} />
      </Stack>
    </Container>
  );
}
