import Link from "next/link";
import Logo from "../public/logo.svg";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();
  const id = router.query.id;

  //처음 렌더링이 되었을 경우, 쿠키의 값을 확인,
  // 만약 쿠키가 비워져있지 않다면 (즉, 로그인 되어있는 상태)
  //피드 전체 목록 페이지로 이동시킴
  useEffect(() => {
    console.log(cookies);
    if (cookies.token !== undefined) {
      router.push(`/feed/${cookies.token.id}`);
    }
  }, []);

  //로그인이 되어있지 않을 때
  return (
    <>
      <section>
        <div className="mx-auto flex px-5 py-24 items-center justify-center flex-col bg-[#0074FF] h-screen">
          <div className="mb-10">
            <Logo />
          </div>

          <p className="mb-12 leading-relaxed text-white text-2xl">
            나만의 링크 저장소, 링커벨
          </p>
          <div className="flex justify-center">
            <button
              className="flex text-[#0074FF] bg-white border-0 focus:outline-none rounded text-lg h-[80px]
             w-[360px] items-center justify-center drop-shadow-2xl"
              // onClick={() => router.push("/login")}
            >
              <Link
                href="/login"
                className="py-2 px-6 flex items-center justify-center w-full h-full text-xl font-medium"
              >
                로그인 페이지로 이동하기
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
