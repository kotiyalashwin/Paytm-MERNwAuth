import { useState } from "react";
import BottomWarning from "../Components/BottomWarning";
import Heading from "../Components/Heading";
import Input from "../Components/Input";
import SubHead from "../Components/SubHead";
import SubmitButton from "../Components/SubmitButton";
import axios from "axios";

export default function SignUp() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex felx-col justify-center items-center">
        <div className="bg-white rounded-lg h-[65vh] p-2 px-4 w-80 flex flex-col justify-evenly  items-center">
          <Heading label={"SignUp"} />
          <SubHead label={"Enter your information to create an account"} />
          <Input
            label={"Firsname"}
            placeholder={"Kevin"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label={"Lastname"}
            placeholder={"Russ"}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label={"Username"}
            placeholder={"KevinRuss02"}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            label={"Passsword"}
            placeholder={"Minimun length of 6"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col w-full items-center mt-1">
            <SubmitButton
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstname,
                    lastname,
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
              }}
              label={"SignUp"}
            />
            <BottomWarning
              label={"Already have an account?"}
              to={"/signin"}
              text={"SignIn"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
