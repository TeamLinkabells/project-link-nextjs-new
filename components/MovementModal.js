import React from 'react'

import tw from "tailwind-styled-components";

const ModalBg = tw.div`
    fixed 
    inset-0 
    bg-gray-500 
    bg-opacity-75 
    transition-opacity
`;
const ModalContainer = tw.div`
    w-[320px] 
    bg-white 
    rounded-lg 
    z-50 
    absolute 
    top-1/2 
    left-1/2 
    translate-x-[-50%] 
    translate-y-[-50%] 
    flex 
    flex-col 
    items-start 
    justify-center 
    p-[30px]
    fixed
`;
const CancelBtn = tw.button`
    w-[122px] 
    h-[60px] 
    border 
    border-[#ddd] 
    rounded-lg 
    text-[#999] 
    font-medium
`;
const ConfirmBtn = tw.button`
    w-[122px] 
    h-[60px] 
    bg-[#0074FF] 
    rounded-lg 
    text-white 
    font-medium
`;

function MovementModal(props) {

    let { moveModalData, setMoveModalData } = props; 

    return (
        <div className="relative z-40">
            <ModalBg className=""></ModalBg>
            <ModalContainer>
                <h3 className="text-lg font-medium text-black mb-6">링크 이동</h3>
                <div className="flex flex-col gap-5">
                    <div>
                        <input type="radio" id="contactChoice1"
                            name="contact" value="email" />
                        <label for="contactChoice1"> 새 폴더</label>
                    </div>
                    <div>
                        <input type="radio" id="contactChoice2"
                            name="contact" value="phone" />
                        <label for="contactChoice2"> 새 폴더 (2)</label>
                    </div>
                    <div>
                        <input type="radio" id="contactChoice3"
                            name="contact" value="mail" />
                        <label for="contactChoice3"> 새 폴더 (3)</label>
                    </div>
                </div>
                <div className="flex gap-4 mt-[30px]">
                    <CancelBtn
                        type="button"
                        onClick={() => {
                            setMoveModalData(false);
                        }}
                    >
                        취소
                    </CancelBtn>
                    <ConfirmBtn onClick={() => checkModalState()}>이동</ConfirmBtn>
                </div>
            </ModalContainer>
        </div>
    )
}

export default MovementModal
