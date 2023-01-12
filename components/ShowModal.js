import React, { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

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
w-full justify-center rounded-md border border-transparent bg-[#0074FF] px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none h-[60px] flex items-center mt-4 sm:m-0 sm:w-[100px]
`;

const ModalCloseBtn = tw.button`
mt-3 inline-flex justify-center rounded-md bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 w-auto sm:text-sm absolute top-[25px] right-[30px]
`;
//css ---------------------------------------------------------

function ShowModal(props) {
  let { urlModalOpenFunc, urlData, setUrlData, setUrlShowModal } = props; //url 입력을 관리하는 변수

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  //받아온 링크 정보
  const [linkInfo, setLinkInfo] = useState({
    title: "",
    description: "",
    image: "",
    url: "",
    email: cookies.token.email,
  });

  useEffect(() => {
    func(linkInfo);
  }, []);

  let creteUrlPost = async () => {
    return await axios.post("http://localhost:3000/api/links/feed", linkInfo, {
      headers: {
        accessToken: cookies.token.accessToken,
      },
    });
  };

  let getData = () => {
    return axios.get(
      `https://api.linkpreview.net/?key=2e31fedc1f9e62e652e94bc6756c5606&q=${urlData}`,
      {}
    );
  };

  let func = () => {
    getData().then((res) => {
      if (res.status === 200) {
        console.log("리스폰스 데이터", res.data)
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
      <div
        className="relative z-10"
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
                      링크 정보
                    </h3>
                    <div className="mt-5 sm:flex h-[300px] rounded-md overflow-hidden border border-[#ddd]">
                      <img
                        src={linkInfo.image}
                        className="w-full object-cover"
                      ></img>
                    </div>
                    <div className="mt-5 sm:flex h-[60px] bg-[#f1f1f5] rounded-md flex items-center px-4 text-[#666]">
                      <h3>{linkInfo.title}</h3>
                    </div>
                    <div className="mt-5 sm:flex h-[120px] bg-[#f1f1f5] rounded-md flex items-start p-4 text-[#666]">
                      <p>{linkInfo.description}</p>
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
                              console.log(res);
                              if (res.data.status) {
                                alert(res.data.message);
                                window.location.reload();
                              }
                            })
                            .catch((err) => {
                              console.log(err);
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
                  setUrlShowModal(false);
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
