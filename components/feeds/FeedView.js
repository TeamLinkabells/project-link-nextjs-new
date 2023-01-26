import React, { useState } from "react";

import InputModal from "../common/modal/InputModal";
import ShowModal from "../common/modal/ShowModal";
import FeedList from "./FeedList";

let FeedView = (props) => {
  let {
    links,
    commonModalData,
    setCommonModalData,
    moveModalData,
    setMoveModalData,
  } = props;

  // console.log("피드뷰 props", props)

  const [inputData, setInputData] = useState("");

  return (
    <>
      <FeedList
        links={links}
        commonModalData={commonModalData}
        setCommonModalData={setCommonModalData}
        moveModalData={moveModalData}
        setMoveModalData={setMoveModalData}
      ></FeedList>
    </>
  );
};
export default FeedView;
