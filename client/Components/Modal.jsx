import React,{useState} from 'react'
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
const Modal = () => {
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
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2>{props.heading}</h2>
            </div>
            <CloseIcon
              style={{ cursor: "pointer", fontSize: "40px" }}
              onClick={handleClose}
            />
          </div>
          {props.children}
   
        </Box>
      </Modal>
    
        
         
       
          {/* <Button
            size="small"
            onClick={() => {
              if (props.restrict) Router.push("/Login");
              else handleOpen();
            }}
          >
            <b>Go</b>
          </Button> */}
       
    </>
  );
}

export default Modal