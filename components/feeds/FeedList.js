import axios from "axios";
import { useEffect, useState } from "react";
import FeedItem from "./FeedItem";

import tw from "tailwind-styled-components"

// css 추가
const ListContainer = tw.div`
  w-full
  sm:w-[calc(50%-10px)] 
  lg:w-[calc(100%/3-40px/3)]
  xl:w-[calc(25%-15px)]  
  2xl:w-[calc(20%-16px)] 
  h-fit
  border-[1px]
  border-[#ddd]
  rounded-lg 
  overflow-hidden
  hover:bg-[#F2F7FF]
  inline-block
`

let FeedList = (props) => {
  let { links } = props;
  const [urlList, setURlList] = useState([]); //배열로 초기화

  useEffect(() => {
    setURlList(links.urlPost);
  }, []);

  return (
    <>
      {urlList.map((data) => (
        <ListContainer key={data._id}>
          <FeedItem
            img={data.item_image_url}
            title={data.item_title}
            description={data.item_description}
            url={data.item_url}
          />
        </ListContainer>
      ))}
    </>
  );
};
//문제점은 아이템으로 넘기려고 할 떄 값이 안뜸

export default FeedList;
