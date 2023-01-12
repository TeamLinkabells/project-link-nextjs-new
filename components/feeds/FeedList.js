import axios from "axios";
import { useEffect, useState } from "react";
import FeedItem from "./FeedItem";

let FeedList = (props) => {
  let { links } = props;
  const [urlList, setURlList] = useState([]); //배열로 초기화

  useEffect(() => {
    setURlList(links.urlPost);
  }, []);

  return (
    <>
      {urlList.map((data) => (
        <div key={data._id}>
          <FeedItem
            img={data.item_image_url}
            title={data.item_title}
            description={data.item_description}
            url={data.item_url}
          />
        </div>
      ))}
    </>
  );
};
//문제점은 아이템으로 넘기려고 할 떄 값이 안뜸

export default FeedList;
