import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../style/auth.scss";
import { useGlobalContext } from "../context";

function Login() {
  const { setUser } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (e) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.code);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="form-container container">
      <div className="form-wrapper">
        <h2>login</h2>
        <form onSubmit={login}>
          <input type="email" placeholder="email" name="email" required />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">
            {loading ? <span className="loading-effect"></span> : "login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
