import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import AuthFeatures from "./features/Auth";
import FireBase from "./config/firebase";
import TodoList from "./features/Todolist";
import NotFound from "./components/NotFound";

function App() {
  //check user is logging or not when app is started
  useEffect(() => {
    const unregisterAuthObserver = FireBase.auth().onAuthStateChanged(
      async (user) => {
        if (!user) {
          console.log("user is not logged in");
          return;
        }

        await user.getIdToken();
      }
    );

    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Redirect from="/" to="/signin" exact />

        <Route path="/signin" component={AuthFeatures} />
        <Route path="/todos" component={TodoList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
