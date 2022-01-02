import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./App.css";
import Chat from "./Chat";
import Login from "./Login";
import Sidebar from "./Sidebar";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/" />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
