import Appbar from "../Components/Appbar";
import Balance from "../Components/Balance";
import UsersLayout from "../Components/UsersLayout.jsx";

export default function Dashboard() {
  return (
    <div className="h-screen w-screen p-4">
      <Appbar />
      <Balance />
      <UsersLayout />
    </div>
  );
}
