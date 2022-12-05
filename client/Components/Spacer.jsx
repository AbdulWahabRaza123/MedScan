import styled from "styled-components";
const Spacer = styled.div`
  width: ${(props) => {
    props.width ? props.width : "";
  }};
  height: ${(props) => {
    props.height ? props.height : "";
  }};
`;
export { Spacer };
