import styled from "styled-components";
const RegistrationLoginBtn = styled.div`
  width: 90%;
  height: auto;
  border-radius: 20px;
  padding: 7px 20px 7px 20px;
  font-weight: 600;
  font-size: 18px;
  color: white;
  text-align: center;
  background: #64ebb6;
  &:hover {
    background: #183e8f;
  }
`;
const LoginBtn = styled.div`
  width: 100%;
  height: auto;
  border-radius: 20px;
  padding: 7px 20px 7px 20px;
  font-weight: 600;
  font-size: 18px;
  color: white;
  text-align: center;
  ${"" /* background: #64ebb6; */}
  background:#183e8f;
  &:hover {
    background: #64ebb6;
  }
`;
export { RegistrationLoginBtn, LoginBtn };
