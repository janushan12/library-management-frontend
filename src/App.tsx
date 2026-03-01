import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  if (!isLoggedIn) 
    return <Login onLogin={() => setIsLoggedIn(true)} />;

  return <Dashboard />;
}

export default App;
