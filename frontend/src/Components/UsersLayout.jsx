import Input from "./Input";
import { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((response) => setUsers(response.data.user));
  }, [filter]);

  return (
    <div className="p-4">
      <p className="text-2xl font-bold">Users</p>
      <div className="mt-4 mb-4">
        <Input
          placeholder={"Search users..."}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <UsersList users={users} />
    </div>
  );
}

function UsersList({ users }) {
  return (
    <div className="w-full h-full border p-4 text-white  ">
      <ul>
        {users.map((el) => (
          <li className="m-3">
            <User name={el.username} />
          </li>
        ))}
      </ul>
    </div>
  );
}
