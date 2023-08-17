import React, { useEffect } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoNest from "../../Assets/images/MegaMillions.png";
import Signin from "../../Features/auth/Signin";

const LottoNestSignin = () => {
  const isEmail = useSelector((state) => state.authUser.email);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmail) {
      navigate("/portfolio/lottonest-signin");
    }
  }, [isEmail, navigate]);

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

      <Signin />
      <Container>
        <CssBaseline />
        <Box my={2}></Box>
      </Container>
    </Box>
  );
};

export default LottoNestSignin;
