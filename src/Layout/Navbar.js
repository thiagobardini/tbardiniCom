import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { auth, onAuthStateChanged } from "../Firebase/firebaseConfig";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ToggleThemeMode from "../Components/ToggleThemeMode";
import HamburgerMenu from "./HamburgerMenu";
import { keyframes } from "@emotion/react";
import LogoAnimation from "../Components/LogoAnimation";

const pages = [
  {
    text: "about me",
    to: "/aboutme",
  },
  {
    text: "portfolio",
    to: "/portfolio",
  },
  {
    text: "contact",
    to: "/contact",
  },
];

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [oldScrollPos, setOldScrollPos] = useState(0);
  const [showHamburger, setShowHamburger] = useState(false);

  // const theme = useTheme();
  const darkMode = useSelector((state) => state.theme.darkMode);

  // const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (currentScrollPos > oldScrollPos && currentScrollPos > 50) {
        setTimeout(() => setIsNavVisible(false), 10); // Esconde elementos selecionados
      } else if (currentScrollPos < 200) {
        setTimeout(() => setIsNavVisible(true), 10); // Mostra todo o menu
      }
      setOldScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [oldScrollPos]);

  const toggleHamburger = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const onScroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 200) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

  return (
    <AppBar
      position="fixed"
      sx={{
        py: "2px",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: !isNavVisible ? "transparent" : "#22313f",
        boxShadow: !isNavVisible && "none",
        backgroundImage: !isNavVisible && "none",
        transition:
          "background-color 200ms linear, boxShadow 200ms linear, backgroundImage 200ms linear",
        animation: `${fadeIn} 2s`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isNavVisible === true && (
            <Box
              component={Link}
              to="/"
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                mr: 2,
              }}
            >
              <LogoAnimation height={"120px"} />
            </Box>
          )}
          {/* Mobile view */}
          {isNavVisible === true && (
            <Box
              onClick={toggleHamburger}
              sx={{ display: { xs: "flex", md: "none" }, zIndex: 9999 }}
            >
              <HamburgerMenu isOpen={isOpen} setOpen={setOpen} pages={pages} />
            </Box>
          )}
          {/* Only show logo if isNavVisible is true */}
          {isNavVisible === true && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                flexGrow: 1,
              }}
            >
              <Box
                component={Link}
                to="/"
                sx={{
                  display: { xs: "flex", md: "none" },
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  mr: 2,
                }}
              >
                <LogoAnimation height={"120px"} />
              </Box>
            </Stack>
          )}

          {/* Desktop view */}
          {showHamburger && (
            <Box
              sx={{
                display: "flex",
                mt: 1,
                position: "absolute",
                left: "-12px",
                top: "0px",
                borderRadius: "50%",
                backgroundColor: darkMode ? "#0092ca" : "#1270AF",
                height: "70px",
                width: "70px",
                justifyContent: "center",
                alignItems: "center",
                opacity: isNavVisible ? 0 : 1,
                visibility: isNavVisible ? "hidden" : "visible",
                transition: "opacity 2000ms linear, visibility 2000ms linear",
                animation: `${fadeIn} 2s`,
              }}
            >
              <HamburgerMenu isOpen={isOpen} setOpen={setOpen} pages={pages} />
            </Box>
          )}

          {/* Only show pages and icons if isNavVisible is true */}
          {isNavVisible === true && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page) => (
                  <Button
                    component={NavLink}
                    to={page.to}
                    key={page.text}
                    sx={{
                      color: "#eeeeee",
                      textTransform: "none",
                      fontWeight: "500",
                      textDecoration: "none",
                      position: "relative",
                      mr: 2,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: "60%",
                        height: "5px",
                        bottom: "4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#1270AF",
                        visibility: "hidden",
                        transition: "all 0.2s ease-in-out",
                      },
                      "&:hover::after": {
                        visibility: "visible",
                        width: "90%",
                      },
                      "&.active::after": {
                        visibility: "visible",
                        width: "90%",
                      },
                    }}
                    isActive={(match) => {
                      if (!match) {
                        return false;
                      }
                      return true;
                    }}
                  >
                    <Typography variant="h5">{page.text}</Typography>
                  </Button>
                ))}
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "inline-block" },
                }}
              >
                <Box
                  component={Link}
                  color="#eeeeee"
                  to={"https://www.linkedin.com/in/thiagobardini/"}
                  target="_blank"
                  m={1}
                >
                  <LinkedInIcon />
                </Box>
                <Box
                  component={Link}
                  color="#eeeeee"
                  to={"https://github.com/thiagobardini"}
                  target="_blank"
                  m={1}
                >
                  <GitHubIcon />
                </Box>
              </Box>
            </Stack>
          )}

          <Box>{isNavVisible === true && <ToggleThemeMode />}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
