import { Button, ButtonGroup, Container, HStack } from "@chakra-ui/react";

export default function Flights() {
  return (
    <Container minW={"85vw"}>
      {/* <h1>Flight Information</h1> */}
      <img
        style={{ width: "100%", height: "auto" }}
        src="/plane.jpg"
        alt="Airplane"
      />
      <HStack justify="center" spacing={4} mt={4}>
        <ButtonGroup mb={5}>
          <Button colorScheme="pink" variant="solid">
            Buy Ticket
          </Button>
          <Button colorScheme="pink" variant="outline">
            Make Reservation
          </Button>
        </ButtonGroup>
      </HStack>
    </Container>
  );
}
