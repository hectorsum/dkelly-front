import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { removeAlert } from "../state/action-creators/alert";
import { Alert, AlertState } from "../state/actions/alert";
import { RootState } from "../state";

function Alerts() {
  const toast = useToast();
  const dispatch = useDispatch();
  const {alerts}: AlertState = useSelector((state: RootState) => state.alerts);
  useEffect(() => {
    alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert: Alert) => {
        toast({
          title: alert.msg,
          status: alert.alertType,
          variant:"left-accent",
          isClosable: true,
        })
        dispatch(removeAlert(alert.id));
      });
  }, [dispatch, alerts]);
  return <></>;
}

export default Alerts;