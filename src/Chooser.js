import React, { Component } from "react";
import styled, {css} from "styled-components";

import Carousel from "./Carousel.js";

function widthLessThan(width){
  return (...args) => css`@media screen and (max-width: ${width}px) {${css(...args)}}`
}

const ChooserDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px;
  font-family: "Roboto", sans-serif;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: 650px;
  height: 500px;
  ${widthLessThan(670)`
    width: calc(650 * 100vw / 670);
    height: calc(500 * 100vw / 670);
  `}      
`;
const Title = styled.h1`
  text-align: center;
  color: #417b00;
  font-size: 24px;
  height: 60px;
  line-height: 60px;
  ${widthLessThan(670)`
    font-size: calc(24 * 100vw / 670);
    height: calc(60 * 100vw / 670);
    line-height: calc(60 * 100vw / 670);
  `}  
`;
const Description = styled.h2`
  text-align: center;
  color: #417b00;
  font-size: 12px;
  ${widthLessThan(670)`
    font-size: calc(12 * 100vw / 670);
  `}    
`;

class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: 0 };
  }
  render() {
    return (
      <ChooserDiv>
        <Title>{this.props.title}</Title>
        <Carousel
          onChange={op => this.setState({ selectedOption: op })}
          selectedOption={this.state.selectedOption}
          images={this.props.images}
        />
        <Description>
          {this.props.descriptions[this.state.selectedOption]}
        </Description>
      </ChooserDiv>
    );
  }
}

export default Chooser;
