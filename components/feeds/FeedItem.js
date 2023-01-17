import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import CommonModal from "../CommonModal";

import Delete from "../../public/delete.svg";
import Bookmark from "../../public/bookmark.svg";

let FeedItem = (props) => {
  let { img, title, description, url, commonModalData, setCommonModalData } =
    props;
  const router = useRouter();

  const id = router.query.id || ["로딩중"];
  const pathname = router.pathname;

  // console.log("쿼리 아이디", id);
  // console.log("현재 url", pathname.includes("favorite"));

  const [linkInfo, setLinkInfo] = useState({
    id: props.id,
    title: props.title,
    description: props.description,
    img: props.img,
    url: props.url,
  });

  const [favoriteState, setFavortieState] = useState(false);

  let favoriteData = () => {
    return axios.post(`http://localhost:3000/api/favorite`, linkInfo);
  };

  let unFavoriteData = () => {
    return axios.post(`http://localhost:3000/api/favorite/uncheck`, linkInfo);
  };

  let favoriteSubmitBtn = () => {
    // console.log("토글 후 값", favoriteState);
    if (favoriteState === true) {
      favoriteData().then((res) => console.log(res));
    }
  };

  let unFavotieSubmitBtn = () => {
    alert("즐겨찾기를 해제하시겠습니까?");
    unFavoriteData().then((res) => console.log(res));
    router.reload();
  };

  let favoriteToggle = () => {
    setFavortieState(!favoriteState);
  };

  //아이템 삭제
  let deleteBtn = () => {
    console.log("삭제 버튼을 눌렀습니다.");
    setCommonModalData({
      ...commonModalData,
      text: "삭제",
      state: true,
      id: linkInfo.id,
    });
    // //그 후 axios로 api 요청 보내야 함
    // 그건 CommonModal에서 할 것임
  };

  return (
    <>
      <div className="h-[180px] overflow-hidden flex items-center justify-center border-b border-[#ddd] relative">
        <img src={img} className="w-full" />
        {pathname.includes("favorite") ? (
          <button
            onClick={unFavotieSubmitBtn}
            className="absolute bottom-5 right-5"
          >
            <Bookmark className="stroke-[#59A5FF] hover:stroke-[#999]" />
          </button>
        ) : (
          <button
            onClick={favoriteToggle}
            className="absolute bottom-5 right-5"
          >
            {favoriteSubmitBtn()}
            {favoriteState ? (
              <Bookmark className="stroke-[#59A5FF] hover:stroke-[#999]" />
            ) : (
              <Bookmark className="stroke-[#ccc] hover:stroke-[#999]" />
            )}
          </button>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between h-[212px]">
        <div>
          <h3 className="text-xl text-black font-medium line-clamp-1 break-all">
            {title}
          </h3>
          <p className="mt-2 break-words line-clamp-2 text-[#999] break-all">
            {description}
          </p>
          <p className="mt-2 text-[#999] line-clamp-1 break-all mb-auto">
            {url}{" "}
          </p>
        </div>
        <button
          onClick={() => {
            deleteBtn();
          }}
          className="mt-4"
        >
          <Delete className="hover:fill-[#59A5FF]" />
        </button>
      </div>
    </>
  );
};

export default FeedItem;
