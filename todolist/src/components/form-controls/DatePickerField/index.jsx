import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, FormHelperText, Typography } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";

DatePickerField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function DatePickerField(props) {
  const [time, setTime] = useState(new Date());
  const { form, name, label } = props;
  const { errors, setValue } = form;

  // const date = time.getTime();

  setValue(name, time);

  const hasError = errors[name];
  return (
    <FormControl error={!!hasError} fullWidth>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={5}>
              <DesktopDatePicker
                value={time}
                margin="normal"
                onBlur={onBlur}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Stack>
          </LocalizationProvider>
        )}
      />
      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}

export default DatePickerField;
