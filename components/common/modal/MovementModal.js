import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

import tw from "tailwind-styled-components";

const ModalBg = tw.div`
    fixed 
    inset-0 
    bg-gray-500 
    bg-opacity-75 
    transition-opacity
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
    items-start 
    justify-center 
    p-[30px]
    fixed
`;
const CancelBtn = tw.button`
    w-[122px] 
    h-[60px] 
    border 
    border-[#ddd] 
    rounded-lg 
    text-[#999] 
    font-medium
`;
const ConfirmBtn = tw.button`
    w-[122px] 
    h-[60px] 
    bg-[#0074FF] 
    rounded-lg 
    text-white 
    font-medium
`;

function MovementModal(props) {
  let { moveModalData, setMoveModalData, folderListArray, setFolderListArray } =
    props;

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  const [checkedInput, setCheckedInput] = useState({
    user_id: cookies.token.id,
    post_id: moveModalData.id,
    folder: "",
  });

  let handleRadioBtn = (e) => {
    setCheckedInput({
      ...checkedInput,
      folder: e.target.value,
    });
  };

  // console.log("checkedInput :", checkedInput);

  let folderUpdate = async () => {
    return await axios.post(
      "http://localhost:3000/api/folder/move",
      checkedInput,
      {
        headers: {
          accessToken: cookies.token.accessToken,
        },
      }
    );
  };

  let folderFunc = () => {
    folderUpdate().then((res) => {
      // console.log(res.data);
    });
    router.reload();
  };

  return (
    <div className="relative z-40">
      <ModalBg className=""></ModalBg>
      <ModalContainer>
        <h3 className="text-lg font-medium text-black mb-6">링크 이동</h3>
        <div className="flex flex-col gap-5">
          <div>
            {folderListArray.map((data) => (
              <div key={data._id}>
                <input
                  type="radio"
                  id="folderRadio"
                  name="folder"
                  value={data.folder_title}
                  checked={checkedInput.folder === `${data.folder_title}`}
                  onChange={handleRadioBtn}
                  className="mb-4"
                />
                <label htmlFor="folderRadio" className="ml-2">{data.folder_title}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-[30px]">
          <CancelBtn
            type="button"
            onClick={() => {
              setMoveModalData({
                id: "",
                state: false,
              });
            }}
          >
            취소
          </CancelBtn>
          <ConfirmBtn onClick={folderFunc}>이동</ConfirmBtn>
        </div>
      </ModalContainer>
    </div>
  );
}

export default MovementModal;
