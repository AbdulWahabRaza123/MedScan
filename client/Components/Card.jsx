import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Spacer } from "./Spacer";
import { Row, Col, Wrapper, useMediaQuery, ImageComp } from "./Layout";
import { P } from "./Typography";
import MaterialCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "react-bootstrap/Card";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Tooltip from "@mui/material/Tooltip";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
const ContactCard = (props) => {
  return (
    <>
      <Col md={4} className="mt-5">
        <props.icon
          className="mt-1 mb-2"
          style={{ color: "gray", fontSize: "30px" }}
        />
        <h4>{props.title}</h4>
        <p>
          <b className="me-2">{props.title}:</b>
          {props.content}
        </p>
      </Col>
    </>
  );
};
const NavLogoStyle = {
  width: "70px",
  height: "70px",
};
const CardComp = (props) => {
  const Router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: props.width,
    bgcolor: "background.paper",
    boxShadow: 24,
    height: props.height,
    overflow: "scroll",
    p: 2,
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "end",
              justifyContent: "space-between",
            }}
          >
            <ImageComp
              src="/assets/logo.png"
              style={NavLogoStyle}
              fluid={true}
            />
            {/* <div>
              <h2 style={{letterSpacing:"5px",color:"gray"}}>{props.heading}</h2>
            </div> */}
            <CloseIcon
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={handleClose}
            />
          </div>
          {props.children}
        </Box>
      </Modal>
      <MaterialCard
        sx={{ maxWidth: 345 }}
        style={{ boxShadow: "5px 5px 10px gray" }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/assets/service1.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            X Ray Report
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your Report Status can check from here and if your report is
            available then your can easily access your report and contact to
            your doctor
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              if (props.restrict) Router.push("/Login");
              else handleOpen();
            }}
          >
            <b>Go</b>
          </Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </MaterialCard>
    </>
  );
};
const StepsCard = (props) => {
  const isResponsive = useMediaQuery({
    query: "(max-width: 453px)",
  });
  const [patientData, setPatientData] = useState(false);

  return (
    <>
      <Card
        className="mt-4"
        style={{
          width: "100%",
          height: "auto",
          overflow: "auto",
          boxShadow: "5px 5px 10px gray",
        }}
      >
        <div
          className={
            props.mode === "admin_report_gen"
              ? "ps-2 d-flex flex-row align-items-center"
              : ""
          }
        >
          {props.mode === "admin_report_gen" && !isResponsive ? (
            <img
              className="img-fluid"
              src="/assets/profile.jpg"
              alt="Profile"
              width="120px"
              height="120px"
            />
          ) : null}
          <Card.Body>
            <Card.Title style={{ color: "#183e8f", fontWeight: "600" }}>
              {props.title}
            </Card.Title>
            <Card.Text
              className="mb-0"
              style={{
                color: "gray",
                
                height:"50px",
                overflow:"hidden",
                textOverflow: "ellipsis",
                
              }}
            >
              {props.description}
            </Card.Text>
            {patientData && props.mode === "patient_report" && (
              <>
                <Wrapper
                  className="d-flex flex-row align-items-center justify-content-end mt-2"
                  width="100%"
                >
                  <ArrowDropUpIcon
                    onClick={() => {
                      setPatientData(false);
                    }}
                    style={{ cursor: "pointer" }}
                    className="mb-1"
                  />
                </Wrapper>
              </>
            )}
            {!patientData && props.mode === "patient_report" && (
              <>
                <Wrapper
                  className="d-flex flex-row align-items-center justify-content-end"
                  width="100%"
                >
                  <ArrowDropDownIcon
                    onClick={() => {
                      setPatientData(true);
                    }}
                    style={{ cursor: "pointer" }}
                    className="mb-1 mt-2 me-1"
                  />
                  <FullscreenIcon
                    onClick={() => {
                      props.setFullScreenReport({
                        radiologistName: props.title,
                        radiologistEmail: props.radiologistEmail,
                        patientName: props.patientName,
                        patientEmail: props.patientEmail,
                        image: props.image,
                        report: props.description,
                      });
                      props.setOpenFullScreen(true);
                    }}
                    className="mb-0"
                    style={{ fontSize: "20px", cursor: "pointer" }}
                  />
                </Wrapper>
              </>
            )}
            {props.mode === "patient_report" && patientData ? (
              <>
                <hr className="mt-0" />
                <Wrapper className="d-flex flex-row align-items-center justify-content-between">
                  <Wrapper width="50%">
                    <Wrapper className="d-flex flex-row align-items-center">
                      <P size="14px">{props.patientName}</P>
                    </Wrapper>
                    <Wrapper className="d-flex flex-row align-items-center">
                      <P size="14px">{props.patientEmail}</P>
                    </Wrapper>
                    <Wrapper className="d-flex flex-row align-items-center">
                      <P size="14px">{props.radiologistEmail}</P>
                    </Wrapper>
                  </Wrapper>
                  <img
                    src={props.image}
                    alt="patient image"
                    width="30%"
                    height="30%"
                  />
                </Wrapper>
              </>
            ) : null}
            {props.mode === "admin_report_gen" ? (
              <>
                <Spacer height="20px" />
                <Wrapper className="d-flex flex-row">
                  <Tooltip title="Reports">
                    <VaccinesIcon
                      onClick={() => {
                        props.setRadiologistReports(props.reports);
                        props.setOpenPatient(true);
                      }}
                      style={{ color: "#183e8f", cursor: "pointer" }}
                    />
                  </Tooltip>
                  <div onClick={props.deleteRadiologist}>
                    <Tooltip className="ms-2" title="Delete Radiologist">
                      <DeleteOutlineIcon
                        className="pt-1"
                        style={{ color: "#183e8f", cursor: "pointer" }}
                      />
                    </Tooltip>
                  </div>
                </Wrapper>
              </>
            ) : null}
          </Card.Body>
        </div>
      </Card>
    </>
  );
};
const PatientsInfoCard = (props) => {
  const [accordian, setAccordian] = useState(false);
  const isResponsive = useMediaQuery({
    query: "(max-width: 453px)",
  });
  return (
    <>
      <Card
        className="mt-4"
        style={{
          width: "100%",
          height: "auto",
          overflow: "auto",
        }}
      >
        <div className="ps-2 d-flex flex-row align-items-center">
          <Card.Body>
            <Card.Title style={{ fontWeight: "600" }}>{props.name}</Card.Title>
            <Wrapper className="d-flex flex-row align-items-center justify-content-between">
              <Card.Text className="mb-0" style={{ color: "gray" }}>
                {props.email}
              </Card.Text>
              <Wrapper className="d-flex">
                <div>
                  <Tooltip title="Read Report">
                    <AssessmentIcon
                      onClick={() => {
                        setAccordian(true);
                      }}
                      style={{ color: "gray", cursor: "pointer" }}
                    />
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Delete Patient">
                    <DeleteOutlineIcon
                      style={{ color: "gray", cursor: "pointer" }}
                    />
                  </Tooltip>
                </div>
              </Wrapper>
            </Wrapper>
          </Card.Body>
        </div>
      </Card>
      {props.mode === "accordian" && accordian ? (
        <>
          <Card style={{ boxShadow: "1px 1px 3px gray" }}>
            <div
              className="d-flex flex-row align-items-center justify-content-end"
              style={{ width: "100%" }}
            >
              <ArrowDropUpIcon
                onClick={() => {
                  setAccordian(false);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Card.Body>
              <P className="mb-0" color="gray">
                {props.report}
              </P>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </>
  );
};
export { StepsCard, ContactCard, PatientsInfoCard };
export default CardComp;
