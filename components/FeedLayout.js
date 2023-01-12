import { useState } from "react";
import SideNavBar from "./feeds/SideNavBar";






let FeedLayout = ({
  children,
  urlInputModal,
  setInputUrlModal,
  urlModalOpenFunc,
}) => {
  return (
    <>
      <div className="flex">
        <SideNavBar
          urlInputModal={urlInputModal}
          setInputUrlModal={setInputUrlModal}
          urlModalOpenFunc={urlModalOpenFunc}
        />
        <div className="w-[100%]">
        {children}
        </div>
      </div>
    </>
  );
};
export default FeedLayout;
