import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/auth.scss";
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  };
  return (
    <div className="form-container container">
      <div className="form-wrapper">
        <h2>login</h2>
        <form>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit" onClick={login}>
            {loading ? <span className="loading">loading</span> : "login"}
          </button>
        </form>
        <p>
          don't have an account? <Link to="/signup">sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
