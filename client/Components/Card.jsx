import MaterialCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "react-bootstrap/Card";
import { Col } from "./Layout";
export const ContactCard = (props) => {
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
const CardComp = () => {
  return (
    <>
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
          <Button size="small">
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
export { StepsCard };
export default CardComp;
