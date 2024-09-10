import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import DataSearch from "./components/DataSearch/DataSearch";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dataSearch" element={<DataSearch />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/user/pin/:pin" element={<User />} />
    </Routes>
  );
};

export default App;
