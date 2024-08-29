import Appbar from "../Components/Appbar";
import Balance from "../Components/Balance";
import UsersLayout from "../Components/UsersLayout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../Components/SubmitButton.jsx";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return useEffect(() => {
      alert("You are logged out");
      navigate("/signin");
    });
  }
  console.log(token);
  const [user, setUser] = useState("");

  useEffect(() => async () => {
    await axios
      .get("http://localhost:3000/api/v1/user/admin", {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((response) => setUser(response.data.user[0].firstname));
  });

  return (
    <div className="h-screen w-screen p-4">
      <Appbar name={user} />
      <Balance />
      <UsersLayout />
    </div>
  );
}
