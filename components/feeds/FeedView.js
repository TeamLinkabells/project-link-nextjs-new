import React, { useState } from "react";

import InputModal from "../InputModal";
import ShowModal from "../ShowModal";
import FeedList from "./FeedList";

let FeedView = (props) => {
  let {
    urlInputModal,
    setInputUrlModal,
    urlModalOpenFunc,
    urlData,
    setUrlData,
    urlShowModal,
    setUrlShowModal,
    links,
  } = props;

  const [inputData, setInputData] = useState("");

  // console.log("리스트 정보: ", links);

  let handleSubmitBtn = () => {
    setInputData;
  };

  if (urlInputModal) {
    return (
      <>
        <InputModal
          urlInputModal={urlInputModal}
          setInputUrlModal={setInputUrlModal}
          urlModalOpenFunc={urlModalOpenFunc}
          urlData={urlData}
          setUrlData={setUrlData}
          setUrlShowModal={setUrlShowModal}
        ></InputModal>
      </>
    );
  }
  if (urlShowModal) {
    return (
      <>
        <ShowModal
          urlInputModal={urlInputModal}
          setInputUrlModal={setInputUrlModal}
          urlModalOpenFunc={urlModalOpenFunc}
          urlData={urlData}
          setUrlData={setUrlData}
          setUrlShowModal={setUrlShowModal}
        ></ShowModal>
      </>
    );
  }

  return (
    <>
      <FeedList links={links}></FeedList>
    </>
  );
};
export default FeedView;
