import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  HStack,

  // useColorMode,
} from "@chakra-ui/react";
import Loading from "../Loading";

export default function Info({ isLoading }) {
  return (
    <Box ml={20}>
      {isLoading ? (
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
  );
}
