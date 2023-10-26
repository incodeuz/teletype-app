import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserApi from "../../service/user";
import useLoader from "../../store";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(true);
  const pasRef1 = useRef();
  const pasRef2 = useRef();
  const toast = useToast();
  const { signUp } = useUserApi();
  const { isLoading, startLoading, endLoading } = useLoader();

  useEffect(() => {
    if (showPass1) {
      pasRef1.current.type = "text";
    } else {
      pasRef1.current.type = "password";
    }
    if (showPass2) {
      pasRef2.current.type = "text";
    } else {
      pasRef2.current.type = "password";
    }
  }, [showPass1, showPass2]);

  const signUpFunc = (e) => {
    e.preventDefault();
    const [fullname, username, password, rPassword] =
      e.target.querySelectorAll("input");
    setIsInvalidUsername(/^[a-zA-Z0-9_]+$/.test(username.value));
    if (isInvalidUsername == true && password.value === rPassword.value) {
      setIsInvalidUsername(true);
      startLoading();
      const body = {
        username: username.value,
        password: password.value,
        full_name: fullname.value,
      };
      signUp(body)
        .then((res) => {
          if (res.data) {
            endLoading(true);
            toast({
              title: "Now login to your new account",
              status: "info",
              position: "top",
            });
            toast({
              title: "You're successfully register new account",
              status: "success",
              position: "top",
            });

            navigate("/sign-in");
          }
        })
        .catch((err) => {
          setIsInvalidUsername(true);
          endLoading(true);
          toast({
            title: err.response.data.message,
            status: "error",
            position: "top",
          });
        });
    } else {
      setIsInvalidUsername(/^[a-zA-Z0-9_]+$/.test(username.value));
    }
  };
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <div className="w-full max-w-[450px] shadow-lg p-7 rounded-xl">
          <div className="relative">
            <ArrowBackIcon
              onClick={() => navigate("/")}
              className="cursor-pointer text-[23px] font-bold absolute left-0 top-[50%] -translate-y-[50%]"
            />
            <Text fontSize="2xl" className="font-bold text-center mb-[40px]">
              Sign up
            </Text>
          </div>
          <form onSubmit={(e) => signUpFunc(e)}>
            <FormLabel htmlFor="fullname">Full name</FormLabel>
            <Input id="fullname" type="text" />
            <FormLabel htmlFor="username" className="mt-[10px]">
              User name
            </FormLabel>

            <Input
              onChange={(e) =>
                setIsInvalidUsername(/^[@_a-zA-Z]+$/.test(e.target.value))
              }
              id="username"
              type="text"
            />
            {isInvalidUsername == false > 1 && (
              <p className="text-[15px] text-red-500 p-1">Invalid username</p>
            )}
            <div className="relative">
              <FormLabel htmlFor="password" className="mt-[10px]">
                Password
              </FormLabel>
              <Input ref={pasRef1} id="password" type="password" />
              {showPass1 ? (
                <ViewOffIcon
                  onClick={() => setShowPass1(!showPass1)}
                  className="z-99 text-[20px] cursor-pointer absolute top-[42px] right-[17px]"
                />
              ) : (
                <ViewIcon
                  onClick={() => setShowPass1(!showPass1)}
                  className="z-99 text-[20px] cursor-pointer absolute top-[42px] right-[17px]"
                />
              )}
            </div>
            <div className="relative">
              <FormLabel htmlFor="r-password" className="mt-[10px]">
                Repeat password
              </FormLabel>
              <Input ref={pasRef2} id="r-password" type="password" />
              {showPass2 ? (
                <ViewOffIcon
                  onClick={() => setShowPass2(!showPass2)}
                  className="z-99 text-[20px] cursor-pointer absolute top-[42px] right-[17px]"
                />
              ) : (
                <ViewIcon
                  onClick={() => setShowPass2(!showPass2)}
                  className="z-99 text-[20px] cursor-pointer absolute top-[42px] right-[17px]"
                />
              )}
            </div>

            <Button
              type="submit"
              colorScheme="blue"
              className="w-full mt-[25px]"
              isLoading={isLoading}
            >
              Sign up
            </Button>
          </form>
        </div>

        <Button
          onClick={() => navigate("/sign-in")}
          colorScheme="gray"
          size="sm"
          className="w-full max-w-[450px] mt-[20px]"
        >
          If you already have an account?
          <span className="text-blue-500 ml-1">Login</span>
        </Button>
      </div>
    </>
  );
};

export default SignUp;
