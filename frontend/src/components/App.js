import React from "react";
import Container from "@mui/material/Container";
import Navbar from "./Navbar";
import ImageCarousel from "./Carousel";
import News from "./News";
import Footer from "./footer";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <ImageCarousel />
        <News />
        <Footer />
      </Container>
    </>
  );
}

export default App;
