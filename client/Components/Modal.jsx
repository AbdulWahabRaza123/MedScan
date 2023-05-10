import React,{useState} from 'react';
import { ImageComp } from './Layout';
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
const NavLogoStyle = {
  width: "70px",
  height: "70px",
};
const ModalComp = (props) => {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: props.width,
      bgcolor: "background.paper",
      boxShadow: 24,
      maxHeight: props.maxHeight,
      height:props.height,
      // overflow: "scroll",
      p: 2,
    };
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              position:"relative"
              
            }}
          >
            {/* <div >
              <h3>{props.heading}</h3>
            </div> */}
            <ImageComp
                src="/assets/logo.png"
                style={NavLogoStyle}
                fluid={true}
              />
          
            <CloseIcon
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={props.handleClose}
            />
          
          </div>
      
          {props.children}
   
        </Box>
      </Modal>
       
    </>
  );
}

export default ModalComp;