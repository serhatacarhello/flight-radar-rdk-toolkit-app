import { Box, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box>
      <Spinner
        color="red.500"
        thickness="4px"
        speed="0.65s"
        emptyColor="cyan"
        size="xl"
      />
      <Text>Loading...</Text>
    </Box>
  );
}
