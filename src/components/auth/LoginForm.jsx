import { Link,useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../api/login.api";
import { toast } from "@/components/ui/toast.jsx";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
   try{
    setLoading(true);

    const response = await login(data);

    console.log(response);

    localStorage.setItem(
      "accessToken",
      response.data.accessToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    /*console.log(
    localStorage.getItem("accessToken")
     );*/

    toast.add({
      title: "Login Successful",
      description: `Welcome ${response.data.user.username}`,
      type: "success",
    });

    reset();
    setShowPassword(false);

    navigate("/dashboard");
   }
   catch(error){
       toast.add({
         title:"Login Failed",
         description:
          error.response?.data?.message ||
          "Invalid username or password",
         type: "error",
       })
   }
   finally{
    setLoading(false);
   }
  };


  return (
    <>
    <div className="w-full max-w-md">
      <Card className="w-full max-w-md shadow-xl">

        <CardHeader>
          <CardTitle className="text-2xl">
            Login
          </CardTitle>

          <CardDescription>
            Enter your credentials to access your workspace.
          </CardDescription>
        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            <div className="space-y-2">

              <Label htmlFor="username">
                Username
              </Label>

              <Input className="h-11 text-sm md:text-base"
                id="username"
                placeholder="Enter your username"

                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum 20 characters",
                  },
                })}
              />

              <p className="text-sm text-red-500">
                {errors.username?.message}
              </p>

            </div>


            <div className="space-y-2">

              <div className="flex items-center justify-between">

                <Label htmlFor="password">
                  Password
                </Label>

                <Link
                  to="/forgot"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <Input className="h-11 text-sm md:text-base"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"

                  {...register("password", {
                    required: "Password is required",

                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },

                    maxLength: {
                      value: 15,
                      message: "Maximum 15 characters",
                    },
                  })}
                />

                {showPassword ? (

                  <Eye
                    size={20}
                    className="absolute right-3 top-3 cursor-pointer text-slate-400"
                    onClick={() =>
                      setShowPassword(false)
                    }
                  />

                ) : (

                  <EyeOff
                    size={20}
                    className="absolute right-3 top-3 cursor-pointer text-slate-400"
                    onClick={() =>
                      setShowPassword(true)
                    }
                  />

                )}

              </div>

              <p className="text-sm text-red-500">
                {errors.password?.message}
              </p>

            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 cursor-pointer"
              disabled={loading}
            >
                {loading?(
                  <>
                     <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                     Signing In...
                  </>
                ):("Login")}
            </Button>

          </form>

        </CardContent>

      </Card>

      <div className="mt-5 text-center">

        <p className="text-sm text-slate-500">

          Don't have an account?

          <Link
            to="/signup"
            className="ml-1 font-medium text-indigo-600 hover:underline"
          >
            Sign up
          </Link>

        </p>

      </div>
      </div>
    </>
  );
}