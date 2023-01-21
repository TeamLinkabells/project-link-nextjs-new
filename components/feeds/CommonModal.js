import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import Warning from "../../public/warning.svg";
import tw from "tailwind-styled-components";
import axios from "axios";

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

function CommonModal(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  let { commonModalData, setCommonModalData } = props;

  const [userData, setUrlData] = useState({
    user_id: cookies.token.id,
    email: cookies.token.email,
  });

  const router = useRouter();

  //
  let id = commonModalData.id;

  console.log("커먼 모달", id);
  console.log("유저 데이터" ,userData)

  let checkModalState = () => {
    console.log("커먼 모달 데이터", commonModalData);
 
    if (commonModalData.text === "로그아웃") {
      removeCookie("token", { path: "/" });
      //그 후 home페이지로 이동
      router.push("/");
    }
    if (commonModalData.text === "삭제") {
      console.log("삭제중");
      deleteData().then((res) => {
        console.log(res);
        router.reload();
      });
    }
    if (commonModalData.text === "탈퇴") {
      console.log("탈퇴중");
      console.log("탈퇴중");
      console.log("탈퇴중");
      deleteAccount().then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          removeCookie("token", { path: "/" });
          router.push("/");
        } else {
          //에러 메시지를 보여주고
          console.log("에러", res);
          alert(res.data.message);
        }
      });
    }

    setCommonModalData({
      ...commonModalData,
      text: "",
      state: false,
    });
  };

  let deleteData = () => {
    return axios.delete(`http://localhost:3000/api/feed/${id}`, {});
  };

  let deleteAccount = () => {
    return axios.delete("http://localhost:3000/api/auth/delete", {
      data: {
        userData,
      },
    });
  };

  return (
    <div>
      <ModalBg></ModalBg>
      <ModalContainer>
        <Warning />
        <AlertText>
          정말 <span className="text-[#0074FF]">{commonModalData.text}</span>{" "}
          하시겠습니까?
        </AlertText>
        {}
        <div className="flex gap-4 mt-[30px]">
          <CancelBtn
            onClick={() =>
              setCommonModalData({
                ...commonModalData,
                state: false,
              })
            }
          >
            취소
          </CancelBtn>
          <ConfirmBtn onClick={() => checkModalState()}>확인</ConfirmBtn>
        </div>
      </ModalContainer>
    </div>
  );
}

export default CommonModal;
