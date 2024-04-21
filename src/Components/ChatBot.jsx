import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FormControl, styled, Typography, Button, Box, Popper, Fade, ClickAwayListener, Stack, TextField, Drawer, IconButton, Divider } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import LoadingDots from "./LoadingDots";
import chatbot from "/chatbotai.svg?url";
import user from "/userchat.svg?url";
import email from "/email.svg?url";
import emailDark from "/email-dark.svg?url";
import emailDisabledDark from "/email-disabled-dark.svg?url";
import CloseIcon from "@mui/icons-material/Close";

const StickyButton = styled(Button)({
  position: "fixed",
  right: 0,
  bottom: 0,
  textTransform: "none",
  paddingRight: "8px",
  paddingBottom: "4px",
});

const ChatBox = styled(Box)({
  "::-webkit-scrollbar": {
    width: "10px",
  },
  "::-webkit-scrollbar-track": {
    // backgroundColor: 'background.paper',
  },
  "::-webkit-scrollbar-thumb": {
    // backgroundColor: 'background.paper',
    borderRadius: "10px",
    border: "2px solid #ffffff",
  },
});

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [msg, setMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const chatBoxRef = useRef(null);
  const popperRef = useRef(null);
  const buttonRef = useRef(null);

  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"; // API URL

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(
          <Typography component='span' variant='body2' sx={{ mb: 1, fontWeight: "bold", display: "inline" }}>
            <img src={chatbot} alt='Chat Icon' style={{ width: 28, height: 28, marginRight: "7px", position: "relative", top: "5px" }} />
            <span>Oops, something went wrong. How can I assist you further?</span>
          </Typography>
        );
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (open && popperRef.current) {
      popperRef.current.setAttribute("tabIndex", "-1");
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setChatHistory([]);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleAIClick = () => {
    setOpen((prevOpen) => !prevOpen);
    if (!open) {
      setAnchorEl(buttonRef.current);
    }
  };
  const handleTextFieldFocus = () => {
    if (popperRef.current) {
      popperRef.current.focus();
    }
  };

  const getResponse = async () => {
    // console.log("chatHistory", chatHistory);

    if (!msg) {
      setError(
        <Typography component='span' variant='body2' sx={{ mb: 1, fontWeight: "bold", display: "inline" }}>
          <img src={chatbot} alt='Chat Icon' style={{ width: 28, height: 28, marginRight: "7px", position: "relative", top: "5px" }} />
          <span>Please enter a message before sending.</span>
        </Typography>
      );
      return;
    }

    setChatHistory((oldChatHistory) => [...oldChatHistory, { role: "user", parts: msg }]);

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/chat-with-gemini`, {
        method: "POST",
        body: JSON.stringify({
          message: msg,
          history: [],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();

      if (!data || data.trim() === "") {
        setChatHistory((oldChatHistory) => [
          ...oldChatHistory,
          {
            role: "AI",
            parts: (
              <Typography component='span' variant='body2' sx={{ mb: 1, fontWeight: "bold", display: "inline" }}>
                <span>It seems there was an error in processing your request. Could you please rephrase your question to focus on aspects of Thiago Bardini's professional career?</span>
              </Typography>
            ),
          },
        ]);
      } else {
        setChatHistory((oldChatHistory) => [...oldChatHistory, { role: "AI", parts: data }]);
      }

      setMsg("");
    } catch (error) {
      setError(
        <Typography component='span' variant='body2' sx={{ mb: 1, fontWeight: "bold", display: "inline" }}>
          <img src={chatbot} alt='Chat Icon' style={{ width: 28, height: 28, marginRight: "7px", position: "relative", top: "5px" }} />
          <span>Sorry, there was a problem processing your request.</span>
        </Typography>
      );
      setChatHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const renderChatContent = () => (
    <Box>
      <Box sx={{  px: 2, pt:2}}>
        <Typography gutterBottom variant='h6' component='div'>
          How can I help you?
        </Typography>
      <Divider />
      </Box>
      <ChatBox ref={chatBoxRef} sx={{ maxHeight: "50vh", m: 1, overflow: "auto", px: 2, pb:2 }}>
        <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 600 }} gutterBottom>
          {error ? (
            error
          ) : (
            <Typography component='span' variant='body2' sx={{ mb: 1, fontWeight: "bold", display: "inline" }}>
              <img src={chatbot} alt='Chat Icon' style={{ width: 28, height: 28, marginRight: "7px", position: "relative", top: "5px" }} />
              <span>I am an AI designed to help you with questions about Thiago Bardini's professional endeavors.</span>
            </Typography>
          )}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {chatHistory.map((chatItem, _index) => (
            <Box key={_index} sx={{ mb: 2 }}>
              {chatItem.role === "AI" ? (
                <Typography component='span' variant='body2' sx={{ mb: 1, fontWeight: "bold", display: "inline" }}>
                  <img src={chatbot} alt='Robot Icon' style={{ width: 28, height: 28, marginRight: "7px", position: "relative", top: "5px" }} />
                  <Typography component='span' variant='body2' sx={{ display: "inline" }}>
                    {chatItem.parts}
                  </Typography>
                </Typography>
              ) : (
                <Typography component='span' variant='body2' sx={{ mb: 1, fontWeight: "bold", display: "inline" }}>
                  <img src={user} alt='user icon' style={{ width: 20, height: 20, marginRight: "11px", position: "relative", top: "2px", left: "3px" }} />
                  <Typography component='span' variant='body2' sx={{ display: "inline" }}>
                    {chatItem.parts}
                  </Typography>
                </Typography>
              )}
            </Box>
          ))}
          {isLoading && <LoadingDots />}
        </Box>
      </ChatBox>

      <Box sx={{ pl: 2, pb: 2, pr: 1 }}>
        <Stack direction='row' spacing={1} alignItems='center' sx={{ width: "100%" }}>
          <FormControl variant='filled' sx={{ flex: 1, mr: 1 }}>
            <TextField
              color='chat'
              label='Ask a question...'
              fullWidth
              value={msg}
              size='small'
              onFocus={handleTextFieldFocus}
              onChange={(e) => setMsg(e.target.value)}
              InputLabelProps={{
                shrink: true,
                sx: {
                  color: darkMode ? "#eeeeee" : "#34495e",
                  "& label.Mui-focused": {
                    color: "#d6d3d1",
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "0.875rem",
                  mt: 0.5,
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && msg.trim()) {
                  e.preventDefault();
                  getResponse();
                }
              }}
            />
          </FormControl>
          <IconButton disabled={!msg.trim()} sx={{ color: darkMode ? "#eeeeee" : "#34495e" }} aria-label='send' onClick={getResponse}>
            {!msg.trim() ? (
              <img src={emailDisabledDark} alt='user icon' style={{ width: 20, height: 20 }} />
            ) : !darkMode ? (
              <img src={emailDark} alt='user icon' style={{ width: 20, height: 20 }} />
            ) : (
              <img src={email} alt='user icon' style={{ width: 20, height: 20 }} />
            )}
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box>
      <StickyButton ref={buttonRef} aria-describedby={id} onClick={handleAIClick} sx={{ zIndex: 2 }}>
        <img src={chatbot} alt='Chat Icon' style={{ width: 60, height: 60 }} />
      </StickyButton>
      {isMedium ? (
        <Popper id={id} ref={popperRef} open={open} anchorEl={anchorEl} transition placement='top-end' disablePortal={false} display={{ xs: "none", sm: "block" }} sx={{ zIndex: 1300 }}>
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={handleClose}>
              <Fade in={open} {...TransitionProps} timeout={350}>
                <Box sx={{ maxWidth: { xs: "90vw", md: "40vw" }, mx: 2, border: 2, borderRadius: "10px", bgcolor: "background.box" }}>{renderChatContent()}</Box>
              </Fade>
            </ClickAwayListener>
          )}
        </Popper>
      ) : (
        <Drawer anchor='bottom' open={open} onClose={handleCloseDrawer} sx={{ zIndex: 1300 }}>
          {/* <IconButton
            onClick={handleCloseDrawer}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton> */}

          <Box sx={{ borderTop: 3, borderLeft: 2, borderRight: 2, bgcolor: "background.chat" }}>{renderChatContent()}</Box>
        </Drawer>
      )}
    </Box>
  );
};

export default ChatBot;
