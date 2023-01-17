import React, { useState } from "react";

import InputModal from "../InputModal";
import ShowModal from "../ShowModal";
import FeedList from "./FeedList";

let FeedView = (props) => {
  let { links , commonModalData, setCommonModalData } = props;

  // console.log("피드뷰 props", props)

  const [inputData, setInputData] = useState("");

  let handleSubmitBtn = () => {
    setInputData;
  };

  // if (urlInputModal) {
  //   return (
  //     <>
  //       <InputModal
  //         urlInputModal={urlInputModal}
  //         setInputUrlModal={setInputUrlModal}
  //         urlModalOpenFunc={urlModalOpenFunc}
  //         urlData={urlData}
  //         setUrlData={setUrlData}
  //         setUrlShowModal={setUrlShowModal}
  //       ></InputModal>
  //     </>
  //   );
  // }
  // if (urlShowModal) {
  //   return (
  //     <>
  //       <ShowModal
  //         urlInputModal={urlInputModal}
  //         setInputUrlModal={setInputUrlModal}
  //         urlModalOpenFunc={urlModalOpenFunc}
  //         urlData={urlData}
  //         setUrlData={setUrlData}
  //         setUrlShowModal={setUrlShowModal}
  //       ></ShowModal>
  //     </>
  //   );
  // }

  return (
    <>
      <FeedList links={links} commonModalData={commonModalData} setCommonModalData={setCommonModalData} ></FeedList>
    </>
  );
};
export default FeedView;
