import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import Delete from "../../public/delete.svg";
import Movement from "../../public/movement.svg";
import Bookmark from "../../public/bookmark.svg";
import BookmarkOn from "../../public/bookmark_on.svg";
import UrlModal from "../common/modal/UrlModal";
import DefaultImg from "../../public/defaultimg.svg";

let FeedItem = (props) => {
  let {
    img,
    title,
    description,
    url,
    favorites,
    commonModalData,
    setCommonModalData,
    moveModalData,
    setMoveModalData,
  } = props;

  const router = useRouter();

  const id = router.query.id || ["로딩중"];
  const pathname = router.pathname;

  const [showUrlModal, setShowUrlModal] = useState(false);
  const [favoriteState, setFavortieState] = useState(false);
  const [count, setCount] = useState(0);

  //페이지가 처음 렌더링 될 때 favorites의 값을 받아서 변수에 넣어줘야 함
  useEffect(() => {
    // console.log("서버에서 받아온 값", favorites);
    setFavortieState(favorites);
  }, []);

  useEffect(() => {
    if (count > 0) {
      console.log("useEffect 실행된다");
      if (favoriteState === true) {
        favoriteData();
      } else {
        unFavotieSubmitBtn();
      }
    }
  }, [favoriteState]);

  const [linkInfo, setLinkInfo] = useState({
    id: props.id,
    title: props.title,
    description: props.description,
    img: props.img,
    url: props.url,
  });

  // ==========================================================================
  let favoriteData = () => {
    // console.log("전송되었습니다.");
    return axios.post(`http://localhost:3000/api/favorite`, linkInfo);
  };

  let unFavoriteData = () => {
    return axios.post(`http://localhost:3000/api/favorite/uncheck`, linkInfo);
  };

  let unFavotieSubmitBtn = () => {
    alert("즐겨찾기를 해제하시겠습니까?");
    unFavoriteData().then((res) => console.log(res));
    if (pathname.includes("favorite")) {
      router.reload();
    }
  };

  let showUrlBtn = () => {};

  // 아이템 삭제
  let deleteBtn = () => {
    // console.log("삭제 버튼을 눌렀습니다.");
    setCommonModalData({
      ...commonModalData,
      text: "삭제",
      state: true,
      id: linkInfo.id,
    });
    // //그 후 axios로 api 요청 보내야 함
    // 그건 CommonModal에서 할 것
  };

  // 폴더 이동
  let movementBtn = () => {
    setMoveModalData({
      ...moveModalData,
      id: linkInfo.id,
      state: true,
    });
    // console.log("이동 모달", moveModalData);
  };

  return (
    <>
      <div className="h-[180px] overflow-hidden flex items-center justify-center border-b border-[#ddd] relative">
        {img != "" ? (
          <img src={img} className="w-full" />
        ) : (
          <DefaultImg className="w-full" />
        )}
        {/* // <img src={img} className="w-full" /> */}
        {pathname.includes("favorite") ? (
          <button
            onClick={unFavotieSubmitBtn}
            className="absolute bottom-5 right-5"
          >
            {/* <Bookmark className="stroke-[#59A5FF] hover:stroke-[#999]" /> */}
            <BookmarkOn />
          </button>
        ) : (
          <button
            onClick={() => {
              setFavortieState(!favoriteState);
              setCount(count + 1);
            }}
            className="absolute bottom-5 right-5"
          >
            {favoriteState ? (
              <BookmarkOn />
            ) : (
              <Bookmark className="stroke-[#ccc] hover:stroke-[#999]" />
            )}
          </button>
        )}
      </div>
      {/* <Link href={url} target="blank"> */}
      <div
        onClick={() => {
          setShowUrlModal(true);
          console.log("바꿨습니다.");
        }}
      >
        <div className="p-5 flex flex-col justify-between h-[156px]">
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
      </div>
      {showUrlModal ? (
        <UrlModal
          showUrlModal={showUrlModal}
          setShowUrlModal={setShowUrlModal}
          url={url}
        />
      ) : (
        ""
      )}
      {/* </Link> */}
      <div className="flex items-center justify-between px-5 pb-5">
        <button
          onClick={() => {
            deleteBtn();
          }}
        >
          <Delete className="hover:fill-[#59A5FF]" />
        </button>
        <button
          onClick={() => {
            movementBtn();
          }}
        >
          <Movement />
        </button>
      </div>
    </>
  );
};

export default FeedItem;
