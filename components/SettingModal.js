import React from 'react'

import Close from "../public/close.svg";

import tw from "tailwind-styled-components";

const ModalBg = tw.div`
    fixed 
    inset-0 
    bg-gray-500 
    bg-opacity-75 
    transition-opacity
`;
const WithdrawalBtn = tw.button`
    mt-[30px]
    w-[160px]
    h-[60px]
    border
    border-[#ddd]
    rounded-md
    text-[#999]
`
const ModalCloseBtn = tw.button`
    mt-3 
    inline-flex 
    justify-center 
    rounded-md 
    bg-white 
    text-base 
    font-medium 
    text-gray-700 
    shadow-sm 
    hover:bg-gray-50 
    sm:mt-0 
    sm:ml-3 
    w-auto 
    sm:text-sm 
    absolute 
    top-[25px] 
    right-[30px]
`;

function SettingModal(props) {

    let { settingModalData, setSettingModalData } = props; 

    return (
        <div className="relative z-40">
            <ModalBg className=""></ModalBg>
            <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center">
                <div className="bg-white max-w-[500px] w-full px-[30px] pt-10 pb-[30px] rounded-lg relative">
                    <div>
                        <h3 className="text-[#000]">이름</h3>
                        <input className="bg-[#f1f1f5] h-[60px] rounded-md mt-2 w-full"/>
                    </div>
                    <div className="border-b border-[#ededed] pb-[30px] mt-5">
                        <h3 className="text-[#000]">계정</h3>
                        <input className="bg-[#f1f1f5] h-[60px] rounded-md mt-2 w-full"/>
                    </div>
                    <WithdrawalBtn>
                        회원 탈퇴
                    </WithdrawalBtn>
                    <ModalCloseBtn
                        type="button"
                        onClick={() => {
                            setSettingModalData(false);
                        }}
                    >
                        <Close />
                    </ModalCloseBtn>
                </div>
            </div>
        </div>
    )
}

export default SettingModal
