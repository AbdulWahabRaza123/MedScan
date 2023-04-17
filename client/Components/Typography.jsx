import styled from "styled-components";
const H1 = styled.h1``;
const H2 = styled.h2``;
const H3 = styled.h3``;
const H4 = styled.h4``;
const H5 = styled.h5``;
const P = styled.p`
  font-style: normal;
  text-transform: ${(props) => (props.tt ? props.tt : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  line-height: ${(props) => (props.lHeight ? props.lHeight : "24px")};
  font-size: ${(props) => (props.size ? props.size : "16px")};
  color: ${(props) => (props.color ? props.color : "")};
  text-decoration: ${(props) => (props.td ? props.td : "")};
`;
export { H1, H2, H3,H4,H5,P };