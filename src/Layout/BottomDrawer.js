import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CardsDrawer from "../Components/CardsDrawer";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "var(--bgColor-4)" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 10,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const BottomDrawer = ({ color }) => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, "projects")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProjects(newData);
      console.log(projects, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(72% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box>
        {/* FIXME: Redux */}
        <Button
          component={Link}
          to="/projects"
          sx={{
            color: "white",
            margin: 0,
            padding: 0,
            fontSize: "14px",
            my: 2,
            display: "block",
          }}
          onClick={toggleDrawer(true)}
        >
          <Typography> Projects</Typography>
        </Button>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Box sx={{ textTransform: "visible", textAlign: "center" }}>
            <Button
              onClick={toggleDrawer(!open)}
              sx={{ pointerEvents: "visible", visibility: "none" }}
            >
              <Puller />
            </Button>
          </Box>
          <Typography sx={{ pb: 2, pl: 2, color: "text.secondary" }}>
            {projects?.length} projects
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            pt: 2,
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#8a8a8a",
          }}
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <CardsDrawer id={project.id} projectCard={project} />
            ))
          ) : (
            <span>No Post</span>
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default BottomDrawer;
