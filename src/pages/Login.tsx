import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

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

  const onSubmit: SubmitHandler<LoginData> = async (userData: LoginData) => {
    const { data, error } = await loginUserMutation(userData);

    if (error) {
      toast.error(error.data.error);
      return;
    }

    if (data) {
      loginUser(data);
      toast.success(data.message);
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
