import React from "react";
import {
  Outlet
} from "react-router-dom";

import Footer from "./Footer";
import MyNav from "./MyNav";
const Home = () => {
  return (
    <div style={{ backgroundColor: "#F8FAFB" }}>
      <MyNav/>
      <Outlet/>
      <Footer />
    </div>
  );
};

export default Home;
