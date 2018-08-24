import React, { Component } from 'react';
import styled, {css} from 'styled-components'

import Carousel from './Carousel.js'

const ChooserDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 500px;
  margin: 2px;
  font-family: 'Roboto', sans-serif;
  background: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`
const Title = styled.h1`
  text-align: center;
  color: #417B00;
  font-size: 24px;
  height: 60px;
  line-height: 60px;
`
const Description = styled.h2`
  text-align: center;
  color: #417B00;
  font-size: 12px;
`

class Chooser extends Component{
  constructor(props){
    super(props);
    this.state = {selectedOption: 0}
  }
  render(){
    return (
      <ChooserDiv>
        <Title>{this.props.title}</Title>
        <Carousel
          onChange={(op)=>this.setState({selectedOption: op})}
          selectedOption={this.state.selectedOption}
          images={this.props.images}
        />
        <Description>{this.props.descriptions[this.state.selectedOption]}</Description>
      </ChooserDiv>
    );
  }
}

export default Chooser;