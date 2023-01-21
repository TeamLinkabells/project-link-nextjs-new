import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import ColorLogo from "../public/logo_color.svg";
import tw from "tailwind-styled-components";

const Logodiv = tw.div`
m-auto mb-[50px]
`;

const InputDiv = tw.div`
relative mb-5
`;

const InputBox = tw.input`
w-full bg-white rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-4 leading-8 transition-colors duration-200 ease-in-out h-[60px] bg-[#F1F1F5]
`;

export default function SignUp() {
  const router = useRouter();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  let handleInput = (e) => {
    // console.log(e.target.value),
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // 회원가입 버튼을 클릭 했을때, 유효성 검사 후,
  // axios를 사용해서 서버에 요청!
  let clickSignUpBtn = async () => {
    let regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    let regPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let correctEmail = regExp.test(signUpData.email);
    let correctPassword = regPwd.test(signUpData.password);

    if (signUpData.email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (correctEmail === false) {
      alert("이메일 형식을 확인해주세요");
      return;
    }

    if (signUpData.password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (correctPassword === false) {
      alert("최소 8 자, 최소 하나의 문자 및 하나의 숫자를 포함해 주세요");
      return;
    }

    if (signUpData.confirmPassword === "") {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (signUpData.name === "") {
      alert("이름을 입력해주세요.");
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    //실질적인 axios요청,
    return await axios.post(
      "http://localhost:3000/api/auth/signup",
      signUpData
    );
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="lg:w-2/6 md:w-1/2 y-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
            <Logodiv>
              <Link href="/">
                <ColorLogo width="300" height="54" viewBox="0 0 300 60" />
              </Link>
            </Logodiv>
            <form>
              <InputDiv>
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  이메일
                </label>
                <InputBox
                  type="email"
                  id="email"
                  name="email"
                  value={signUpData.email}
                  placeholder="이메일을 입력해 주세요."
                  onChange={handleInput}
                  required
                ></InputBox>
              </InputDiv>
              <InputDiv>
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  비밀번호
                </label>
                <InputBox
                  type="password"
                  id="password"
                  name="password"
                  value={signUpData.password}
                  placeholder="비밀번호를 입력해 주세요."
                  autoComplete="new-password"
                  onChange={handleInput}
                ></InputBox>
              </InputDiv>
              <InputDiv>
                <label
                  htmlFor="confirmPassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  비밀번호 확인
                </label>
                <InputBox
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signUpData.confirmPassword}
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  onChange={handleInput}
                ></InputBox>
              </InputDiv>
              <InputDiv>
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  이름
                </label>
                <InputBox
                  type="text"
                  id="name"
                  name="name"
                  value={signUpData.name}
                  placeholder="이름을 입력해 주세요."
                  onChange={handleInput}
                ></InputBox>
              </InputDiv>
              <div className="mb-3">
                <p className="text-danger">{errorMsg}</p>
              </div>
              <button
                type="button"
                className="text-white bg-[#0074FF] border-0 py-2 px-8 rounded text-lg h-[60px] w-full mt-8"
                onClick={() => {
                  clickSignUpBtn()
                    .then((res) => {
                      console.log("리스폰스", res.data);
                      if (res.data.status) {
                        alert(res.data.message);
                        router.push("/");
                      } else {
                        //에러 메시지를 보여주고
                        setErrorMsg(res.data.message);
                        //input의 모든 데이터를 없앰
                        setSignUpData({
                          email: "",
                          password: "",
                          confirmPassword: "",
                          name: "",
                        });
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              >
                가입하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
