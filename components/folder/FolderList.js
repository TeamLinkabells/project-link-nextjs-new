import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import tw from "tailwind-styled-components";
import FolderItem from "./FolderItem";
import MovementModal from "../MovementModal";

let FolderList = (props) => {
  let { folderListArray, setFolderListArray } = props;

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  //폴더 데이터 리스트를 가져와서 folderListArray에 저장
  useEffect(() => {
    if (cookies.token !== undefined) {
      getFolderList().then((res) => {
        setFolderListArray(res.data.folderList);
      });
    }
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
        {folderListArray.map((data, index) => (
          <div key={data._id}>
            {index > 0 ? (
              <FolderItem
                folder_id={data._id}
                folder_title={data.folder_title}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default FolderList;
