import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import InputSearchBtn from "../../public/input_search.svg";

import tw from "tailwind-styled-components";

const SearchInput = tw.input`
    bg-[#ededed] 
    w-[280px] 
    h-[40px] 
    rounded-[20px] 
    px-5 
    text-[#666] 
    focus:outline-[#0074FF] 
    focus:outline-1 
    focus:bg-white 
    focus-visible:outline-[#0074FF] 
    focus-visible:outline-1 
    focus-visible:bg-white 
    duration-300
`;

let Header = (props) => {
  let { searchData, setSeacrhData } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  let pathname = router.pathname;
  let title = router.query.id[1];

  let searchFunc = () => {
    router.push(`/feed/search/${cookies.token.id}/${searchData}`);
  };


  return (
    <>
      <div className="flex flex-col sm:flex-row border-b border-[#ededed] pb-6">
        <h3 className="text-[22px] font-medium text-black">
          {pathname.includes("favorite")
            ? "즐겨찾는 링크"
            : pathname.includes("search")
            ? "검색 링크"
            : pathname.includes("folder")
            ? title
            : "전체 링크"}
        </h3>
        <div className="mt-5 sm:mt-0 sm:ml-auto relative h-10 w-fit">
          <SearchInput
            onChange={(e) => {
              {
                setSeacrhData(e.target.value);
              }
            }}
            placeholder="검색어를 입력하세요"
          />
          <button
            className="absolute top-1/2 right-[20px] translate-y-[-50%]"
            onClick={searchFunc}
          >
            <InputSearchBtn />
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;
