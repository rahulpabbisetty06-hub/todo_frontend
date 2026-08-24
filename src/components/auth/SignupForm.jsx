import { Link,useNavigate} from "react-router-dom";
import { Eye,EyeOff } from "lucide-react";
import {useForm} from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {signup} from "../../api/signup.api";

export default function SignupForm() {
  const [loading,setLoading] = useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);

  const navigate = useNavigate();

  const {
  register,
  handleSubmit,
  reset,
  setValue,
  watch,
  formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
      setLoading(true);

      const response = await signup(data);

      console.log(response);

      toast.add({
          title: "Account Created",
          description: response.message,
          type: "success",
      });

      reset();

      setShowPassword(false);
      setShowConfirmPassword(false);

      navigate("/login");

    } catch (error) {
      console.error(error);

      toast.add({
          title: "Signup Failed",
          description:
              error.response?.data?.message ||
              "Something went wrong",
          type: "error",
      });
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <>
        <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Create account
          </CardTitle>
          <CardDescription>
            Fill in the details below to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2">
              <Label htmlFor="username">
                Username
              </Label>
              <Input className="h-11 text-sm md:text-base"
                placeholder="choose username"
                {...register("username",{
                    required:"Username is required",
                    minLength:{
                        value:3,
                        message:"Minimum 3 characters"
                    },
                    maxLength:{
                        value:20,
                        message:"Maximum 20 characters"
                    }
                })}
              />
              <p className="text-red-500 text-sm">
                    {errors.username?.message}
                </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>
              <div className="relative">
                <Input className="h-11 text-sm md:text-base"
                id="password"
                type={showPassword?"text":"password"}
                placeholder="Enter your password"
                {...register("password",{
                      required:"Password is required",

                      minLength:{
                          value:6,
                          message:"Minimum 6 characters"
                      },

                      maxLength:{
                          value:15,
                          message:"Maximum 15 characters"
                      }
                  })}
              />

              {showPassword?
              <Eye
                size={20}
                className="absolute right-3 top-3 cursor-pointer text-slate-400"
                onClick={()=>{setShowPassword(!showPassword)}} />
              :<EyeOff
                size={20}
                className="absolute right-3 top-3 cursor-pointer text-slate-400"
                onClick={()=>{setShowPassword(!showPassword)}}
              />}
              </div>
            </div>
            <p className="text-red-500 text-sm">
              {errors.password?.message}
            </p>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <div className="relative">
                <Input className="h-11 text-sm md:text-base"
                id="confirmPassword"
                type={showConfirmPassword?"text":"password"}
                placeholder="Enter your password"
                {...register("confirmPassword",{
                  required:"Confirm password is required",
                  validate:(value)=>{
                  if(value!==watch("password")){
                  return "Passwords do not match";
                  }
                  return true;
                  }
                  })}
              />

              {showConfirmPassword?(
              <Eye
                size={20}
                className="absolute right-3 top-3 cursor-pointer text-slate-400"
                onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}} />
              ):(<EyeOff
                size={20}
                className="absolute right-3 top-3 cursor-pointer text-slate-400"
                onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}
              />)}
              </div>
            </div>
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
             <div className="space-y-2">
              <Label>
                Security Question
              </Label>
              <Select
              onValueChange={(value)=>{
                setValue("securityQuestion",value,{
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}>
                <SelectTrigger className="h-11 w-full rounded-md border border-gray-300 bg-white">
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent className="rounded-md border border-gray-300 bg-white shadow-md" position="popper">
                  <SelectItem value="pet" className="cursor-pointer">
                    What was the name of your first pet?
                  </SelectItem>
                  <SelectItem value="school" className="cursor-pointer">
                    What was the name of your first school?
                  </SelectItem>
                  <SelectItem value="city" className="cursor-pointer">
                    In which city were you born?
                  </SelectItem>
                  <SelectItem value="teacher" className="cursor-pointer">
                    Who was your favourite teacher?
                  </SelectItem>
                  <SelectItem value="food" className="cursor-pointer">
                    What is your favourite food?
                  </SelectItem>
                  <SelectItem value="movie" className="cursor-pointer">
                    What is your favourite movie?
                  </SelectItem>
                  <SelectItem value="car" className="cursor-pointer">
                    What was your first vehicle?
                  </SelectItem>
                </SelectContent>
              </Select>
              <input className="h-11 text-sm md:text-base"
              type="hidden"
              {...register("securityQuestion", {
                required: "Please select a security question",
              })}
            />

            {errors.securityQuestion && (
              <p className="text-sm text-red-500">
                {errors.securityQuestion.message}
              </p>
            )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">
                Your Answer
              </Label>
              <Input className="h-11 text-sm md:text-base"
                placeholder="Enter your answer"
                {...register("securityAnswer",{
                  required:"Security answer is required"
                  })}
              />
              <p className="text-red-500 text-sm">
              {errors.securityAnswer?.message}
              </p>
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700  h-11 cursor-pointer" type="submit" disabled={loading}>
              {loading ? <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                       </> : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>
      <div className="mt-5 text-center">
        <span className="text-sm text-slate-600">
          Already have an account?
        </span>
        <Link
          to="/login"
          className="ml-1 text-sm font-medium text-indigo-600 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}