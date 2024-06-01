import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [mode, setmode] = useState(true);
  const darkTheme = createTheme({
    palette: {
      mode: mode ? "light" : "dark",
    },
  });
  return (
    <Routes path="/">
      <Route index element={<Login />} />
      <Route index path="login" element={<Login />} />
      <Route
        path="home"
        element={
          <ThemeProvider theme={darkTheme}>
            <CssBaseline /> <Home mode={mode} setmode={setmode} />
          </ThemeProvider>
        }
      />
    </Routes>
  );
}

export default App;
