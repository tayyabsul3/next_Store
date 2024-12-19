import { LoaderPinwheelIcon } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="animate-spin">
        <LoaderPinwheelIcon size={30} />
      </div>
    </div>
  );
};

export default loading;
