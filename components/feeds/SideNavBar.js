import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import InputModal from "../InputModal";
import { useMediaQuery } from 'react-responsive'

import SidebarBtn from "../../public/sidebar_button.svg";
import ColorLogo from "../../public/logo_color.svg";
import Setting from "../../public/setting.svg";
import Logout from "../../public/logout.svg";
import tw from "tailwind-styled-components";
// import CommonModal from "./CommonModal";

const SidebarMenu = tw.div`
h-10 flex items-center text-[#666666] hover:bg-[#E1EEFF]
`;

function SideNavBar(props) {
  let { commonModalData, setCommonModalData, inputToggleFunc, data } = props;
  // console.log("로그아웃 모달", commonModalData);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [toggleMenu, setTogleMenu] = useState(true);

  const router = useRouter();

  //새 링크 올리기 모달
  const menuOpenFunc = () => {
    setTogleMenu(!toggleMenu); // on,off 개념 boolean
  };

  //전체 링크 목록
  let ClickAllNote = () => {
    router.push(`/feed/${cookies.token.id}`);
  };

  //즐겨찾는 링크
  let clickFavoriteNote = () => {
    router.push(`/feed/favorite/${cookies.token.id}`);
  };

  //로그아웃
  let logOutBtn = () => {
    console.log("로그아웃 버튼을 눌렀습니다.");
    setCommonModalData({
      ...commonModalData,
      text: "로그아웃",
      state: true,
    });
    // removeCookie("token", { path: "/" });
    // //그 후 home페이지로 이동
    // router.push("/");
  };

  return (
    <>
      <div className={toggleMenu ? "h-screen w-0 md:w-[240px]" : "h-screen w-[240px] md:w-0"}>
        <div
          className={
            toggleMenu
              ? "h-full bg-[#FAFAFA] fixed top-0 border-r border-[#EDEDED] duration-100 flex flex-col justify-between z-30 w-[240px] -left-[240px] md:left-0"
              : "w-[240px] h-full bg-[#FAFAFA] fixed top-0 left-0 md:-left-[240px] border-r border-[#EDEDED] duration-100 flex flex-col justify-between z-30"
          }
        >
          <ColorLogo
            width="140"
            height="26"
            viewBox="0 0 300 60"
            className="mx-auto mt-10"
          />
          <button
            className="absolute top-1/2 -right-5 translate-y-[-50%]"
            onClick={menuOpenFunc}
          >
            <SidebarBtn />
          </button>
          {/* ---------------------------사이드바------------------------ */}
          <div className="pt-6 mb-auto">
            <div className="mx-6">
              <button
                className="w-full h-10 bg-white border border-[#0074FF] rounded-[5px] text-[#0074FF] font-medium"
                onClick={() => {
                  inputToggleFunc(true);
                }}
              >
                새 링크 올리기
              </button>
            </div>
            <ul className="mt-5">
              <SidebarMenu>
                <button
                  className="w-full h-full flex items-center px-6"
                  onClick={ClickAllNote}
                >
                  전체 링크
                </button>
              </SidebarMenu>
              <SidebarMenu>
                <button
                  className="w-full h-full flex items-center px-6"
                  onClick={clickFavoriteNote}
                >
                  즐겨찾는 링크
                </button>
              </SidebarMenu>
            </ul>
          </div>
          <div>
            <ul className="mx-6 mb-7">
              <li className="flex mt-6 text-[#666666] cursor-pointer w-fit">
                <Setting />
                <p className="ml-2">설정</p>
              </li>
              <li className="flex mt-6 text-[#666666] cursor-pointer w-fit">
                <Logout />
                <button
                  onClick={() => {
                    logOutBtn();
                  }}
                >
                  <p className="ml-2">로그아웃</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNavBar;
