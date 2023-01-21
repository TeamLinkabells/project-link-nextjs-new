import { useState } from "react";
import SideNavBar from "./feeds/SideNavBar";
import Header from "./Header";
import InputModal from "./InputModal";
import ShowModal from "./ShowModal";
import CommonModal from "./feeds/CommonModal";
import MovementModal from "./MovementModal";
import SettingModal from "./SettingModal";
import React from "react";

let FeedLayout = (props) => {
  const { children, setUrlData, urlData } = props;

  const [folderListArray, setFolderListArray] = useState([]); // 폴더 관련 Array
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
    placeholer: "",
    state: false,
  });
  const [settingModalData, setSettingModalData] = useState(false);
  const [moveModalData, setMoveModalData] = useState({
    id: "",
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
          urlData={urlData}
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
          inputModalData={inputModalData}
          setInputModalData={setInputModalData}
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
      {/* 폴더이동 모달 */}
      {moveModalData.state === true ? (
        <MovementModal
          moveModalData={moveModalData}
          setMoveModalData={setMoveModalData}
          folderListArray={folderListArray}
          setFolderListArray={setFolderListArray}
        ></MovementModal>
      ) : (
        ""
      )}
      {/* 세팅 모달 */}
      {settingModalData === true ? (
        <SettingModal
          commonModalData={commonModalData}
          setCommonModalData={setCommonModalData}
          settingModalData={settingModalData}
          setSettingModalData={setSettingModalData}
        ></SettingModal>
      ) : (
        ""
      )}
      {/* 기본 Side-Navbar & Header */}
      <div className="flex">
        <SideNavBar
          urlData={urlData}
          folderListArray={folderListArray}
          setFolderListArray={setFolderListArray}
          commonModalData={commonModalData}
          setCommonModalData={setCommonModalData}
          inputModalData={inputModalData}
          setInputModalData={setInputModalData}
          settingModalData={settingModalData}
          setSettingModalData={setSettingModalData}
        ></SideNavBar>
        <div className="w-[100%]">
          <Header searchData={searchData} setSeacrhData={setSeacrhData} />
          {React.cloneElement(children, {
            commonModalData,
            setCommonModalData,
            moveModalData,
            setMoveModalData,
          })}
        </div>
      </div>
    </>
  );
};
export default FeedLayout;
