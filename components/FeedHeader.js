import React from 'react'

import InputSearchBtn from '../public/input_search.svg'
// import ArrowDown from '../public/arrow_down.svg'

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
`

function FeedHeader() {

    return (
        <div className="flex border-b border-[#ededed] pb-6">
            <h3 className="text-[22px] font-medium text-black">전체 링크</h3>
            <div className="ml-auto relative h-10">
                <SearchInput placeholder="검색어를 입력하세요" />
                <button className="absolute top-1/2 right-[20px] translate-y-[-50%]">
                    <InputSearchBtn />
                </button>
            </div>
        </div>
    )
}

export default FeedHeader;
