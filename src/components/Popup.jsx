/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import { useForm } from "react-hook-form";

export default function Popup({ row, popup, setpopup, data, setdata, active }) {
  const { register, setValue, getValues } = useForm();

  const handleClose = () => setpopup(false);
  const match = () => {
    setValue("functional_data", {
      from_value: {
        date: moment().format("llll"),
      },
    });
    var value = getValues();

    let filteredDataSource = data.filter((item) => {
      if (item.customers[0]?.id === row?.customers[0]?.id) {
        item.customers[0].name = value.Name;
        item.customers[0].email = value.Email;
        item.customers[0].location_name = value.Address;
        item.customers[0].phone_number = value.phone_number;
        item.products[0].name = value.Product;
        item.products[0].category = value.category;
        item.products[0].brand = value.brand;
        item.initialSaleOrders[0].invoice_date =
          value.functional_data.from_value.date;
        item.customers[0].status = value.status;
      }

      return item;
    });
    setdata(filteredDataSource);
  };

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={popup}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      {active ? (
        <ModalContent
          sx={{
            width: 800,
            py: "50px",
            position: "relative",
          }}
        >
          <CloseIcon
            onClick={handleClose}
            fontSize="large"
            sx={{
              position: "absolute",
              top: "5px",
              right: "7px",
              p: "5px",
            }}
          />
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="Name"
              name="Name"
              defaultValue={row?.customers[0]?.name}
              {...register("Name")}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="Email"
              name="Email"
              defaultValue={row?.customers[0]?.email}
              {...register("Email")}
            />
          </Stack>
          <TextField
            id="standard-basic"
            label="Address"
            name="Address"
            {...register("Address")}
            variant="standard"
            sx={{ marginTop: "30px", mx: "10px" }}
            defaultValue={row?.customers[0]?.location_name}
          />
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "tel" }}
              placeholder="phone_number"
              name="phone_number"
              {...register("phone_number")}
              defaultValue={row?.customers[0]?.phone_number}
            />
            <TextField
              id="outlined-basic"
              label="Product"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="Product"
              name="Product"
              {...register("Product")}
              defaultValue={row?.products[0]?.name}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="category"
              name="category"
              {...register("category")}
              defaultValue={row?.products[0]?.category}
            />
            <TextField
              id="outlined-basic"
              label="Brand"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="Brand"
              name="brand"
              {...register("brand")}
              defaultValue={row?.products[0]?.brand}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Unit"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "tel" }}
              placeholder="Unit"
              name="unit"
              {...register("unit")}
              value={row?.products[0]?.sku[0].amount}
            />
            <TextField
              id="outlined-basic"
              label="Cost"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "tel" }}
              placeholder="Cost"
              name="Cost"
              {...register("Cost")}
              value={row.initialSaleOrders[0].items[0].price}
            />
          </Stack>
          <FormControl sx={{ m: 1, minWidth: "90%" }}>
            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
            <Select
              defaultValue={row?.customers[0]?.status}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Status"
              name="status"
              {...register("status")}
            >
              <MenuItem value="Progess">Progess</MenuItem>
              <MenuItem value="Waiting">Waiting </MenuItem>
              <MenuItem value="Out for Delivery"> Out for Delivery</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>

          <Stack
            direction="row"
            spacing={3}
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "end",
              marginTop: "30px",
            }}
            flexWrap="wrap"
          >
            <Button
              onClick={() => {
                setpopup(false);
              }}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
                match();
              }}
              color="success"
              variant={"outlined"}
            >
              Save
            </Button>
          </Stack>
        </ModalContent>
      ) : (
        <ModalContent
          sx={{
            width: 800,
            py: "50px",
            position: "relative",
          }}
        >
          <CloseIcon
            onClick={handleClose}
            fontSize="large"
            sx={{
              position: "absolute",
              top: "5px",
              right: "7px",
              p: "5px",
            }}
          />
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="Name"
              value={row?.customers[0]?.name}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="Email"
              value={row?.customers[0]?.email}
            />
          </Stack>
          <TextField
            id="standard-basic"
            label="Address"
            variant="standard"
            sx={{ marginTop: "30px", mx: "10px" }}
            value={row?.customers[0]?.location_name}
          />
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "tel" }}
              placeholder="phone_number"
              value={row?.customers[0]?.phone_number}
            />
            <TextField
              id="outlined-basic"
              label="Product"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="Product"
              value={row?.products[0]?.name}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="category"
              value={row?.products[0]?.category}
            />
            <TextField
              id="outlined-basic"
              label="Brand"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "text" }}
              placeholder="Brand"
              value={row?.products[0]?.brand}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            flexWrap="wrap"
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "center",
              pt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Unit"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "tel" }}
              placeholder="Unit"
              value={row?.products[0]?.sku[0].amount}
            />
            <TextField
              id="outlined-basic"
              label="Cost"
              variant="outlined"
              sx={{ minWidth: "47%" }}
              inputProps={{ type: "tel" }}
              placeholder="Cost"
              value={row.initialSaleOrders[0].items[0].price}
            />
          </Stack>
          <FormControl sx={{ m: 1, minWidth: "90%" }}>
            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
            <Select
              value={row?.customers[0]?.status}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Status"
            >
              <MenuItem value="Progess">Progess</MenuItem>
              <MenuItem value="Waiting">Waiting </MenuItem>
              <MenuItem value="Out for Delivery"> Out for Delivery</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>

          <Stack
            direction="row"
            spacing={3}
            useFlexGap
            sx={{
              alignItems: "center",
              justifyContent: "end",
              marginTop: "30px",
            }}
            flexWrap="wrap"
          >
            <Button
              onClick={() => {
                setpopup(false);
              }}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
              color="success"
              variant={"outlined"}
            >
              ok
            </Button>
          </Stack>
        </ModalContent>
      )}
    </Modal>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
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

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
