import axios from "axios";
import { useEffect, useState } from "react";
import FeedItem from "./FeedItem";

import ArrowDown from '../../public/arrow_down.svg'

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
const SelectBoxBtn = tw.button`
  flex 
  items-center 
  justify-center 
  text-[#666] 
  hover:border-[#999] 
  duration-200
`
const SelectListContainer = tw.ul`
  w-[120px] 
  shadow-[0_10px_20px_5px_rgba(0,0,0,0.08)] 
  rounded-lg 
  overflow-hidden 
  mt-2 
  p-2 
  absolute 
  top-6 
  left-0 
  z-10 
  bg-white
`
const SelectList = tw.ul`
  h-10 
  flex 
  items-center 
  hover:bg-[#f1f1f1] 
  py-2 
  px-2 
  rounded-md 
  text-[#999]
`

let FeedList = (props) => {
  let { links, commonModalData, setCommonModalData } = props;
  const [postList, setPostList] = useState([]); //배열로 초기화

  useEffect(() => {
    setPostList(links.postList);
  });


  return (
    <>
      {/* 정렬 start */}
      <div className="relative mt-10">
        <SelectBoxBtn>최신순<ArrowDown className="ml-2" /></SelectBoxBtn>
        <SelectListContainer>
          <SelectList>최신순</SelectList>
          <SelectList>이름순</SelectList>
        </SelectListContainer>
      </div>
      {/* 정렬 end */}
      <div className="flex flex-wrap gap-5 relative mt-8">
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
