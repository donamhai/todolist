import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import taskApi from "../../../api/taskApis";
import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import TodoList from "../components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "../todoSlice";

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: { marginTop: "20px" },

  right: {
    flex: "auto",
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // init get all task after login
    (() => {
      try {
        const action = getAllTask();
        dispatch(action);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    })();
  }, []);

  return (
    <Box>
      <Container className={classes.root}>
        <Grid container spacing={1}>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <TodoList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
