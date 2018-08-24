import React, { Component } from 'react';
import styled, {css} from 'styled-components'

import CarnivorousPlant from './assets/images/CarnivorousPlant.jpg'
import GreenWetPlant    from './assets/images/GreenWetPlant.jpg'
import RedStarPlant     from './assets/images/RedStarPlant.jpg'

function smoothSet({comp, propName, initial, final, duration}){
  let start = null;
  initial = initial==null ? comp[propName] : initial
  const animation = (time)=>{
    if(!start)
      start = time;
    const w = Math.min((time - start)/duration, 1);
    comp[propName] = w*final+(1-w)*initial;
    if(w<1)
      window.requestAnimationFrame(animation);
  }
  window.requestAnimationFrame(animation);
}

const Position = styled.div`
  display: flex;
  flex-direction: row;
  width: 544px;
  background: #333a;
  justify-content: center;
  align-items: center;
`
const Indicator = styled.div`
  font-size: 9px;
  margin: 0px 3px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: ${props => props.highlighted ? "#ffff" : "#fff8"};
`
const PositionIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
  width: 100%;
  position: absolute;
  bottom: 0;
`
class PositionIndicator extends Component{
  render(){
    return(
      <PositionIndicatorContainer>
        <Position>
          {[...Array(this.props.length).keys()].map((i)=>
            <Indicator key={i} highlighted={i==this.props.current}> ● </Indicator>
          )}
        </Position>
      </PositionIndicatorContainer>
    );
  }
}

const CarouselDiv = styled.div`
  height: 250px;
  position: relative;
`
const InnerCarousel = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`
const InnerCarouselContent = styled.div`
  display: flex;
  height: 100%;
  width: auto;
  padding: 0px 50px;
`
const Img = styled.img`
  margin: 0px 5px;
`
const SwipeBtn = styled.button`
  height: 100%;
  width: 40px;
  position: absolute;
  background: #333a;
  border: 0px;
  color: #fff;
  top: 0;
  ${props => props.right? css`right: 0;` : css`left: 0;`}
`
class Carousel extends Component{
  constructor(props){
    super(props);
    this.pressed = false;
    this.last_move_coord = 0;
    this.picWidth = 544+10
  }
  handleMouseDown = (mouseDownEvent)=>{
    this.pressed = true;
    this.last_move_coord = mouseDownEvent.clientX;
  }
  handleMouseMove = (mouseMoveEvent)=>{
    if(this.pressed)
    this.innerCarousel["scrollLeft"] = this.innerCarousel.scrollLeft + this.last_move_coord - mouseMoveEvent.clientX
    this.last_move_coord = mouseMoveEvent.clientX
  }
  handleMouseUp = ()=>{
    this.pressed = false;
    const newPic = Math.round((this.innerCarousel.scrollLeft-50) / this.picWidth)
    this.props.onChange(newPic)
  }
  handleMouseLeave = ()=>{
    this.pressed = false;
    const newPic = Math.round((this.innerCarousel.scrollLeft-50) / this.picWidth)
    this.props.onChange(newPic)
  }
  scrollToSelection = ()=>{
    smoothSet({
      comp: this.innerCarousel,
      propName: "scrollLeft",
      final: this.props.selectedOption * this.picWidth,
      duration: 300,
    })
  }  
  componentDidUpdate = ()=>{ this.scrollToSelection() }
  componentDidMount  = ()=>{ this.scrollToSelection() }
  render(){
    return(
      <CarouselDiv>
        <InnerCarousel
          innerRef={(e)=>{this.innerCarousel = e;}}
          onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
          onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
          onMouseUp={() => this.handleMouseUp()}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          <InnerCarouselContent>
            {this.props.images.map((name,i)=>
              <Img key={i} src={name} alt="apic" />
            )}
          </InnerCarouselContent>
        </InnerCarousel>
        <PositionIndicator length={this.props.images.length} current={this.props.selectedOption}/>
        {(this.props.selectedOption!=0)                    &&
          <SwipeBtn left  onClick={(e)=>this.props.onChange(this.props.selectedOption-1)}>
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </SwipeBtn>
        }
        {(this.props.selectedOption!=this.props.images.length-1) &&
          <SwipeBtn right onClick={(e)=>this.props.onChange(this.props.selectedOption+1)}>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </SwipeBtn>
        }
      </CarouselDiv>
    );
  }
}
export default Carousel;