import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setuser] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const gotToNewPage = async () => {
    if (user?.name === "ayush") {
      if (user?.password == 1432) {
        await window.localStorage.setItem("token", JSON.stringify("logged"));
        navigate("/home");
      } else {
        alert("password wrong");
      }
    } else {
      alert("user name wrong");
    }
  };
  function changedata(e) {
    setuser({ ...user, [e.target.name]: e.target.value });
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "90vh" }}
    >
      <Typography variant="h1" m={5}>
        Login
      </Typography>
      <Container
        maxWidth="sm"
        sx={{
          boxShadow: 2,

          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <TextField
          sx={{ width: "80%" }}
          id="standard-basic"
          label="UserName"
          name="name"
          variant="standard"
          onChange={(e) => changedata(e)}
        />
        <br />

        <TextField
          id="standard-basic"
          label="Password"
          name="password"
          variant="standard"
          sx={{ m: 2, width: "80%", marginTop: "5px", marginBottom: "50px" }}
          onChange={(e) => changedata(e)}
        />

        <Button variant="outlined" fullWidth onClick={() => gotToNewPage()}>
          Submit
        </Button>
      </Container>
    </Grid>
  );
}
