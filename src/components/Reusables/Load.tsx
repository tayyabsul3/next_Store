import { Loader2 } from "lucide-react";
import React from "react";

const Load = ({ size }: { size: number }) => {
  return (
    <div className="">
      <div className="animate-spin">
        <Loader2 size={size} />
      </div>
    </div>
  );
};

export default Load;
