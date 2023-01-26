import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";

import tw from "tailwind-styled-components";

import Close from "../../../public/close.svg";

const ModalBg = tw.div`
    bg-[#6B7280] 
    opacity-50 
    z-40 
    w-screen 
    h-screen 
    absolute 
    top-0 
    left-0
    fixed
`;
const ModalContainer = tw.div`
    w-[320px] 
    bg-white 
    rounded-lg 
    z-50 
    absolute 
    top-1/2 
    left-1/2 
    translate-x-[-50%] 
    translate-y-[-50%] 
    flex 
    flex-col 
    items-center 
    justify-center 
    p-[30px]
    fixed
`;
const AlertText = tw.p`
    text-lg 
    mt-[24px] 
    font-medium
`;
const ModalCloseBtn = tw.button`
    mt-3 
    inline-flex 
    justify-center 
    rounded-md 
    bg-white 
    text-base 
    font-medium 
    text-gray-700 
    shadow-sm 
    hover:bg-gray-50 
    sm:mt-0 
    sm:ml-3 
    w-auto 
    sm:text-sm 
    absolute 
    top-[25px] 
    right-[30px]
`;
const ConfirmBtn = tw.button`
    w-[122px] 
    h-[60px] 
    bg-[#0074FF] 
    rounded-lg 
    text-white 
    font-medium
`;

function UrlModal(props) {
  let { showUrlModal, setShowUrlModal, url } = props;

  const [ copyState, setCopyState ] = useState(false);

  return (
    <div>
      <ModalBg></ModalBg>
      <ModalContainer>
        <div className="flex gap-4 mt-[30px]">
          <CopyToClipboard text={url} onCopy={()=>{
                setCopyState(true);
              }}>
            <button
            >
              복사
            </button>
          </CopyToClipboard>
          {copyState ? (
            <span style={{ color: "red" }}>URl을 복사했습니다.</span>
          ) : null}
        </div>
        {}
        <div className="flex gap-4 mt-[30px]">
          <Link href={url} target="blank">
            <ConfirmBtn>이동</ConfirmBtn>
          </Link>
        </div>
        <ModalCloseBtn
          type="button"
          onClick={() => {
            setShowUrlModal(false);
          }}
        >
          <Close />
        </ModalCloseBtn>
      </ModalContainer>
    </div>
  );
}

export default UrlModal;
