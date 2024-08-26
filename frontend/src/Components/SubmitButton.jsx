export default function SubmitButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-black p-2 w-[85%] h-11 text-lg text-white rounded-lg"
    >
      {label}
    </button>
  );
}
