/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, forwardRef } from "react";
import { Modal as BaseModal } from "@mui/base/Modal";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createobj } from "../utility/object";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Addorder({ handleClose, setdata, data, open }) {
  const { register, setValue, getValues, reset } = useForm();
  const [unit, setunit] = useState(1);
  const [date, setdate] = useState();
  const [incost, setincost] = useState(NaN);
  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent sx={{ width: 800, py: "50px", position: "relative" }}>
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Product
          </InputLabel>
          <Select
            defaultValue="choose"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Select Product"
            name="select"
            {...register("select")}
            onChange={() =>
              setincost(Math.floor(Math.random() * (999 - 100 + 1) + 100))
            }
          >
            <MenuItem disabled value="choose">
              Choose Option
            </MenuItem>
            <MenuItem value="Product 1">Product 1</MenuItem>
            <MenuItem value="Product 2">Product 2</MenuItem>
            <MenuItem value="Product 3">Product 3</MenuItem>
            <MenuItem value="Product 4">Product 4</MenuItem>
            <MenuItem value="Product 5">Product 5</MenuItem>
            <MenuItem value="Product 6">Product 6</MenuItem>
            <MenuItem value="Product 7">Product 7</MenuItem>
            <MenuItem value="Product 8">Product 8</MenuItem>
            <MenuItem value="Product 9">Product 9</MenuItem>
          </Select>
        </FormControl>
        <Stack
          direction="row"
          useFlexGap
          sx={{ alignItems: "center" }}
          flexWrap="wrap"
        >
          <TextField
            sx={{ minWidth: "65%", marginLeft: "8px" }}
            inputProps={{ type: "tel" }}
            placeholder="Type number of units"
            name="kg"
            {...register("kg")}
            onChange={async (event) =>
              event.target.value < 0 ? null : await setunit(event.target.value)
            }
          />

          <Typography variant="p" m={5}>
            Cost : {incost * (unit ? unit : 1)}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          flexWrap="wrap"
          useFlexGap
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(event) => {
                  setdate(
                    event["$d"].toString().split(" ").slice(0, 4).join(" ") +
                      " (" +
                      new Date().toLocaleTimeString() +
                      ") "
                  );
                }}
                label="Date"
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            sx={{ minWidth: "60%", marginTop: "10px" }}
            inputProps={{ type: "tel" }}
            placeholder="Phone Number"
            name="phone_no"
            {...register("phone_no")}
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
            sx={{ minWidth: "47%" }}
            inputProps={{ type: "text" }}
            placeholder="Name"
            name="Name"
            {...register("Name")}
          />
          <TextField
            sx={{ minWidth: "47%" }}
            inputProps={{ type: "text" }}
            placeholder="Email"
            name="Email"
            {...register("Email")}
          />
        </Stack>
        <TextField
          id="standard-basic"
          label="Address"
          name="Address"
          {...register("Address")}
          variant="standard"
          sx={{ marginTop: "30px" }}
        />

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
          <Button onClick={handleClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              setValue("functional_data", {
                from_value: {
                  cost: incost * (unit ? unit : 1),
                  date: date,
                },
              });
              var value = await createobj(getValues());

              const nextList = [...data, value];

              setdata(nextList);
              handleClose();
              setunit(1);
              setincost(NaN);
              reset();
            }}
            color="success"
            variant={"outlined"}
          >
            Order
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  );
}

const Backdrop = forwardRef((props, ref) => {
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
