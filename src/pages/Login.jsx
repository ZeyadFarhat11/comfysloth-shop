import React from "react";
function Login() {
  const login = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form>
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit" onClick={login}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
