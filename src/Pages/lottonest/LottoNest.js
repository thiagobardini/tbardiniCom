import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets } from "../../redux/ticketSlice";
import { deleteAllTickets } from "../../redux/ticketSlice";
import { selectAuth } from "../../redux/authSlices";
import {
  Box,
  Container,
  CssBaseline,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckNumbers from "./CheckNumbers";
import LogoNest from "../../Assets/images/MegaMillions.png";
import Logout from "../../Features/auth/Logout";
import TicketInput from "./TicketInput";
import CardCaptureData from "./CardCaptureData";
import MatchingTickets from "./MatchingTickets";

const LottoNest = () => {
  const [manualEntry, setManualEntry] = useState(true);
  const navigate = useNavigate();
  const isEmail = useSelector((state) => state.authUser.email);

  const dispatch = useDispatch();

  const { uid } = useSelector(selectAuth);
  const tickets = useSelector((state) => state.tickets.tickets);

  useEffect(() => {
    if (uid) {
      dispatch(fetchTickets(uid));
    }
    if (!isEmail) {
      navigate("/portfolio/lottonest-signin");
    }
  }, [uid, isEmail, navigate, dispatch]);

  const toggleManualEntry = () => {
    setManualEntry(!manualEntry);
  };

  const handleDeleteAllTickets = () => {
    dispatch(deleteAllTickets());
  };

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
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pt: 1,
          position: "absolute",
        }}
      >
        <Logout text="logout" to="/portfolio/lottonest-signin" />
      </Container>
      <Box
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

      <CheckNumbers />
      <Container>
        <CssBaseline />

        <Box my={2}>
          {/* ENTER YOUR TICKETS NUMBERS */}
          <Box mb={2}>
            <Accordion sx={{ background: "#424242" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography color="#d6d3d1">
                  ENTER YOUR TICKETS NUMBERS
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ mb: 4 }}
                    onClick={toggleManualEntry}
                  >
                    {manualEntry
                      ? "Switch to Camera Capture"
                      : "Switch to Manual Entry"}
                  </Button>
                </Box>
                {manualEntry ? <TicketInput /> : <CardCaptureData />}
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box mb={2}>
            {/* VIEW ALL TICKETS */}
            <Accordion color="#d6d3d1" sx={{ background: "#424242" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography color="#d6d3d1">VIEW ALL TICKETS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ mb: 4 }}
                  onClick={handleDeleteAllTickets}
                >
                  Delete All Tickets
                </Button>
                {tickets.map((ticket, index) => (
                  <Box key={index}>
                    <Typography color="#d6d3d1" variant="h6">
                      Ticket {ticket.id}
                    </Typography>
                    <Typography color="#d6d3d1" variant="body1">
                      Numbers:{" "}
                      {ticket?.numbers?.length > 0
                        ? ticket.numbers.join(", ")
                        : "N/A"}
                    </Typography>
                    <Typography color="#d6d3d1" variant="body1">
                      Mega Ball: {ticket.megaBall}
                    </Typography>
                    {/* <Typography variant="body1">
                Timestamp: {ticket.timestamp.toString()}
              </Typography> */}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
          <MatchingTickets />
        </Box>
      </Container>
    </Box>
  );
};

export default LottoNest;
