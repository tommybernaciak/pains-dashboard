import { PropsWithChildren } from "react";
import Empty from "/assets/empty.png";
import Navbar from "./navbar";

function EmptyPage({ text, children }: PropsWithChildren<{ text: string }>) {
  return (
    <div className="flex flex-col h-full grow">
      <Navbar />
      <div className="w-full flex flex-col grow items-center justify-center gap-6">
        <img src={Empty} alt="empty-page" className="w-56 h-44" />
        <p className="text-2xl font-semibold font-clash text-[#667085]">
          {text}
        </p>
        {children}
      </div>
    </div>
  );
}

export default EmptyPage;
