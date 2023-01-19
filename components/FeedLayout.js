import { useState } from "react";
import SideNavBar from "./feeds/SideNavBar";
import Header from "./Header";
import InputModal from "./InputModal";
import ShowModal from "./ShowModal";
import CommonModal from "./feeds/CommonModal";
import React from "react";

let FeedLayout = (props) => {
  const { children, setUrlData, urlData } = props;

  // const [urlInputModal, setUrlInputModal] = useState(false);    =>사용 inputModalData 변수로 대체
  const [urlShowModal, setUrlShowModal] = useState({
    text: "",
    state: false,
  });
  const [commonModalData, setCommonModalData] = useState({
    text: "",
    state: false,
  });
  const [searchData, setSeacrhData] = useState("");
  const [inputModalData, setInputModalData] = useState({
    title: "",
    btnName: "",
    placeholer : "",
    state: false,
  });

  //url 인풋 모달 토글 함수
  let inputToggleFunc = () => {
    setInputModalData({
      ...inputModalData,
      state: false,
    });
  };

  // console.log("피드 레이아웃", props.children);

  return (
    <>
      {/* URL input 모달 */}
      {inputModalData.state === true ? (
        <InputModal
          setUrlData={setUrlData}
          setUrlShowModal={setUrlShowModal}
          inputToggleFunc={inputToggleFunc}
          inputModalData={inputModalData}
          urlShowModal={urlShowModal}
        ></InputModal>
      ) : (
        ""
      )}
      {/* URL show 모달 */}
      {urlShowModal.state === true ? (
        <ShowModal
          urlData={urlData}
          setUrlData={setUrlData}
          urlShowModal={urlShowModal}
          setUrlShowModal={setUrlShowModal}
        ></ShowModal>
      ) : (
        ""
      )}
      {/* 로그아웃 모달 */}
      {commonModalData.state === true ? (
        <CommonModal
          commonModalData={commonModalData}
          setCommonModalData={setCommonModalData}
        ></CommonModal>
      ) : (
        ""
      )}

      {/* 기본 Side-Navbar & Header */}
      <div className="flex">
        <SideNavBar
          inputToggleFunc={inputToggleFunc}
          commonModalData={commonModalData}
          setCommonModalData={setCommonModalData}
          inputModalData={inputModalData}
          setInputModalData={setInputModalData}
        ></SideNavBar>
        <div className="w-[100%]">
          <Header searchData={searchData} setSeacrhData={setSeacrhData} />
          {React.cloneElement(children, {
            commonModalData,
            setCommonModalData,
          })}
        </div>
      </div>
    </>
  );
};
export default FeedLayout;
