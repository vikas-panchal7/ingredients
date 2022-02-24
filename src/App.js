import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";
import { AuthContext } from "./components/context/authcontext";
const App = (props) => {
  const Authctx = useContext(AuthContext);
  let content = <Auth />;
  if (Authctx.isAuth) {
    content = <Ingredients />;
  }
  return content;
};

export default App;
