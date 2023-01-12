import ColorLogo from "../public/logo_color.svg";
import Menu from "../public/menu.svg";
import Search from "../public/search.svg";

let Header = () => {
    return (
        <>
            <header className="text-gray-600 body-font h-[70px] flex items-center justify-center bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.08)]">
                <div className="mx-auto flex flex-wrap items-center justify-between px-5 max-w-[1800px] w-[98%]">
                    <a className="flex title-font font-medium items-center text-gray-900 md:mb-0">
                        <ColorLogo width="120" height="22" viewBox="0 0 300 60" />
                    </a>
                    <input type="search" id="search" name="search" placeholder="검색어를 입력하세요." className="ml-auto flex flex-wrap items-center text-base justify-center w-[300px] h-[40px] border focus:border-none bg-[#F1F1F5] rounded-[25px] pl-12 pr-5 mr-6 bg-[url('../public/small_search.svg')] bg-no-repeat bg-[center_left_20px] hidden sm:block" />
                    <div className="block sm:hidden ml-auto mr-5">
                        <Search />
                    </div>
                    <div>
                        <Menu />
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;