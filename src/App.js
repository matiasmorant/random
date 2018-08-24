import React, { Component } from "react";
import styled from "styled-components";

import CarnivorousPlant from "./assets/images/CarnivorousPlant.jpg";
import GreenWetPlant from "./assets/images/GreenWetPlant.jpg";
import RedStarPlant from "./assets/images/RedStarPlant.jpg";

import Chooser from "./Chooser.js";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #193100;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Chooser
          title="GALLERY"
          images={[CarnivorousPlant, GreenWetPlant, RedStarPlant]}
          descriptions={[
            "CARNIVOROUS PLANT",
            "GREEN WET PLANT",
            "RED STAR PLANT"
          ]}
        />
      </AppContainer>
    );
  }
}

export default App;
