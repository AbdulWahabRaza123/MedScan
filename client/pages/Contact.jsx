import React from "react";
import NavbarComp from "../Components/Navbar";
import FooterComp from "../Components/Footer";
import styled from "styled-components";
import { Container, Row, Col } from "../Components/Layout";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import BusinessIcon from "@mui/icons-material/Business";
import { ContactCard } from "../Components/Card";
import { useState, useEffect } from "react";
const ContactStyle = styled.div`
  margin-top: 10vh;
`;
const MapStyle = styled.div`
  text-align: center;
  margin-top: 20vh;
`;
const Section = styled.div`
  margin-top: 5vh;
`;
const ContactCardStyle = styled.div``;
const Contact = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
    <>
      <NavbarComp title="Contact" />
      <ContactStyle>
        <Container>
          <MapStyle>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.7432091803544!2d73.02663591470696!3d33.71559304284392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbef8c137888d%3A0xc3ccfd031ad14ba6!2sBahria%20University!5e0!3m2!1sen!2s!4v1669919256637!5m2!1sen!2s"
              width="100%"
              height="300px"
              style={{ border: "1px solid black", borderRadius: "15px" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapStyle>
          <Section>
            <h1>Contact:</h1>
            <ContactCardStyle className="mb-5">
              <Row>
                <ContactCard
                  icon={AddIcCallIcon}
                  title="Phone"
                  content="03111234567"
                />
                <ContactCard
                  icon={ForwardToInboxIcon}
                  title="Email"
                  content="abdulwahabraza123@gmail.com"
                />
                <ContactCard
                  icon={BusinessIcon}
                  title="Address"
                  content="Bahria University Islamabad,E8"
                />
              </Row>
            </ContactCardStyle>
          </Section>
        </Container>
        <FooterComp />
      </ContactStyle>
    </>
  ) : (
    <></>
  );
};

export default Contact;
