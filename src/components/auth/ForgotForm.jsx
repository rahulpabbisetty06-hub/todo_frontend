import {getSecurityQuestion,updatePassword} from "@/api/forgotPassword.api.js";
import { useNavigate } from "react-router-dom";

import { toast } from "@/components/ui/toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import { Loader2 } from "lucide-react";

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

export default function ForgotForm() {

  const [loading,setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [showSecuritySection, setShowSecuritySection] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("");

  const [questionLoaded, setQuestionLoaded] = useState(false);

  const {
  register,
  handleSubmit,
  reset,
  setValue,
  watch,
  getValues,
  formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleGetSecurityQuestion = async () => {

        const username = getValues("username");

        if (!username) {
           toast.add({
              title: "Info",
              description: "Please enter username",
              type: "info",
          });
            return;
        }

        try {
            setLoading(true);
            const response = await getSecurityQuestion(
              getValues("username")
            )

            setSecurityQuestion(response.securityQuestion);

            setShowSecuritySection(true);

            setQuestionLoaded(true);

        } catch (error) {
            toast.add({
                title: "Error",
                description: "Username not found",
                type: "error",
            });
        }
    };

  const onSubmit = async (data) => {
    try{

    console.log(data);
    resetLoading(true);

    const response = await updatePassword({
            username: data.username,
            securityAnswer: data.securityAnswer,
            newPassword: data.password
        });

    toast.add({
        title: "Success",
        description: response.message,
        type: "success",
    });
    
    reset();

    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setShowSecuritySection(false);


    navigate("/login");
  }catch(error){
        toast.add({
            title: "Error",
            description:
                error.response?.data?.message ||
                error.message ||
                "Something went wrong",
            type: "error",
        });
  }

   };
  return (
    <>
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          Reset Password
        </CardTitle>

        <CardDescription>
          Confirm your identity, then choose a new password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs font-semibold tracking-wider text-slate-500">
              STEP 1 — VERIFY IDENTITY
            </span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">
              Username
            </Label>

            <Input
                className="h-11 text-sm md:text-base"
                placeholder="Choose a username"

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

            {!questionLoaded && (
            <Button
              type="button"
              disabled={loading}
              className="w-full mb-5 bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
              onClick={handleGetSecurityQuestion}  >
              {loading ? <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Getting data...
                       </> : "Get Security Question"}   
            
            </Button>
            )}

          {showSecuritySection&&<>
          <div className="space-y-2">
            {/*<Label>
              Security Question
            </Label>*/}
           
            {/*<Select
              onValueChange={(value)=>{
                 setValue("securityQuestion", value, {
                    shouldValidate: true,
                  });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a security question" />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="pet">
                  What was the name of your first pet?
                </SelectItem>

                <SelectItem value="school">
                  What was the name of your first school?
                </SelectItem>

                <SelectItem value="city">
                  In which city were you born?
                </SelectItem>

                <SelectItem value="teacher">
                  Who was your favourite teacher?
                </SelectItem>

                <SelectItem value="food">
                  What is your favourite food?
                </SelectItem>

              </SelectContent>
            </Select>*/}
            <div className="space-y-2">

                <Label>
                    Security Question
                </Label>

                <div className="h-11 flex items-center rounded-md border border-slate-300 bg-slate-100 px-3">

                    {securityQuestion}

                </div>

            </div>

            {/*<input className="h-11 text-sm md:text-base"
              type="hidden"
              {...register("securityQuestion", {
                required: "Please select a security question",
              })}
            />

            {errors.securityQuestion && (
              <p className="text-sm text-red-500">
                {errors.securityQuestion.message}
              </p>
            )}*/}
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
          </>
          }

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs font-semibold tracking-wider text-slate-500">
              STEP 2 — NEW PASSWORD
            </span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">
              New Password
            </Label>

            <div className="relative">
              <Input className="h-11 text-sm md:text-base"
                  type={showNewPassword ? "text" : "password"}
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
              {showNewPassword ? (
                <Eye
                  size={18}
                  className="absolute right-3 top-3 cursor-pointer text-slate-400"
                  onClick={() =>
                    setShowNewPassword(false)
                  }
                />
              ) : (
                <EyeOff
                  size={18}
                  className="absolute right-3 top-3 cursor-pointer text-slate-400"
                  onClick={() =>
                    setShowNewPassword(true)
                  }
                />
              )}
            </div>
          </div>
          <p className="text-red-500 text-sm">
              {errors.password?.message}
          </p>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm New Password
            </Label>

            <div className="relative">
              <Input className="h-11 text-sm md:text-base"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
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

              {showConfirmPassword ? (
                <Eye
                  size={18}
                  className="absolute right-3 top-3 cursor-pointer text-slate-400"
                  onClick={() =>
                    setShowConfirmPassword(false)
                  }
                />
              ) : (
                <EyeOff
                  size={18}
                  className="absolute right-3 top-3 cursor-pointer text-slate-400"
                  onClick={() =>
                    setShowConfirmPassword(true)
                  }
                />
              )}
            </div>
          </div>
          <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
          </p>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 cursor-pointer"  type="submit"  disabled={resetLoading}>
            {resetLoading ? <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating Password...
                       </> : "Reset Password"}
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        
      </CardFooter>
    </Card>
     <div className="mt-5 text-center">
        <span className="text-sm text-slate-600">
          Remember your password?
        </span>
        <Link
          to="/login"
          className="ml-1 text-sm font-medium text-indigo-600 hover:underline"
        >
           login
        </Link>
      </div>
   </>
  );
}
