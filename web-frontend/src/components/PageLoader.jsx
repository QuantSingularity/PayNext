import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const PageLoader = ({ loading = false, children }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          flexDirection: "column",
        }}
        open={showLoader}
      >
        <Fade in={showLoader} timeout={400}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress color="primary" size={60} thickness={4} />
            <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
              Loading...
            </Typography>
          </Box>
        </Fade>
      </Backdrop>
      <Box>{children}</Box>
    </>
  );
};

export default PageLoader;
