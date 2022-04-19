import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../components/form-controls/inputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import NumberField from "../../../components/form-controls/NumberField";
import DatePickerField from "../../../components/form-controls/DatePickerField";
import { date } from "yup/lib/locale";

AddEditForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  isAddMode: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },

  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },

  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function AddEditForm(props) {
  const classes = useStyles();

  // validate form by yup
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Please enter your title")
      .max(10000, "Please enter less than 10000 characters."),
    description: yup
      .string()
      .required("Please enter your description")
      .max(10000, "Please enter less than 10000 characters."),
    estimateHours: yup
      .number()
      .min(1)
      .required("Please enter your estimate hour more than 1."),
    startDate: yup.date().default(() => new Date()),
    dueDate: yup
      .date()
      .default(() => new Date())
      .min(yup.ref("startDate"), "End date has to be more than start date"),
  });
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      estimateHours: 0,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log(values);

    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }

    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="title" label="Title" form={form} />
        <InputField name="description" label="description" form={form} />
        <NumberField name="estimateHours" label="estimateHours" form={form} />
        <DatePickerField name="startDate" label="startDate" form={form} />
        <DatePickerField name="dueDate" label="dueDate" form={form} />
        <Button
          disabled={isSubmitting}
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          size="large"
        >
          Create a new task
        </Button>
      </form>
    </div>
  );
}

export default AddEditForm;
