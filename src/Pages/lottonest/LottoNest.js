import React, { useState, useEffect } from "react";
import { Box, Container, CssBaseline, Modal, Typography } from "@mui/material";
import HeadingTop from "../../Components/Typography/HeadingTop";
import tickets from "../../Assets/images/tickets.jpg";
import CheckNumbers from "./CheckNumbers";
import LogoNest from "../../Assets/images/MegaMillions.png";

const LottoNest = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.collectapi.com/chancegame/usaPowerball",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: process.env.REACT_APP_COLLECT_API_TOKEN,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      mb={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 243px)",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "1.5em 0",
        }}
      >
        <Box
          component="img"
          alt="LogoNest"
          src={LogoNest}
          sx={{
            maxHeight: "auto",
            maxWidth: "200px",
            width: "100%",
            height: "auto",
            cursor: "pointer",
          }}
        />
      </Box>

      <Container>
        <CssBaseline />
        <Box my={2}>
          <Typography variant="h4" gutterBottom>
            Mega Millions Number Checker
          </Typography>

          <Typography variant="body1">
            Click on the lottery ticket to view it in full size.
          </Typography>
          <Box
            component="img"
            alt="tickets"
            src={tickets}
            sx={{ width: "100%", pt: 4, pb: 1, cursor: "pointer" }}
            onClick={() => setOpen(true)}
          />
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                alt="tickets"
                src={tickets}
                sx={{
                  maxHeight: "80vh",
                  maxWidth: "80vw",
                  pt: 4,
                  pb: 1,
                  cursor: "pointer",
                  boxShadow: "0 3px 5px 2px rgba(33, 49, 63, .3)",
                }}
                onClick={() => setOpen(false)}
              />
            </Box>
          </Modal>
          <CheckNumbers />
        </Box>
      </Container>
    </Box>
  );
};

export default LottoNest;
