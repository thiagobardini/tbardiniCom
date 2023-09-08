import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Grid,
  CssBaseline,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import myself from "../Assets/images/aboutme.jpg";
import { TypeAnimation } from "react-type-animation";
import HeadingTop from "../Components/Typography/HeadingTop";
import LanguageIcon from "@mui/icons-material/Language";
import { keyframes } from "@emotion/react";
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

const AboutMe = () => {
  const [key, setKey] = useState(0);

  const darkMode = useSelector((state) => state.theme.darkMode);

  // ScrollTrigger keep the animation from running after change the theme
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [darkMode]);

  const onEnterViewport = (animationClass) => {
    const element = document.getElementById(animationClass);
    if (element) {
      element.classList.add(animationClass);
    }
  };

  const textTitle = (
    <TypeAnimation
      sequence={["About me"]}
      wrapper="span"
      speed={50}
      repeat={1}
      cursor={false}
    />
  );
  return (
    <Box
      key={key}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "calc(100vh - 85px)",
        alignItems: "center",
        pt: "96px",
      }}
    >
      <HeadingTop text={textTitle} />
      <Container sx={{ px: "0px" }}>
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            py: 5,
            px: 2,
            borderRadius: 3,
            backdropFilter: darkMode ? "blur(5px)" : "blur(1px)",
            backgroundColor: darkMode
              ? "transparent !important"
              : "rgba(238, 238, 238, 0.7) !important",
          }}
        >
          <Grid
            container
            spacing={3}
            direction={{ xs: "column", sm: "row" }}
            sx={{ animation: `${fadeIn} 2s` }}
          >
            <Grid
              item
              xs={12}
              sm={2}
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ width: "100%", display: "flex" }}
            >
              <Avatar
                alt="Thiago Bardini"
                src={myself}
                sx={{
                  width: { xs: 150, sm: 200, md: 200 },
                  height: { xs: 150, sm: 200, md: 200 },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <ScrollTrigger onEnter={() => onEnterViewport("fade-in")}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    // fontWeight: 800,
                    // fontFamily: "Trattatello, sans-serif",
                    fontFamily: "GothamSSm-Bold",
                    textTransform: "uppercase",
                    // letterSpacing: "0.1em",
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  Thiago Bardini
                </Typography>

                <List
                  id="fade-in"
                  variant="body1"
                  sx={{
                    opacity: 0,
                    transition: "opacity 1s ease-in-out",
                    "&.fade-in": {
                      opacity: 1,
                    },
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <Typography
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        <LocationOnIcon />
                      </Typography>
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      <Typography
                        variant="span"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontFamily: "GothamSSm-Light",
                        }}
                      >
                        Location:
                      </Typography>{" "}
                      Greater Boston, MA
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <Typography
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        <FlagIcon />
                      </Typography>
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      <Typography
                        variant="span"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontFamily: "GothamSSm-Light",
                        }}
                      >
                        Nationalities:
                      </Typography>{" "}
                      American, Brazilian
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <Typography
                        sx={{ color: (theme) => theme.palette.text.secondary }}
                      >
                        <LanguageIcon />
                      </Typography>
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      <Typography
                        variant="span"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          fontFamily: "GothamSSm-Light",
                        }}
                      >
                        Languages:
                      </Typography>{" "}
                      English, Portuguese
                    </Typography>
                  </ListItem>
                </List>
              </ScrollTrigger>
            </Grid>
          </Grid>
          <Divider
            sx={{ width: { xs: "100%", md: "70%" }, my: 3, mx: "auto" }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            <ScrollTrigger onEnter={() => onEnterViewport("fade-slide-down-1")}>
              <Typography
                id="fade-slide-down-1"
                variant="h5"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  opacity: 0,
                  transform: "translateY(-20px)",
                  transition:
                    "opacity 1s ease-in-out, transform 1s ease-in-out",
                  "&.fade-slide-down-1": {
                    opacity: 1,
                    transform: "translateY(0)",
                    fontFamily: "GothamSSm-Light",
                  },
                }}
              >
                About me
              </Typography>
            </ScrollTrigger>
          </Box>
          <ScrollTrigger onEnter={() => onEnterViewport("fade-slide-up-1")}>
            <Typography
              id="fade-slide-up-1"
              variant="body1"
              sx={{
                mb: 2,
                color: (theme) => theme.palette.text.secondary,
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                "&.fade-slide-up-1": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              }}
            >
              I am a detail-oriented software engineer specialized in
              JavaScript, React, Redux, and modern CSS libraries. Currently
              employed at TransPerfect, I work on QA automation tests and
              frontend development, and also collaborate as a Frontend Developer
              at Code for Boston. My professional journey revolves around
              creating responsive websites and managing QA automation processes.
              In my free time, I enjoy hobbies such as playing bass guitar—a
              practice that fuels my creative problem-solving skills, hiking,
              traveling, and surfing.
            </Typography>
          </ScrollTrigger>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <ScrollTrigger onEnter={() => onEnterViewport("fade-slide-down-2")}>
              <Typography
                variant="h5"
                id="fade-slide-down-2"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  opacity: 0,
                  transform: "translateY(-20px)",
                  transition:
                    "opacity 1s ease-in-out, transform 1s ease-in-out",
                  "&.fade-slide-down-2": {
                    opacity: 1,
                    transform: "translateY(0)",
                    fontFamily: "GothamSSm-Light",
                  },
                }}
              >
                Objective
              </Typography>
            </ScrollTrigger>
          </Box>
          <ScrollTrigger onEnter={() => onEnterViewport("fade-slide-up-2")}>
            <Typography
              id="fade-slide-up-2"
              variant="body1"
              sx={{
                mb: 2,
                color: (theme) => theme.palette.text.secondary,
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                "&.fade-slide-up-2": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              }}
            >
              Looking to connect and collaborate with a company where I can grow
              personally and professionally in areas such as Sofware
              Development. I want to be a part of a community that values
              integrity, intelligence, and creativity.
            </Typography>
          </ScrollTrigger>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <ScrollTrigger onEnter={() => onEnterViewport("fade-slide-down-3")}>
              <Typography
                id="fade-slide-down-3"
                variant="h5"
                sx={{
                  // fontWeight: 700,
                  color: (theme) => theme.palette.text.primary,
                  opacity: 0,
                  transform: "translateY(-20px)",
                  transition:
                    "opacity 1s ease-in-out, transform 1s ease-in-out",
                  "&.fade-slide-down-3": {
                    opacity: 1,
                    transform: "translateY(0)",
                    fontFamily: "GothamSSm-Light",
                  },
                }}
              >
                What do I do?
              </Typography>
            </ScrollTrigger>
          </Box>
          <ScrollTrigger onEnter={() => onEnterViewport("fade-slide-up-3")}>
            <Typography
              id="fade-slide-up-3"
              variant="body1"
              sx={{
                mb: 3,
                color: (theme) => theme.palette.text.secondary,
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                "&.fade-slide-up-3": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              }}
            >
              I have substantial experience in customizing or creating modern
              responsive websites with creative design involving latest
              frameworks. I enjoy working as a Front End/Full Stack Developer.
              Recently, I have been interested in Mobile Applications using
              React Native.
            </Typography>
          </ScrollTrigger>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<DownloadIcon />}
            size="large"
            sx={{
              textTransform: "capitalize",
              mt: 2,
              textDecoration: "none",
              // fontFamily: "TuskerGrotesk",
              fontFamily: "GothamSSm-Light",
              // letterSpacing: "0.2em",
            }}
            component="a"
            href="https://drive.google.com/uc?export=download&id=1Ar7FXtFt2h2sMjF1Chr9xdxyLNZqobbY"
            target="_blank"
          >
            Download my resume
          </Button>
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
            to="/projects"
            label="Let's continue to projects"
            onClick={() => window.scrollTo(0, 0)}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default AboutMe;
