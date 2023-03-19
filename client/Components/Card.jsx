import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Spacer } from "./Spacer";
import MaterialCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "react-bootstrap/Card";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { Row, Col, Wrapper } from "./Layout";
import axios from "axios";
import { P } from "./Typography";
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

const CardComp = (props) => {
  const Router = useRouter();
  const [file, setFile] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [report,setReport]=useState("Hello...");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    height: "100vh",
    overflow: "scroll",
    p: 2,
  };

  const GenerateReport = async () => {
    try {
      const res = await axios.post("/GenerateReport", file,{
        headers: {
          "Content-Type": "multipart/form-data",
        }});
        console.log("This is reponse ",res);
        if(res.data.message==="done"){
setReport(res.data.report);
        }else{
        }
    } catch (ex) {
      console.log(ex);
    }
  
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
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2>Report Generation</h2>
            </div>
            <CloseIcon
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={handleClose}
            />
          </div>
          {props.mode === "radiologist" ? (
            <>
              <Wrapper>
                <Spacer height="10vh" />
                <Row>
                  <Col md={4}>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ background: "#183e8f" }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(event) => {
                          setShowImage(event.target.files[0]);
                          const formData = new FormData();
                          formData.append(
                            "Image",
                            event.target.files[0],
                            event.target.files[0].name
                          );
                          setFile(formData);
                        }}
                      />
                    </Button>
                    {showImage && (
                      <Button
                        variant="contained"
                        component="label"
                        color="error"
                        className="ms-2"
                        onClick={() => {setShowImage(null);setFile(null);}}
                      >
                        Remove
                      </Button>
                    )}
                  </Col>
                  <Col md={4} className="mt-5">
                    {showImage && (
                      <Wrapper>
                        <img
                          alt="not found"
                          width={"70%"}
                          style={{ border: "1px solid black" }}
                          src={URL.createObjectURL(showImage)}
                        />
                        <br />
                        <Wrapper>
                          <P className="mt-1" color="gray" size="12px">
                            Click on Next to generate Report
                          </P>
                          <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            sx={{ background: "#183e8f" }}
                            onClick={GenerateReport}
                          >
                            Next
                          </Button>
                        </Wrapper>
                      </Wrapper>
                    )}
                  </Col>
                  <Col md={4} className="mt-5">
                    <Wrapper
                      className="p-3"
                      width="70%"
                      height="25vh"
                      bg="black"
                      border="1px solid gray"
                      color="white"
                      borderRadius="15px"
                    >
                      <P className="mb-0" size="12px">
                        {report}
                      </P>
                    </Wrapper>
                  </Col>
                </Row>
              </Wrapper>
            </>
          ) : null}
          {props.mode === "user" ? (
            <Wrapper className="mt-4">Radiologist</Wrapper>
          ) : null}
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
  return (
    <>
      <Card
        className="mt-4"
        style={{
          width: "100%",
          height: "150px",
          overflow: "auto",
          boxShadow: "5px 5px 10px gray",
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "#183e8f", fontWeight: "600" }}>
            {props.title}
          </Card.Title>
          <Card.Text style={{ color: "gray" }}>{props.description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export { StepsCard, ContactCard };
export default CardComp;
