import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";

function TextAnimation() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const typeAnimationStyle = useMemo(
    () => ({
      display: "inline-block",
      fontWeight: 600,
      color: darkMode ? "rgb(214, 211, 209)" : "#222831",
      textShadow: darkMode
        ? "none"
        : "0 0 5px #ffffff, 0 0 5px #ffffff, 0 0 5px #ffffff, 0 0 5px #ffffff, 0 0 5px #ffffff, 0 0 5px #ffffff",
    }),
    [darkMode]
  );

  return (
    <Typography
      variant="h6"
      sx={{
        backdropFilter: darkMode ? "blur(2px)" : "blur(3px)",
        fontFamily: "PPNeueMontreal-Medium",
      }}
    >
      <Box
        component="span"
        sx={{
          display: "inline-block",
          fontWeight: 600,
        }}
      >
        {"<"}
        <Box
          component="span"
          sx={{
            display: "inline-block",
            color: "#1270AF",
            textShadow: "none",
          }}
        >
          code
        </Box>
        {">"}
      </Box>
      <Box
        component="span"
        sx={{
          display: "inline-block",
          color: (theme) => theme.palette.text.secondary,
          fontWeight: 600,
          textShadow: darkMode
            ? "none"
            : {
                xs: "0 0 5px #d6d3d1, 0 0 5px #d6d3d1, 0 0 5px #d6d3d1, 0 0 5px #d6d3d1, 0 0 5px #d6d3d1, 0 0 5px #d6d3d1",
                md: "none",
              },

          mr: "0.5rem",
        }}
      >
        I build
      </Box>
      <Box sx={typeAnimationStyle}>
        <TypeAnimation
          sequence={["web applications", 1000, "automation tools", 1000]}
          speed={50}
          repeat={Infinity}
        />
      </Box>
      <Box
        component="span"
        sx={{
          display: "inline-block",
          fontWeight: 600,
        }}
      >
        {"</"}
        <Box
          component="span"
          sx={{
            display: "inline-block",
            fontWeight: 600,
            color: "#1270AF",
          }}
        >
          code
        </Box>
        {">"}
      </Box>
    </Typography>
  );
}

export default TextAnimation;
