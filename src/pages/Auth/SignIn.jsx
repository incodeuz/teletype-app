import { Button, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoader from "../../store";
import useUserApi from "../../service/user";

const SignIn = () => {
  const { isLoading, startLoading, endLoading } = useLoader();
  const navigate = useNavigate();
  const toast = useToast();
  const pasRef = useRef();

  const { signIn } = useUserApi();

  const [showPass, setShowPass] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(true);

  useEffect(() => {
    if (showPass) {
      pasRef.current.type = "text";
    } else {
      pasRef.current.type = "password";
    }
  }, [showPass]);

  const signInFunc = (e) => {
    e.preventDefault();
    const [username, password] = e.target.querySelectorAll("input");
    setIsInvalidUsername(/^[a-zA-Z0-9_]+$/.test(username.value));
    if (isInvalidUsername == true) {
      setIsInvalidUsername(true);
      startLoading();
      const body = {
        username: username.value,
        password: password.value,
      };
      signIn({ ...body })
        .then((res) => {
          setIsInvalidUsername(true);
          endLoading();
          console.log(res.data);
          if (res.data) {
            toast({
              title: "You're successfully logged in",
              status: "success",
              position: "top",
            });
            localStorage.setItem("token", res.data?.token);
            localStorage.setItem("my_id", res.data?.user?.id);
            localStorage.setItem("username", res.data?.user?.username);
            return navigate("/");
          }
        })
        .catch((err) => {
          endLoading();
          setIsInvalidUsername(true);
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
              Sign in
            </Text>
          </div>
          <form onSubmit={(e) => signInFunc(e)}>
            <FormLabel htmlFor="username">User name</FormLabel>
            <Input
              onChange={(e) =>
                setIsInvalidUsername(/^[@_a-zA-Z]+$/.test(e.target.value))
              }
              isInvalid={!isInvalidUsername}
              required
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
              <Input required ref={pasRef} id="password" type="password" />
              {showPass ? (
                <ViewOffIcon
                  onClick={() => setShowPass(!showPass)}
                  className="z-99 text-[20px] cursor-pointer absolute top-[42px] right-[17px]"
                />
              ) : (
                <ViewIcon
                  onClick={() => setShowPass(!showPass)}
                  className="z-99 text-[20px] cursor-pointer absolute top-[42px] right-[17px]"
                />
              )}
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              colorScheme="blue"
              className="w-full mt-[25px]"
            >
              Sign in
            </Button>
          </form>
        </div>
        <Button
          onClick={() => navigate("/sign-up")}
          colorScheme="gray"
          size="sm"
          className="w-full max-w-[450px] mt-[20px]"
        >
          If you haven't an account?{" "}
          <span className="text-blue-500 ml-1">Register new account</span>
        </Button>
      </div>
    </>
  );
};

export default SignIn;
