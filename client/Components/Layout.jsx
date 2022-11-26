import styled from "styled-components";
import { Row, Col, Image } from "react-bootstrap";
export const ImageComp = (props) => {
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
export { Row, Col };
