import React from "react";
import {
  LocalizationProvider,
  DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
// import { de } from "date-fns/locale/de";

const DatePicker = ({ label, value, onChange, name }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
