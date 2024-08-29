import { useState } from "react";
import BottomWarning from "../Components/BottomWarning";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import SubHead from "../Components/SubHead";
import SubmitButton from "../Components/SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  localStorage.removeItem("token");

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center p-4 md:p-8">
      <div className="flex flex-col justify-center items-center w-full max-w-md">
        <div className=" bg-opacity-90 shadow-lg rounded-lg p-6 sm:p-8 md:p-10 w-full space-y-6">
          <Heading label={"Sign In"} />
          <SubHead label={"Enter your credentials to sign in"} />
          <Input
            label={"Username"}
            placeholder={"Registered username"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label={"Password"}
            placeholder={"Enter password"}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton
            label={"Sign In"}
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
          />
          <BottomWarning
            label={"Don’t have an account?"}
            to={"/signup"}
            text={"Sign Up"}
          />
        </div>
      </div>
    </div>
  );
}
