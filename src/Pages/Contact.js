import React from "react";
import { useSelector } from "react-redux";
import { keyframes } from "@emotion/react";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
  Link,
  Avatar,
  styled,
  Badge,
  Stack,
  Paper,
} from "@mui/material";
import HeadingTop from "../Components/Typography/HeadingTop";
import { TypeAnimation } from "react-type-animation";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import myself from "../Assets/images/myselfbg.jpg";
import ButtonFab from "../Components/ButtonFab";
import ScrollTrigger from "react-scroll-trigger";

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
const Contact = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const onEnterViewport = (animationClass) => {
    const element = document.getElementById(animationClass);
    if (element) {
      element.classList.add(animationClass);
    }
  };

  const textTitle = (
    <TypeAnimation
      sequence={["contact", 1000, "let’s work together!", 1000]}
      wrapper="span"
      speed={50}
      repeat={0}
      cursor={false}
      style={{ textDecoration: "none" }}
    />
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      width: "15px",
      height: "15px",
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "calc(100vh - 85px)",
        pt: "96px",
      }}
    >
      <Box>
        <HeadingTop text={textTitle} />{" "}
      </Box>

      <Container>
        <Paper
          elevation={3}
          sx={{
            py: 5,
            px: 3,
            borderRadius: 3,
            backdropFilter: darkMode ? "blur(2px)" : "blur(2px)",
            backgroundColor: darkMode
              ? "transparent !important"
              : "#eeeeee !important",
          }}
        >
          <CssBaseline />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{ animation: `${fadeIn} 2s` }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Thiago Bardini"
                src={myself}
                sx={{ width: 150, height: 150 }}
              />
            </StyledBadge>
          </Stack>
          <Box sx={{ py: 3, textAlign: "center" }}>
            <ScrollTrigger onEnter={() => onEnterViewport("fade-slide-up-c1")}>
              <Typography
                variant="h6"
                gutterBottom
                id="fade-slide-up-c1"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition:
                    "opacity 1s ease-in-out, transform 1s ease-in-out",
                  "&.fade-slide-up-c1": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                }}
              >
                Looking forward to connecting and collaborating with you. Feel
                free to reach out!
              </Typography>
            </ScrollTrigger>
            <Divider
              sx={{ width: { xs: "100%", md: "70%" }, my: 6, mx: "auto" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                gap: 3,
              }}
            >
              <ScrollTrigger
                onEnter={() => onEnterViewport("fade-slide-up-c2")}
              >
                <Link
                  href="tel:978-648-7075"
                  color="inherit"
                  underline="none"
                  target="_blank"
                  id="fade-slide-up-c2"
                  sx={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition:
                      "opacity 1s ease-in-out, transform 1s ease-in-out",
                    "&.fade-slide-up-c2": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <PhoneIcon />
                    <Typography
                      variant="h6"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        animation: `${fadeIn} 2s`,
                      }}
                    >
                      978-648-7075
                    </Typography>
                  </Box>
                </Link>
              </ScrollTrigger>
              <ScrollTrigger
                onEnter={() => onEnterViewport("fade-slide-up-c3")}
              >
                <Link
                  href="mailto:thiagobardini@icloud.com?subject=👨🏻‍💻 Hi Thiago, I'd like to hire you"
                  color="inherit"
                  underline="none"
                  target="_blank"
                  id="fade-slide-up-c3"
                  sx={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition:
                      "opacity 1s ease-in-out, transform 1s ease-in-out",
                    "&.fade-slide-up-c3": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon />
                    <Typography
                      variant="h6"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        animation: `${fadeIn} 2s`,
                      }}
                    >
                      thiagobardini@icloud.com
                    </Typography>
                  </Box>
                </Link>
              </ScrollTrigger>
              <ScrollTrigger
                onEnter={() => onEnterViewport("fade-slide-up-c4")}
              >
                <Link
                  href="https://www.linkedin.com/in/thiagobardini/"
                  color="inherit"
                  underline="none"
                  target="_blank"
                  id="fade-slide-up-c4"
                  sx={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition:
                      "opacity 1s ease-in-out, transform 1s ease-in-out",
                    "&.fade-slide-up-c4": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinkedInIcon sx={{ fontSize: "2rem" }} />
                    <Typography
                      variant="h6"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        animation: `${fadeIn} 2s`,
                      }}
                    >
                      thiagobardini
                    </Typography>
                  </Box>
                </Link>
              </ScrollTrigger>
            </Box>
          </Box>
        </Paper>
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "flex-start",
            my: 3,
          }}
        >
          <ButtonFab
            to="/"
            label="Go back home"
            onClick={() => window.scrollTo(0, 0)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
