import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/form-controls/inputField";
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
import { LockOutlined } from "@material-ui/icons";
import PasswordField from "../../../../components/form-controls/PasswordField";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
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

function LoginForm(props) {
  const classes = useStyles();

  // validate form by yup
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    password: yup.string().required("Please enter your password"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
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
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="" h5>
        Sign In
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button
          disabled={isSubmitting}
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          size="large"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
