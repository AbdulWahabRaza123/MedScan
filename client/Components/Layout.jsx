import styled from "styled-components";
import { Row, Col, Image, Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { P } from "./Typography";
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
const Wrapper = styled.div`
  font-size: ${(props) => (props.size ? props.size : "")};
  color: ${(props) => (props.color ? props.color : "")};
  background: ${(props) => (props.bg ? props.bg : "")};
  width: ${(props) => (props.width ? props.width : "")};
  height: ${(props) => (props.height ? props.height : "")};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "")};
  border: ${(props) => (props.border ? props.border : "")};
  margin-left: ${(props) => (props.ms ? props.ms : "")};
  margin-right: ${(props) => (props.me ? props.me : "")};
  margin-top: ${(props) => (props.mt ? props.mt : "")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};
  font-family: ${(props) => (props.family ? props.family : "")};
`;
const SpanWrapper = styled.span`
  font-size: ${(props) => (props.size ? props.size : "")};
  color: ${(props) => (props.color ? props.color : "")};
  background: ${(props) => (props.bg ? props.bg : "")};
  margin-left: ${(props) => (props.ms ? props.ms : "")};
  margin-right: ${(props) => (props.me ? props.me : "")};
  margin-top: ${(props) => (props.mt ? props.mt : "")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};
`;
const LinkP = styled(P)`
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;
export { Row, Col, Container, ImageComp, useMediaQuery,Wrapper,SpanWrapper,LinkP };
