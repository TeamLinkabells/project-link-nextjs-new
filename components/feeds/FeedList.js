import axios from "axios";
import { useEffect, useState } from "react";
import FeedItem from "./FeedItem";

import tw from "tailwind-styled-components";

// css 추가
const ListContainer = tw.div`
  w-[280px]
  border-[1px]
  border-[#ddd]
  rounded-lg 
  overflow-hidden
  hover:bg-[#F2F7FF]
  inline-block
`;

let FeedList = (props) => {
  let { links, commonModalData, setCommonModalData } = props;
  const [postList, setPostList] = useState([]); //배열로 초기화

  useEffect(() => {
    setPostList(links.postList);
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-5 relative">
        {postList.map((data) => (
          <ListContainer key={data._id}>
            <FeedItem
              id={data._id}
              img={data.item_image_url}
              title={data.item_title}
              description={data.item_description}
              url={data.item_url}
              commonModalData={commonModalData}
              setCommonModalData={setCommonModalData}
            />
          </ListContainer>
        ))}
      </div>
    </>
  );
};
//문제점은 아이템으로 넘기려고 할 떄 값이 안뜸

export default FeedList;
