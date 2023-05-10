import React, { useState, useEffect, useContext } from "react";
import { NavContext } from "../_app";
import { Container, Row, Col, Wrapper,useMediaQuery } from "../../Components/Layout";
import { MDBInput } from "../../Components/Inputs";
import Footer from "../../Components/Footer";
import NavbarComp from "../../Components/Navbar";
import { Carousel } from "react-responsive-carousel";
import { BtnProfile } from "../../Components/Buttons";
import CardComp,{StepsCard,PatientsInfoCard} from "../../Components/Card";
import { P } from "../../Components/Typography";
import Loading from "../../Components/Loading";
import styles from "styled-components";
import { useRouter } from "next/router";
import { Spacer } from "../../Components/Spacer";
import ModalComp from "../../Components/Modal";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
const CarouselStyle = styles.span` 
`;
const ImageStyle = {
  width: "100%",
  border: "1px solid black",
};
const Index = () => {
  const isResponsive = useMediaQuery({
    query: "(max-width: 453px)",
  });
  const [mount, setMount] = useState(false);
  const [data,setData]=useState(null);
  const [radiologists,setRadiolologists]=useState([]);
  const [reports,setReports]=useState([]);
  const [openPatient,setOpenPatient]=useState(false);
  const [radiologistReports,setRadiologistReports]=useState([]);
  const [accordian,setAccordian]=useState(false);
  const Router=useRouter();
  const { NavState, NavDispatch } = useContext(NavContext);
  const GetRadiologists = async () => {
    try {

        const res = await axios.get(
          "/getRadiologists",
        );
        const data=res.data;
        if (data.message === "done") {
          setRadiolologists(data.data);
        } else {
        }
     
    } catch (e) {
    console.log("This is error ",e);
    }
  };
  const GetReports = async () => {
    try {

        const res = await axios.get(
          "/getReports",
        );
        const data=res.data;
        if (data.message === "done") {
          setReports(data.data);
         
        } else {
        }
     
    } catch (e) {
  
    }
  };
  const deleteRadiologist=(email)=>{
    console.log("This is email ",email);
  }
  useEffect(() => {
    async function VerifyAdmin(){
    const login = localStorage.getItem("login");
    if (!login) {
      setMount(false);
      Router.push("/Login");
    } else {
      const info=await JSON.parse(login);
      setData(info);
      NavDispatch({ type: "Nav", payload: "admin" });
      GetReports();
      setMount(true);
    }
  }
  VerifyAdmin();
  }, []);
  return mount ? (
    <>
    
    <ModalComp className={isResponsive?"p-1":""} heading="Patients" width={isResponsive?"100%":"450px"} height={isResponsive?"100vh":"70%"} open={openPatient} handleClose={()=>{setOpenPatient(false)}}>
    <Spacer className="mt-2"/>
    <Wrapper style={{position:"relative",zIndex:"1"}}>
    <MDBInput placeholder="Search" style={{position:"relative"}}/>
    <SearchIcon style={{position:"absolute",right:"2%",top:"20%",cursor:"pointer"}}/>
    </Wrapper>
    <Wrapper style={{maxHeight:isResponsive?"100vh":"340px",overflow:"scroll",zIndex:"0"}}>
    {
      radiologistReports.length===0?<>
      
     <Wrapper className="d-flex flex-row align-items-center justify-content-center mb-0" height={isResponsive?"70vh":"300px"}>
          <P color="gray">No Data Found</P>
          </Wrapper>
      </>:<>
        {
          radiologistReports.map((val,index)=>{
            return(
              <>             
              <PatientsInfoCard key={index} mode="accordian" name={val.patientName} email={val.patientEmail} report={val.report}/>
              </>
            )
          })
        }
      </>
    }
    </Wrapper>
    </ModalComp>
      <NavbarComp name={data.name}/>
      <ToastContainer
        className="set_notify"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container style={{ marginTop: "20vh" }}>
        <Row className="pb-5">
          <Col sm={6} md={6}>
            <CarouselStyle className="text-center">
              <Carousel
                dynamicHeight={false}
                autoplay={true}
                infiniteLoop={true}
                showStatus={false}
                showArrows={false}
                showThumbs={false}
              >
                <div>
                  <img
                    style={{ borderRadius: "25px" }}
                    src="assets/banner3.jpg"
                  />
                </div>
                <div>
                  <img
                    style={{ borderRadius: "25px" }}
                    src="assets/banner2.jpg"
                  />
                </div>
                <div>
                  <img
                    style={{ borderRadius: "25px" }}
                    src="assets/banner1.jpg"
                  />
                </div>
              </Carousel>
            </CarouselStyle>
          </Col>
          <Col sm={6} md={6} className="mt-4">
            <h1>Hello, Abdul Wahab Raza</h1>
            <p style={{ color: "gray" }}>Nice to Meet you!</p>
            <BtnProfile>Docs</BtnProfile>
          </Col>
        </Row>
        <hr className="mt-1" />
        <Wrapper className="mt-4 mb-5">
          <h2 className="text-center text-bold">Services</h2>
          <Wrapper className="d-flex flex-row mt-5">
            <CardComp  width="100%" height="100%" heading="Admin">
            <Spacer height="10vh" />
             
              {
                reports.length<=0?
                <>
                <Wrapper className="d-flex flex-row align-items-center justify-content-center" height="70vh">
                <P color="gray" >Data Not Found</P>
                </Wrapper></>:
                <><Row className="d-flex flex-column ">
                  <Row>
                    {reports.map((val, index) => {
                      return (
                        <>
                          <Col md={4} key={index}>
                            <Wrapper className="d-flex flex-row">
                              <StepsCard
                                mode="admin_report_gen"
                                title={val.radiologistName}
                                description={val.specialization}
                                email={val.radiologistEmail}
                                reports={val.reports}
                                radiologistReports={radiologistReports}
                                setRadiologistReports={setRadiologistReports}
                                openPatient={openPatient}
                                setOpenPatient={setOpenPatient}
                                deleteRadiologist={()=>{deleteRadiologist(val.radiologistEmail)}}
                              />
                            </Wrapper>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                  </Row>
                  </>
                
              }
              
             
            </CardComp>
          </Wrapper>
        </Wrapper>
      </Container>
      <Footer />
    </>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default Index;
