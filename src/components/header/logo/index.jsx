import { Box, Image } from "@chakra-ui/react";

export default function Logo({ colorMode }) {
  return (
    <Box p={"1.5"}>
      <Image
        borderRadius="full"
        boxSize="70px"
        src={"/logo.png"}
        alt="logo image"
        bg={colorMode === "dark" ? "whiteAlpha.800" : ""}
      />
    </Box>
  );
}
