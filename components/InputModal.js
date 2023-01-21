import React, { useEffect } from "react";
import { useState } from "react";

import Close from "../public/close.svg";
import tw from "tailwind-styled-components";

//css ---------------------------------------------------------
const ModalBg = tw.div`
fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity
`;

const ModalInput = tw.input`
text-gray-500 bg-[#F1F1F5] h-[60px] w-full text-base px-4 py-2 rounded-md focus:outline-none sm:rounded-r-none border border-solid border-[#e5e7eb]
`;

const ModalSubmitBtn = tw.button`
w-full justify-center rounded-md border border-transparent bg-[#0074FF] px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none h-[60px] flex items-center mt-4 sm:m-0 sm:w-[100px] sm:rounded-l-none
`;

const ModalCloseBtn = tw.button`
mt-3 inline-flex justify-center rounded-md bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 w-auto sm:text-sm absolute top-[25px] right-[30px]
`;
//css ---------------------------------------------------------

function InputModal(props) {
  let {
    urlData,
    setUrlData,
    setUrlShowModal,
    inputToggleFunc,
    inputModalData,
    urlShowModal,
  } = props; //url 입력을 관리하는 변수

  const [inputData, setInputData] = useState("");

  let checkInputFunc = () => {
    //공통
    if (inputData === "") {
      alert("내용을 입력해주세요");
    } else {
      //링크
      if (inputModalData.btnName === "등록") {
        let regexWeb = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
        let correctUrl = regexWeb.test(inputData);

        if (correctUrl === true) {
          setUrlData(inputData);
          inputToggleFunc();
          setUrlShowModal({
            ...urlShowModal,
            text: inputModalData.btnName,
            state: true,
          });
        } else if (correctUrl === false) {
          alert("올바른 형식의 url을 입력해주세요");
          setInputData("");
        }
      }

      //생성
      if (inputModalData.btnName === "생성") {
        setUrlData(inputData);
        inputToggleFunc();
        setUrlShowModal({
          ...urlShowModal,
          text: inputModalData.btnName,
          state: true,
        });
      }
    }
  };

  return (
    <>
      <div
        className="relative z-40"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <ModalBg className=""></ModalBg>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-[30px] pt-6 pb-[30px]">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left sm:w-full">
                    <h3
                      className="text-lg leading-6 text-gray-900 font-medium flex"
                      id="modal-title"
                    >
                      {inputModalData.title}
                    </h3>
                    <div className="mt-5 sm:flex">
                      <ModalInput
                        type="text"
                        name="contents"
                        value={inputData}
                        placeholder={inputModalData.placeholer}
                        onChange={(e) => {
                          {
                            setInputData(e.target.value);
                          }
                        }}
                      />
                      <ModalSubmitBtn
                        type="button"
                        onClick={() => {
                          checkInputFunc(); //1
                        }}
                      >
                        {inputModalData.btnName}
                      </ModalSubmitBtn>
                    </div>
                  </div>
                </div>
              </div>
              <ModalCloseBtn type="button" onClick={inputToggleFunc}>
                <Close />
              </ModalCloseBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InputModal;
