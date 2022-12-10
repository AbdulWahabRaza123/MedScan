import styled from "styled-components";
import { Row, Col, Image, Container } from "react-bootstrap";
export const Wrapper = styled.div``;
import { useMediaQuery } from "react-responsive";
const ImageComp = (props) => {
  return (
    <>
      <Image
        src={props.src}
        style={props.style ? props.style : null}
        fluid={props.fluid ? props.fluid : false}
        alt={props.alt ? props.alt : "photo"}
      />
    </>
  );
};
export { Row, Col, Container, ImageComp, useMediaQuery };
