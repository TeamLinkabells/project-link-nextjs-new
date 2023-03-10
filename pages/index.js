import Link from "next/link";
import Logo from "../public/logo.svg";
import ScrollArrow from "../public/scroll_arrow.svg"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import tw from "tailwind-styled-components";

const Highlight = tw.span`
  font-bold relative before:content-[''] before:w-full before:h-[10px] before:bg-[#69E5AA] before:absolute before:bottom-0 before:left-0 before:block before:-z-10
`
const UsageBox = tw.div`
  w-full md:w-[calc(50%-20px)] h-[440px] sm:h-[580px] md:h-[500px] lg:h-[560px] bg-white rounded-xl shadow-lg overflow-hidden
`
const UsageText = tw.h3`
  text-2xl lg:text-3xl lg:leading-normal p-10 relative z-0
`

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();
  const id = router.query.id;

  //처음 렌더링이 되었을 경우, 쿠키의 값을 확인,
  // 만약 쿠키가 비워져있지 않다면 (즉, 로그인 되어있는 상태)
  //피드 전체 목록 페이지로 이동시킴
  useEffect(() => {
    if (cookies.token !== undefined) {
      router.push(`/feed/${cookies.token.id}`);
    }
  });

  //로그인이 되어있지 않을 때
  return (
    <>
      <section className="bg-[#0074FF] h-screen mx-auto flex items-center justify-center relative">
        <div className="max-w-[1200px] w-[90%] flex px-5 py-24 items-center justify-center flex-col">
          <div className="mb-10">
            <Logo className="w-[300px] sm:w-[400px] md:w-[500px]"/>
          </div>
          <p className="mb-12 leading-relaxed text-white text-xl sm:text-2xl">
            나만의 링크 저장소, 링커벨
          </p>
          <div className="flex justify-center">
            <button
              className="flex text-[#0074FF] bg-white border-0 focus:outline-none rounded text-lg h-[70px] sm:h-[80px]
             w-[300px] sm:w-[360px] items-center justify-center drop-shadow-2xl"
              // onClick={() => router.push("/login")}
            >
              <Link
                href="/login"
                className="py-2 px-6 flex items-center justify-center w-full h-full text-lg sm:text-xl font-medium"
              >
                로그인 페이지로 이동하기
              </Link>
            </button>
          </div>
          <div className="absolute bottom-10 animate-bounce w-4 h-4 sm:w-6 sm:h-6">
            <ScrollArrow />
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-[1200px] w-[90%] py-20 lg:py-[150px] m-auto">
          {/* <div>
            <video src="/videos/test.mp4" loop autoPlay muted className="w-[800px] h-[500px] "/>
          </div> */}
          <div className="flex justify-center sm:justify-between items-end relative gap-0 sm:gap-10">
            <video src="/videos/main_pc.mp4" loop autoPlay muted playsInline className="w-[calc(82%-20px)] hidden sm:flex rounded-xl border border-[#ddd]"/>
            <video src="/videos/main_mob.mp4" loop autoPlay muted playsInline className="flex max-w-[240px] w-full justify-center sm:w-[calc(18%-20px)]"/>
          </div>
        </div>
        <div className="bg-[#f7f7f7] w-full">
          <div className="max-w-[1200px] w-[90%] m-auto py-20 lg:py-[150px] flex flex-wrap gap-10">
            <UsageBox>
              <UsageText>즐겨 찾는 링크는 <Highlight>북마크</Highlight>로<br />따로 보관하고 관리해 보세요.</UsageText>
              <div className="w-full">
                <video src="/videos/fav.mp4" loop autoPlay muted playsInline />
              </div>
            </UsageBox>
            <UsageBox>
              <UsageText>나만의 폴더를 생성하여<br />링크를 <Highlight>폴더별로 저장</Highlight>하세요.</UsageText>
              <div className="w-full">
                <video src="/videos/folder.mp4" loop autoPlay muted playsInline />
              </div>
            </UsageBox>
            <UsageBox>
              <UsageText>링크의 제목 또는 내용을<br /><Highlight>검색창</Highlight>에 입력해 찾아보세요.</UsageText>
              <div className="w-full">
                <video src="/videos/search.mp4" loop autoPlay muted playsInline />
              </div>
            </UsageBox>
            <UsageBox>
              <UsageText>원하시는 링크를 클릭하여<br /><Highlight>복사 또는 이동</Highlight>해 보세요.</UsageText>
              <div className="w-full">
                <video src="/videos/copy.mp4" loop autoPlay muted playsInline />
              </div>
            </UsageBox>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
