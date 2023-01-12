import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";

import FeedList from "../components/feeds/FeedView";
import FeedLayout from "../components/FeedLayout";

import tw from "tailwind-styled-components";
import FeedView from "../components/feeds/FeedView";

let Feed = ({ links }) => {
  const [urlData, setUrlData] = useState(""); //url 입력 데이터

  const [urlInputModal, setInputUrlModal] = useState(false); //모달인풋데이터
  const [urlShowModal, setUrlShowModal] = useState(false); //모달쇼

  const urlModalOpenFunc = () => {
    setInputUrlModal(!urlInputModal);
  };

  // console.log("getInitialProps : ", links.urlPost);

  return (
    <>
      <FeedLayout
        urlInputModal={urlInputModal}
        setInputUrlModal={setInputUrlModal}
        urlModalOpenFunc={urlModalOpenFunc}
      >
        <section className="text-gray-600 mx-auto px-20 py-5 flex gap-5 flex-wrap align-top justify-start">
            <FeedView
              urlInputModal={urlInputModal}
              setInputUrlModal={setInputUrlModal}
              urlModalOpenFunc={urlModalOpenFunc}
              urlData={urlData}
              setUrlData={setUrlData}
              urlShowModal={urlShowModal}
              setUrlShowModal={setUrlShowModal}
              links={links}
            />
        </section>
      </FeedLayout>
      {/* ---------------------원래 피드----------------------- */}
    </>
  );
};

Feed.getInitialProps = async () => {
  const res = await axios.get("http://localhost:3000/api/links/feed");
  const data = res.data;

  return {
    links: data,
  };
};

export default Feed;
