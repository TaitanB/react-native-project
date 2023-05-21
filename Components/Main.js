import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRoute } from "./router";

import { authStateChangeUser } from "../Redux/operations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const routing = useRoute(stateChange);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <>{routing}</>;
};

export default Main;
