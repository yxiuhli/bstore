
import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import authService from "../services/auth.service";

const Login = () => {
  const { isLoggedIn, setUserState } = useUser();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setError("");
      setIsLoading(true);
      const data = await authService.login(email, password);
      toast.success("Login successful 🔓");

      setTimeout(() => {
        setUserState(data);
        setRedirectToReferrer(true);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message);
    }
  };

  if (redirectToReferrer) {
    return <Navigate to={state?.from || "/"} />;
  }
  if (isLoggedIn) {
    return <Navigate to={state?.from || "/"} />;
  }

  return (
      <div className="flex items-center justify-center m-auto mt-20 pt-12">
        <form
          className="drop-shadow-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-4xl mb-4 text-purple-600 text-shadow" >Đăng Nhập</h1>
          <div className="">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Email</span>
            </Label>
            <Input
              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="email"
              name="email"
              {...register("email", {
                required: true,
                // eslint-disable-next-line no-useless-escape
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              placeholder="Hãy nhập email của bạn"
            />
          </div>
          {errors?.email && errors?.email.type === "required" && (
            <HelperText className="mt-1 italic" valid={false}>
              Email required
            </HelperText>
          )}
          {errors?.email && errors?.email.type === "pattern" && (
            <HelperText className="mt-1 italic" valid={false}>
              Invalid email
            </HelperText>
          )}
          <div className="mt-4">
            <Label className="block text-grey-darker text-sm font-bold mb-2">
              <span>Mật khẩu</span>
            </Label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              {...register("password", { required: true })}
            />
          </div>
          {errors?.password && (
            <HelperText className="mt-1 italic" valid={false}>
              {errors?.password?.type === "required" && "Password required"}
            </HelperText>
          )}
          {error && (
            <HelperText className="mt-1 italic" valid={false}>
              {error}
            </HelperText>
          )}
          <div className="mt-4">
            <ForgotPasswordModal />
          </div>
          <Button type="submit" disabled={isLoading }>
            {isLoading ? <PulseLoader color={"#592d0d"} size={10} loading /> : "Đăng nhập"}
          </Button>
          
          <p className="text-sm mt-4">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="font-bold">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
  );
};

export default Login;
