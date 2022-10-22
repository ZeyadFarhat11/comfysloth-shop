import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import "../style/auth.scss";
import { useGlobalContext } from "../context";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const { setUser } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (loading) return;
    setLoading(true);
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await updateProfile(user, {
        displayName: name,
      });
      await setDoc(doc(db, "users", user.uid), {
        cart: [],
        uid: user.uid,
        name: name,
      });
      setUser(user);
      setError(false);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container container">
      <div className="form-wrapper">
        <h2>signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" name="name" required />
          <input type="email" placeholder="email" name="email" required />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">
            {loading ? <span className="loading-effect"></span> : "signup"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
