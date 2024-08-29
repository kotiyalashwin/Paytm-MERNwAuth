import SubmitButton from "./SubmitButton";

export default function User({ name }) {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex  justify-center mt-1 mr-2">
          <div className=" flex flex-col justify-center h-full text-xl">
            {name[0].toUpperCase()}
          </div>
        </div>
        <p className="font-semibold text-lg">{name}</p>
      </div>
      <div className="w-[15%]">
        <SubmitButton bg={"bg-black"} label={"Send Money"} />
      </div>
    </div>
  );
}
