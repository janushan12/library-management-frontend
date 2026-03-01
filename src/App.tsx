import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useState } from "react";
import Register from "./components/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        {isRegistering ? (
          <Register onRegistered={() => setIsLoggedIn(true)} onSwitchToLogin={() => setIsRegistering(false)} />
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} onSwitchToRegister={() => setIsRegistering(true)} />
        )}
      </div>
    );
  }
  return <Dashboard />;
}

export default App;
