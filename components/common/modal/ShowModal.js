import React, { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";

import tw from "tailwind-styled-components";

import Close from "../../../public/close.svg";

//css ---------------------------------------------------------
const ModalBg = tw.div`
fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity
`;

const ModalInput = tw.input`
text-gray-500 bg-[#F1F1F5] h-[60px] w-full text-base px-4 py-2 rounded-md focus:outline-none sm:rounded-r-none border border-solid border-[#e5e7eb]
`;

const ModalSubmitBtn = tw.button`
w-full justify-center rounded-md border border-transparent bg-[#0074FF] px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none h-[60px] flex items-center mt-4 sm:m-0 sm:w-[100px]
`;

const ModalCloseBtn = tw.button`
mt-3 inline-flex justify-center rounded-md bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 w-auto sm:text-sm absolute top-[25px] right-[30px]
`;
//css ---------------------------------------------------------

function ShowModal(props) {
  let {
    urlData,
    setUrlShowModal,
    urlShowModal,
    inputModalData,
    setInputModalData,
  } = props; //url 입력을 관리하는 변수

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  //받아온 폴더 이름 정보
  const [folderInfo, setFolerInfo] = useState({
    title: urlData,
    email: cookies.token.email,
  });

  //받아온 링크 정보
  const [linkInfo, setLinkInfo] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    url: "",
    email: cookies.token.email,
  });

  useEffect(() => {
    func(linkInfo);
  }, []);

  //url-post 생성 서버 전송 함수
  let creteUrlPost = async () => {
    return await axios.post("http://localhost:3000/api/feed", linkInfo, {
      headers: {
        accessToken: cookies.token.accessToken,
      },
    });
  };

  //폴더 생성 서버 전송 함수
  let createFolder = async () => {
    return await axios.post("http://localhost:3000/api/folder/", folderInfo, {
      headers: {
        accessToken: cookies.token.accessToken,
      },
    });
  };

  let getData = () => {
    return axios.get(
      `https://api.linkpreview.net/?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${urlData}`,
      {}
    );
  };

  let func = () => {
    if (urlShowModal.text === "등록") {
      getData().then((res) => {
        if (res.status === 200) {
          // console.log("url response 데이터", res.data);
          setLinkInfo({
            ...linkInfo,
            id: res.data._id,
            title: res.data.title,
            description: res.data.description,
            image: res.data.image,
            url: res.data.url,
          });
          return;
        }
      });
    }
    if (urlShowModal.text === "생성") {
      setUrlShowModal({
        ...urlShowModal,
        state: "false",
      });
      //여기에서 folderInfo에 담긴 값을 axios로 보내줄것임
      createFolder().then((res) => {
        // console.log("folder response", res.data);
        if (res.data.status) {
          alert(res.data.message);
        } else {
          //에러 메시지를 보여주고
          // console.log("에러", res);
          alert(res.data.message);
          //input의 모든 데이터를 없앰
          setFolerInfo({
            ...folderInfo,
            title: "",
          });
        }
        router.reload();
      });
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
        <ModalBg></ModalBg>

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
                      링크 정보
                    </h3>
                    <div className="mt-5 sm:flex h-[300px] rounded-md overflow-hidden border border-[#ddd]">
                      <img
                        src={linkInfo.image}
                        className="w-full object-cover"
                      ></img>
                    </div>
                    <div className="mt-5 sm:flex bg-[#f1f1f5] rounded-md flex items-start p-4 text-[#666]">
                      <h3 className="w-full break-all">{linkInfo.title}</h3>
                    </div>
                    <div className="mt-5 sm:flex h-[120px] bg-[#f1f1f5] rounded-md flex items-start p-4 text-[#666] overflow-y-auto">
                      <p className="w-full break-all">{linkInfo.description}</p>
                    </div>
                    <div className="flex justify-end gap-5 mt-5">
                      <ModalSubmitBtn
                        type="button"
                        className="bg-white border-[#ddd] text-[#999] rounded-l-unset"
                        onClick={() => {
                          // func(linkInfo);
                        }}
                      >
                        이전
                      </ModalSubmitBtn>
                      <ModalSubmitBtn
                        type="button"
                        onClick={() => {
                          creteUrlPost()
                            .then((res) => {
                              // console.log(res);
                              if (res.data.status) {
                                alert(res.data.message);
                                setUrlShowModal({
                                  ...urlShowModal,
                                  state: "false",
                                });
                                router.push(`/feed/${cookies.token.id}`);
                              }
                            })
                            .catch((err) => {
                              // console.log(err);
                            });
                        }}
                      >
                        등록
                      </ModalSubmitBtn>
                    </div>
                  </div>
                </div>
              </div>
              <ModalCloseBtn
                type="button"
                onClick={() => {
                  setUrlShowModal({
                    ...urlShowModal,
                    state: "false",
                  });
                }}
              >
                <Close />
              </ModalCloseBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowModal;
