import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//slice
import { loginUser } from "../slices/user";
//mutation
import { useLoginUserMutation } from "../actions/users";

type LoginData = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const [loginUserMutation, { isLoading }] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginData> = async (userData: LoginData) => {
    try {
      const response = await loginUserMutation(userData).unwrap();
      dispatch(loginUser(response));
      toast.success(response.message);
      navigate("/dashboard");
    } catch (error) {
      const err = error as Record<string, Record<string, string>>;
      toast.error(err.data.error);
    }
  };
  return (
    <div className="login">
      <div className="login-nav">
        <h1>
          <span>Joseph</span> BT
        </h1>
      </div>

      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Login</h3>

          <div className="input-div-container">
            <p>Email</p>
            <div className="input-div">
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && <span className="error">Email is required</span>}
          </div>

          <div className="input-div-container">
            <p>Password</p>
            <div className="input-div">
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && (
              <span className="error">Password is required</span>
            )}
          </div>

          <button type="submit">
            {isLoading ? <div className="loader"></div> : <p>Login</p>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
