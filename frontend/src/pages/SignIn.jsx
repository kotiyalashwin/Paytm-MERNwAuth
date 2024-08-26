import BottomWarning from "../Components/BottomWarning";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import SubHead from "../Components/SubHead";
import SubmitButton from "../Components/SubmitButton";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex felx-col justify-center items-center">
        <div className="border-2 rounded bg-white p-8 h-3/5 w-80 flex flex-col justify-evenly items-center">
          <Heading label={"SignIn"} />
          <SubHead label={"Enter your credentials to signin"} />
          <Input label={"Username"} placeholder={"Registered username"} />
          <Input label={"Password"} placeholder={"Enter password"} />
          <SubmitButton label={"SignIn"} />

          <BottomWarning
            label={"Create an account?"}
            to={"/signup"}
            text={"SignUp"}
          />
        </div>
      </div>
    </div>
  );
}
