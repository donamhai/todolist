import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { OutlinedInput } from "@mui/material";
import { Box, FormHelperText, makeStyles, Typography } from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";

NumberField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},

  box: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    maxWidth: "200px",
  },
}));

function NumberField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;
  const hasError = errors[name];

  return (
    <FormControl
      error={!!hasError}
      fullWidth
      margin="normal"
      variant="outlined"
    >
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <Box className={classes.box}>
            <OutlinedInput
              id={name}
              type="number"
              disabled={disabled}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          </Box>
        )}
      />

      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}

export default NumberField;
