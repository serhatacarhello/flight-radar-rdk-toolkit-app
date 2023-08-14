import { Container } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";

import Header from "./components/header";
import Home from "./pages/Home";
import Flights from "./pages/Flights";

function App() {
  return (
    <BrowserRouter>
      <Container
        minW="100vw"
        minH={"100vh"}
        bg="Background"
        color="#262626"
        overflowY={"hidden"}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index path="/" element={<MapView />} />
            <Route path="/list" element={<ListView />} />
            <Route path="/flights" element={<Flights />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
