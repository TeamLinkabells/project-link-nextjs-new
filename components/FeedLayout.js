import { useState } from "react";
import SideNavBar from "./feeds/SideNavBar";
import Header from "./Header";
import InputModal from "./InputModal";
import ShowModal from "./ShowModal";
import CommonModal from "./feeds/CommonModal";
import React from "react";

let FeedLayout = (props) => {
  const { children, setUrlData, urlData } = props;

  const [urlInputModal, setUrlInputModal] = useState(false);
  const [urlShowModal, setUrlShowModal] = useState(false);
  const [commonModalData, setCommonModalData] = useState({
    text: "",
    state: false,
  });
  const [searchData, setSeacrhData] = useState("");

  //url 인풋 모달 토글 함수
  let inputToggleFunc = () => {
    setUrlInputModal(!urlInputModal);
  };

  // console.log("피드 레이아웃", props.children);

  return (
    <>
      {/* URL input 모달 */}
      {urlInputModal ? (
        <InputModal
          urlInputModal={urlInputModal}
          setUrlInputModal={setUrlInputModal}
          inputToggleFunc={inputToggleFunc}
          urlData={urlData}
          setUrlData={setUrlData}
          setUrlShowModal={setUrlShowModal}
        ></InputModal>
      ) : (
        ""
      )}
      {/* URL show 모달 */}
      {urlShowModal ? (
        <ShowModal
          urlInputModal={urlInputModal}
          setUrlInputModal={setUrlInputModal}
          inputToggleFunc={inputToggleFunc}
          urlData={urlData}
          setUrlData={setUrlData}
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
