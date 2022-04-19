import React from "react";
import PropTypes from "prop-types";
import AddEditForm from "./AddForm";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { addTask } from "../todoSlice";

AddAction.propTypes = {
  closeDialog: PropTypes.func,
};
function AddAction(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        values = {
          ...values,
          status: (values.status = false),
        };
        const action = addTask(values);
        dispatch(action);

        const { closeDialog } = props;
        if (closeDialog) {
          closeDialog();
        }

        enqueueSnackbar("Register successfully!!!", { variant: "success" });
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div>
      <AddEditForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddAction;
