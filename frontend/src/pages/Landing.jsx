import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3000/").then((res) => navigate(res.data.path));
  });
}
