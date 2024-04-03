/* eslint-disable no-unused-vars */
import {Grid,Card} from "@mui/material";
import React from 'react';
import Login from "./Login";
import Register from "./Register";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {Outlet} from "react-router-dom";

function Authentication() {

  return (
    <div>
      <Grid container>
        <Grid className="h-screen overflow-hidden" item xs={7}>
          <img
            className="h-full w-full"
            src="https://img.freepik.com/free-vector/social-media-popularity_74855-4576.jpg?w=1060&t=st=1711640341~exp=1711640941~hmac=2b290a466ae3d34776bcc5f198e683e8b189b568a8e7870fd29afb124c860312"
            alt="social"
          />
        </Grid>

        <Grid item xs={5}>
          <div className="px-20 flex flex-col justify-center h-full">
            <Card className="card p-8">
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="logo text-center">ChatterBox</h1>
                <p className="text-center text-sm w-[70%]">
                  Connecting Lives, Sharing Stories: Your World, Your Way
                </p>
              </div>

              {/* <Outlet /> */}
              <Routes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Authentication;