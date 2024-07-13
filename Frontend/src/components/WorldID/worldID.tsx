import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IDKitWidget } from "@worldcoin/idkit";
import axios from "axios";
import { useIDKit } from "@worldcoin/idkit";

export default function worldID() {
  const [isHuman, setIsHuman] = useState(false);

  const worldAppID = import.meta.env.VITE_WLD_APP_ID;
  const [currTime, setCurrTime] = useState("");

  const { open, setOpen } = useIDKit();
  const onSuccess = async (response: any) => {
    console.log("done");
  };
  function timeInSeconds() {
    var currentDate = new Date();
    console.log(currentDate);
    var timestamp = currentDate.getTime();
    var timestampInSeconds = Math.floor(timestamp / 1000);
    console.log(String(timestampInSeconds).slice(0, -1));
    setCurrTime(String(timestampInSeconds));
  }
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const paperStyle = {
    minWidth: 250,
    height: 250,
    padding: "16px",
    margin: "8px",
  };

  const isSuccess = async (response: any) => {
    try {
      timeInSeconds();
      const reqBody = {
        merkle_root: response.merkle_root,
        nullifier_hash: response.nullifier_hash,
        proof: response.proof,
        credential_type: response.credential_type,
        action: "verify",
        // signal: 'time',
        signal: currTime,
      };

      // Send the reqBody to the backend
      const backendUrl = "http://localhost:5001/verify";
      const backendResponse = await axios.post(backendUrl, reqBody);
      console.log("Backend response:", backendResponse.data);
      setIsHuman(true);
      close;
    } catch (error) {
      setIsHuman(false);
      console.error("Error during verification:", error);
      window.alert("Error during verification. Please try again.");
    }
  };

  //   useEffect(() => {
  //     console.log("Time in seconds:", currTime);
  //     console.log(worldAppID);
  //     setOpen(true);
  //     timeInSeconds();
  //   }, []);
  return (
    <>
      <div>
        {!isHuman && (
          <>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "column",
              }}
            >
              <ThemeProvider theme={darkTheme}>
                <Paper
                  className="container"
                  elevation={10}
                  variant="elevation"
                  sx={{
                    width: 300,
                    height: 200,
                    borderRadius: 3,
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5" component="div">
                    You did not verify that you are a human yet!
                    <IDKitWidget
                      app_id={worldAppID}
                      action="verify"
                      // signal='time'
                      signal={currTime}
                      handleVerify={isSuccess}
                      onSuccess={onSuccess}
                      credential_types={["orb"]}
                      enableTelemetry
                    >
                      {({ open }) => (
                        <button onClick={open}>Verify with World ID</button>
                      )}
                    </IDKitWidget>
                  </Typography>
                </Paper>
              </ThemeProvider>
            </div>
          </>
        )}
      </div>
    </>
  );
}
