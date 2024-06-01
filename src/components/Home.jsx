/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";

import { useQuery } from "@tanstack/react-query";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { customers, initialSaleOrders, products } from "../assets/data";

import Popup from "./Popup";
import Switch from "@mui/material/Switch";
import Addorder from "./Addorder";

export default function Home({ mode, setmode }) {
  const [open, setOpen] = useState(false);
  const [popup, setpopup] = useState(false);
  const [popupdata, setpopupdata] = useState();
  const [active, setactive] = useState(true);

  const [data, setdata] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const api = () => {
    return data.push({ customers, products, initialSaleOrders });
  };

  useQuery({
    queryKey: ["api"],
    queryFn: api,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    let getitem = window.localStorage.getItem("token");

    if (!getitem) {
      window.location.href = "/";
    }
  }, []);
  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#686D76" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AgSpert
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
              {mode ? "Light Mode" : "Dark Mode"}
            </Typography>
            <Switch
              {...label}
              defaultChecked
              color="default"
              onChange={() => setmode(!mode)}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="100%" sx={{ py: "30px", px: "20px" }}>
        <Container
          maxWidth="full"
          sx={{
            position: "flex",

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Button
              color="secondary"
              sx={{ marginRight: "20px" }}
              variant="outlined"
              onClick={() => {
                setactive(true);
              }}
            >
              Active Sale Order
            </Button>
            <Button
              color="success"
              variant="outlined"
              sx={{ m: "20px", marginLeft: "0" }}
              onClick={() => {
                setactive(false);
              }}
            >
              Completed Sale Order
            </Button>
          </Box>

          <TriggerButton type="button" onClick={handleOpen}>
            Add Sale Order
          </TriggerButton>
          <Addorder
            {...{
              handleClose,
              setdata,
              data,
              open,
            }}
          />
        </Container>
        <Container maxWidth="80%" sx={{ py: "30px" }}>
          {popup && (
            <Popup
              row={popupdata}
              popup={popup}
              setpopup={setpopup}
              data={data}
              setdata={setdata}
              active={active}
            />
          )}
          {active ? (
            <Typography variant="h6" component="div" sx={{ mb: "10px" }}>
              Active Sale Order
            </Typography>
          ) : (
            <Typography variant="h6" component="div" sx={{ mb: "10px" }}>
              Completed Sale Order
            </Typography>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Prices</TableCell>
                  <TableCell align="center">Last Modified</TableCell>
                  <TableCell align="center">Edited \ View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && active
                  ? data.map((row, index) => {
                      if (row.customers[0].status != "Delivered")
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="center">
                              {row.customers[0].id}
                            </TableCell>
                            <TableCell align="center">
                              <Stack
                                direction="row"
                                useFlexGap
                                sx={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                spacing={1}
                              >
                                <Box
                                  component="img"
                                  sx={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: "50%",
                                  }}
                                  alt="user"
                                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                />
                                {row.customers[0].name}
                              </Stack>
                            </TableCell>
                            <TableCell align="center">
                              {row.initialSaleOrders[0].items[0].price}
                            </TableCell>
                            <TableCell align="center">
                              {row.initialSaleOrders[0].invoice_date}
                            </TableCell>
                            <TableCell align="center">
                              <TriggerButton
                                sx={{
                                  border: 0,
                                }}
                                type="button"
                                onClick={() => {
                                  setpopup(true);
                                  setpopupdata(row);
                                }}
                              >
                                <MoreHorizIcon />
                              </TriggerButton>
                            </TableCell>
                          </TableRow>
                        );
                    })
                  : data.map((row, index) => {
                      if (row.customers[0].status === "Delivered")
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="center">
                              {row.customers[0].id}
                            </TableCell>
                            <TableCell align="center">
                              <Stack
                                direction="row"
                                useFlexGap
                                sx={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                spacing={1}
                              >
                                <Box
                                  component="img"
                                  sx={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: "50%",
                                  }}
                                  alt="user"
                                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                />
                                {row.customers[0].name}
                              </Stack>
                            </TableCell>
                            <TableCell align="center">
                              {row.initialSaleOrders[0].items[0].price}
                            </TableCell>
                            <TableCell align="center">
                              {row.initialSaleOrders[0].invoice_date}
                            </TableCell>
                            <TableCell align="center">
                              <TriggerButton
                                sx={{
                                  border: 0,
                                }}
                                type="button"
                                onClick={() => {
                                  setpopup(true);
                                  setpopupdata(row);
                                }}
                              >
                                <MoreHorizIcon />
                              </TriggerButton>
                            </TableCell>
                          </TableRow>
                        );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Container>
    </>
  );
}

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const TriggerButton = styled("button")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
