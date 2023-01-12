import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import Delete from "../../public/delete.svg"

// import tw from "tailwind-styled-components"

//하나씩 또 저장해줘야 함

let FeedItem = (props) => {
  let { img, title, description, url } = props;
  const [linkInfo, setLinkInfo] = useState({
    title: "",
    description: "",
    img: "",
    url: "",
  });

  console.log("값", img);

  let getData = () => {
    return axios.get(
      `https://api.linkpreview.net/?key=2e31fedc1f9e62e652e94bc6756c5606&q=${urlData}`,
      {}
    );
  };

  let func = () => {
    getData().then((res) => {
      if (res.status === 200) {
        setLinkInfo({
          ...linkInfo,
          title: res.data.title,
          description: res.data.description,
          image: res.data.image,
          url: res.data.url,
        });
        return;
      }
    });
  };

  return (
    <>
      <div>
        <div className="h-[200px] overflow-hidden flex items-center justify-center border-b border-[#ddd]">
          <img src={img} className="w-full"></img>
        </div>
        <div className="p-5">
          <h3 className="text-xl text-black font-medium line-clamp-1 break-all">{title}</h3>
          <p className="mt-2 break-words line-clamp-2 text-[#999] break-all">{description}</p>
          <p className="mt-2 text-[#999] line-clamp-1 break-all">{url} </p>
          <button><Delete className="mt-4 hover:fill-[#59A5FF]" /></button>
        </div>
      </div>
    </>
  );
};

export default FeedItem;
