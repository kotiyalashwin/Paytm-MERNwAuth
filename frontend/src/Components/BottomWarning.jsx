import { Link } from "react-router-dom";

export default function BottomWarning({ label, to, text }) {
  return (
    <div className="flex font-medium space-x-2 text-sm">
      <p>{label}</p>
      <Link className="font-semibold underline underline-offset-1" to={to}>
        {text}
      </Link>
    </div>
  );
}
