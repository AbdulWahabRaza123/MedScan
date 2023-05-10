import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: props?.top?"":"50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{}}>
          <CircularProgress />
        </Box>
      </div>
    </>
  );
};

export default Loading;
