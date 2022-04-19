import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField, FormHelperText, Typography } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  return (
    <FormControl error={!!hasError} fullWidth>
      <Controller
        name={name}
        control={form.control}
        label={label}
        as={TextField}
        margin="normal"
        variant="outlined"
        disabled={disabled}
      />
      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}

export default InputField;
