import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { getAllTask, removeTask, updateTask } from "../todoSlice";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import AddEditAction from "./AddAction";
import { yellow } from "@material-ui/core/colors";

TodoList.propTypes = {};
TodoList.defaultProps = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  CloseButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

function TodoList() {
  const data = useSelector((state) => state.todos);

  // sort data from id max > id min
  const convertData = data
    .map((x) => {
      return Object.assign({}, x);
    })
    .sort(function (a, b) {
      return b.id - a.id;
    });

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const columns = [
    { title: "Title", field: "title", align: "center" },
    { title: "Description", field: "description", align: "center" },
    { title: "Estimate Hours", field: "estimateHours", align: "center" },
    {
      title: "Start Date",
      field: "startDate",
      align: "center",
      render: (rowData) => {
        return new Date(rowData.startDate).toLocaleDateString("en-GB");
      },
    },
    {
      title: "Due Date",
      field: "dueDate",
      align: "center",
      render: (rowData) => {
        return new Date(rowData.dueDate).toLocaleDateString("en-GB");
      },
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Box>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add new task
        </Button>
        <MaterialTable
          data={convertData}
          columns={columns}
          title="Task List"
          editable={{
            isDeleteHidden: (row) => row.status === true,
            isEditHidden: (row) => row.status === true,
            onRowDelete: (values) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const action = removeTask(values.id);
                  dispatch(action);
                  getAllTask();
                  resolve(true);
                }, 500);
              }),
            onRowUpdate: (values) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const action = updateTask(values);
                  dispatch(action);
                  resolve(true);
                }, 500);
              }),
          }}
          actions={[
            {
              icon: () => <button>Hoàn thành</button>,
              onClick: (e, data) => {
                data = {
                  ...data,
                  status: data.status === false ? true : false,
                };
                const action = updateTask(data);
                dispatch(action);
              },
            },
          ]}
          options={{
            searchFieldAlignment: "left",
            searchAutoFocus: true,
            searchFieldVariant: "outlined",
            pageSizeOptions: [10, 20, 30],
            pageSize: 10,
            exportButton: true,
            exportAllData: true,
            exportFileName: "TaskList",
            actionsColumnIndex: -1,
            sorting: true,
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            headerStyle: {
              background: "yellow",
              fontStyle: "italic",
              color: "Highlight",
            },
            rowStyle: (data, index) =>
              data.status === true ? { textDecoration: "line-through" } : null,
          }}
        />
      </Box>

      <Dialog
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <IconButton className={classes.CloseButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          <AddEditAction closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TodoList;
