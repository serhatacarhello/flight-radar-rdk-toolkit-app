import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Center,
  Button,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Pagination from "../components/pagination";
import { useState } from "react";
import SideDetail from "../components/side-detail";

export default function ListView() {
  const state = useSelector((store) => store.flight);
  // console.log("listviwew", state.flights[0]);
  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const displayedData = state?.flights?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // for model
  const [id, setId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (id) => {
    setId(id);
    onOpen();
  };
  const { colorMode } = useColorMode();

  return (
    <Box p={5} color={colorMode === "dark" ? "whiteAlpha.800" : ""}>
      {state.isLoading && (
        <Center w={"100%"} h={"100%"}>
          <Loading />
        </Center>
      )}
      {!state.isLoading && (
        <>
          <TableContainer>
            <Table variant="striped" colorScheme="linkedin" size={"md"}>
              <Thead>
                <Tr>
                  <Th>Index</Th>
                  <Th>Id</Th>
                  <Th>Code</Th>
                  <Th>identifier</Th>
                  <Th isNumeric>altitude</Th>
                  <Th isNumeric>latitude</Th>
                  <Th isNumeric>longitude</Th>
                  <Th>model</Th>
                  <Th isNumeric>speed</Th>
                  <Th>Detail</Th>
                </Tr>
              </Thead>
              <Tbody>
                {state.flights.length > 0 &&
                  displayedData.map((fly, index) => (
                    <Tr key={fly.id}>
                      <Td> {index + 1 + currentPage * itemsPerPage}</Td>
                      <Td>{fly.id}</Td>
                      <Td>{fly.code}</Td>
                      <Td>{fly.identifier}</Td>
                      <Td isNumeric>{fly.altitude}</Td>
                      <Td isNumeric>{fly.latitude}</Td>
                      <Td isNumeric>{fly.longitude}</Td>
                      <Td>{fly.model}</Td>
                      <Td isNumeric>{fly.speed}</Td>
                      <Td>
                        <Button
                          variant={colorMode === "dark" ? "solid" : "outline"}
                          size={"lg"}
                          colorScheme="pink"
                          onClick={() => handleClick(fly.id)}
                        >
                          Detail
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={state?.flights?.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <SideDetail isOpen={isOpen} flyId={id} onClose={onClose} />
    </Box>
  );
}
