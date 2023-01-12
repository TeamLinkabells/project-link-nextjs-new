import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

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
        <img src={img}></img>
        <h3>제목 : {title}</h3>
        <p>설명 : {description}</p>
        <p>링크 : {url} </p>
      </div>
    </>
  );
};

export default FeedItem;
