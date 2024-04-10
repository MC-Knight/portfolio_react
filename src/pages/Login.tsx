function Login() {
  return (
    <div className="login">
      <div className="login-nav">
        <h1>
          <span>Joseph</span> BT
        </h1>
      </div>

      <div className="login-form">
        <form name="login-continue-form">
          <h3>Login</h3>

          <div className="input-div-container">
            <p>Email</p>
            <div className="input-div">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="input-div-container">
            <p>Password</p>
            <div className="input-div">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="button" id="login">
            <p>Login</p>
            {/* <div className="loader"></div> */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
