import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "50vh",
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
