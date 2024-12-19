import React from "react";
import Resetpassword from "../../../components/Auth/Resetpassword";

const page = async ({ params }: any) => {
  const { token } = await params;
  if (!token) {
    return <div>Invalid token</div>;
  }
  return (
    <div className="flex  h-[100vh]">
      <img src="/auth.png" alt="AuthPng" className="  object-cover" />
      <div className="p-20 flex w-full   items-center">
        <Resetpassword token={token} />
      </div>
    </div>
  );
};

export default page;
