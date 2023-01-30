import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

import tw from "tailwind-styled-components";

const ListContainer = tw.div`
h-10 
flex 
items-center 
text-[#666666] 
hover:bg-[#f1f1f1]
px-6
justify-between
bg-no-repeat
bg-[center_right_24px]
hover:bg-[url('../public/remove.svg')]
  `;

let FolderItem = (props) => {
  let { folder_id, folder_title, user_id } = props;

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [folderItemInfo, setFolderIteminfo] = useState({
    user_id: user_id,
    folder_id: folder_id,
    folder_title: folder_title,
  });

  let clickFolderFunc = () => {
    router.push(`/feed/folder/${user_id}/${folder_title}`);
  };

  let folderDelete = async () => {
    return await axios.delete(
      "http://localhost:3000/api/folder/move",
      {
        data: {
          folderItemInfo,
        },
      },
      {
        headers: {
          accessToken: cookies.token.accessToken,
        },
      }
    );
  };

  return (
    <>
      <div>
        <ListContainer>
          <button onClick={clickFolderFunc}>
            <h3>{folderItemInfo.folder_title}</h3>
          </button>
          <button
            onClick={() => {
              folderDelete().then((res) => {
                // console.log("folder response", res.data);
                if (res.data.status) {
                  // alert(res.data.message);
                } else {
                  //에러 메시지를 보여주고
                  alert(res.data.message);
                }
                router.reload();
              });
            }}
            className="text-transparent"
          >
            버튼
          </button>
        </ListContainer>
      </div>
    </>
  );
};
export default FolderItem;
