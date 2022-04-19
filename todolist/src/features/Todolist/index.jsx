import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { Box } from "@material-ui/core";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import Header from "../../components/Hearder";

TodoList.propTypes = {};

function TodoList(props) {
  const match = useRouteMatch();
  return (
    <Box>
      <Header />
      <Switch>
        <Route path={match.url} exact component={ListPage} />
      </Switch>
    </Box>
  );
}

export default TodoList;
