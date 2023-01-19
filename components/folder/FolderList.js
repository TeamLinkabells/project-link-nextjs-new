import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import tw from "tailwind-styled-components";
import FolderItem from "./FolderItem";

const ListContainer = tw.div`
  w-[280px]
  border-[1px]
  border-[#ddd]
  rounded-lg 
  overflow-hidden
  hover:bg-[#F2F7FF]
  inli
  `;

let FolderList = () => {
  const [folderList, setFolerList] = useState([]); //배열로 초기화
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    getFolderList().then((res) => {
      // console.log("폴더리스트", res.data);
      setFolerList(res.data.folderList);
    });
  }, []);

  //폴더 리스트를 가져오는 함수
  let getFolderList = () => {
    return axios.get(
      `http://localhost:3000/api/folder/${cookies.token.id}`,
      {}
    );
  };

  return (
    <>
      <div>
        {folderList.map((data) => (
          <ListContainer key={data._id}>
            <FolderItem id={data._id} folder_title={data.folder_title} />
          </ListContainer>
        ))}
      </div>
    </>
  );
};
export default FolderList;
