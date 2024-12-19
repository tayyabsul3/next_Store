import React from "react";

const Primarybtn = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <button >
      {children}
    </button>
  );
};

export default Primarybtn;
