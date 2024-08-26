export default function Input({ label, placeholder, onChange }) {
  return (
    <div className="w-full">
      <p className="font-semibold">{label}</p>
      <input
        onChange={onChange}
        className="w-full border-2 p-2 border-gray-200 outline-none placeholder:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
