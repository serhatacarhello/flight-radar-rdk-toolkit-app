import { Box, Spinner, Text } from "@chakra-ui/react";

export default function Loading({ children }) {
  return (
    <Box>
      <Spinner
        color="red.500"
        thickness="4px"
        speed="0.65s"
        emptyColor="cyan"
        size="xl"
      />
      {children}
    </Box>
  );
}
