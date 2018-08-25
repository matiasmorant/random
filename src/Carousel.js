import React, { Component } from "react";
import styled, { css } from "styled-components";

function widthLessThan(width) {
  return (...args) =>
    css`
      @media screen and (max-width: ${width}px) {
        ${css(...args)};
      }
    `;
}

function smoothSet({ comp, propName, initial, final, duration }) {
  let start = null;
  initial = initial == null ? comp[propName] : initial;
  const animation = time => {
    if (!start) start = time;
    const w = Math.min((time - start) / duration, 1);
    comp[propName] = w * final + (1 - w) * initial;
    if (w < 1) window.requestAnimationFrame(animation);
  };
  window.requestAnimationFrame(animation);
}

const Position = styled.div`
  display: flex;
  flex-direction: row;
  background: #333a;
  justify-content: center;
  align-items: center;
  width: 544px;
  ${widthLessThan(670)`
    width: calc(544 * 100vw / 670);
  `};
`;
const Indicator = styled.div`
  font-size: 9px;
  margin: 0px 3px;
  text-align: center;
  color: ${props => (props.highlighted ? "#ffff" : "#fff8")};
  height: 20px;
  line-height: 20px;
  ${widthLessThan(670)`
    height: calc(20 * 100vw / 670);
    line-height: calc(20 * 100vw / 670);
  `};
`;
const PositionIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 30px;
  ${widthLessThan(670)`
    height: calc(30 * 100vw / 670);
  `};
`;
class PositionIndicator extends Component {
  render() {
    return (
      <PositionIndicatorContainer>
        <Position>
          {[...Array(this.props.length).keys()].map(i => (
            <Indicator key={i} highlighted={i === this.props.current}>
              {" "}
              ●{" "}
            </Indicator>
          ))}
        </Position>
      </PositionIndicatorContainer>
    );
  }
}

const CarouselDiv = styled.div`
  position: relative;
  height: 250px;
  ${widthLessThan(670)`
    height: calc(250 * 100vw / 670);
  `};
`;
const InnerCarousel = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;
const InnerCarouselContent = styled.div`
  display: flex;
  height: 100%;
  width: auto;
  padding-left: 50px;
  padding-right: 50px;
  ${widthLessThan(670)`
    padding-left: calc(50 * 100vw / 670);
    padding-right: calc(50 * 100vw / 670);
  `};
`;
const Img = styled.img`
  margin-left: 5px;
  margin-right: 5px;
  width: 544px;
  ${widthLessThan(670)`
    margin-left: calc(5 * 100vw / 670);
    margin-right: calc(5 * 100vw / 670);
    width: calc(544 * 100vw / 670);
  `};
`;
const SwipeBtn = styled.button`
  height: 100%;
  position: absolute;
  background: #333a;
  border: 0px;
  color: #fff;
  top: 0;
  outline: none;
  ${props =>
    props.right
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `};
  width: 40px;
  ${widthLessThan(670)`
    width: calc(40 * 100vw / 670);
  `};
`;
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.pressed = false;
    this.last_move_coord = 0;
    const scale = window.matchMedia("(max-width: 700px)").matches
      ? document.documentElement.clientWidth / 670
      : 1;
    this.picWidth = (544 + 10) * scale;
    this.margin = 50 * scale;
  }
  handlePointerDown = x => {
    this.pressed = true;
    this.last_move_coord = x;
  };
  handlePointerMove = x => {
    if (this.pressed)
      this.innerCarousel["scrollLeft"] =
        this.innerCarousel.scrollLeft + this.last_move_coord - x;
    this.last_move_coord = x;
  };
  handlePointerUp = () => {
    this.pressed = false;
    const newPic = Math.round(
      (this.innerCarousel.scrollLeft - this.margin) / this.picWidth
    );
    this.props.onChange(newPic);
  };
  handlePointerLeave = () => {
    this.pressed = false;
    const newPic = Math.round(
      (this.innerCarousel.scrollLeft - this.margin) / this.picWidth
    );
    this.props.onChange(newPic);
  };

  scrollToSelection = () => {
    smoothSet({
      comp: this.innerCarousel,
      propName: "scrollLeft",
      final: this.props.selectedOption * this.picWidth,
      duration: 300
    });
  };
  componentDidUpdate = () => {
    this.scrollToSelection();
  };
  componentDidMount = () => {
    this.scrollToSelection();
  };
  render() {
    return (
      <CarouselDiv>
        <InnerCarousel
          innerRef={e => {
            this.innerCarousel = e;
          }}
          onMouseDown={e => this.handlePointerDown(e.clientX)}
          onMouseMove={e => this.handlePointerMove(e.clientX)}
          onMouseUp={() => this.handlePointerUp()}
          onMouseLeave={() => this.handlePointerLeave()}
          onTouchStart={e => this.handlePointerDown(e.touches[0].clientX)}
          onTouchMove={e => this.handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={() => this.handlePointerUp()}
        >
          <InnerCarouselContent>
            {this.props.images.map((name, i) => (
              <Img key={i} src={name} alt="apic" />
            ))}
          </InnerCarouselContent>
        </InnerCarousel>
        <PositionIndicator
          length={this.props.images.length}
          current={this.props.selectedOption}
        />
        {this.props.selectedOption !== 0 && (
          <SwipeBtn
            left
            onClick={e => this.props.onChange(this.props.selectedOption - 1)}
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
          </SwipeBtn>
        )}
        {this.props.selectedOption !== this.props.images.length - 1 && (
          <SwipeBtn
            right
            onClick={e => this.props.onChange(this.props.selectedOption + 1)}
          >
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </SwipeBtn>
        )}
      </CarouselDiv>
    );
  }
}
export default Carousel;
