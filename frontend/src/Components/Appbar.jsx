import axios from "axios";

import { useEffect, useState } from "react";

export default function Appbar({ name }) {
  return (
    <div className="w-full  h-14 p-4 flex justify-between border-b-2">
      <p className="text-2xl font-semibold">Welcome to Paytm</p>

      <div className="flex h-full items-center">
        <div className="h-full flex flex-col justify-center mr-4 text-lg">
          Hello , {name}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex  justify-center mt-1 mr-2">
          <div className=" flex flex-col justify-center h-full text-xl">
            {name.toUpperCase()[0]}
          </div>
        </div>
      </div>
    </div>
  );
}
