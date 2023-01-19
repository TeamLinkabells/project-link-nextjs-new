import { useState } from "react";


import tw from "tailwind-styled-components";

const ListContainer = tw.div`
h-10 
flex 
items-center 
text-[#666666] 
hover:bg-[#f1f1f1]
px-6
justify-between
bg-no-repeat
bg-[center_right_24px]
hover:bg-[url('../public/remove.svg')]
  `;

let FolderItem = (props) => {
    let {id, folder_title } = props

    const [folderItemInfo, setFolderIteminfo] = useState({
        id : id,
        folder_title : folder_title
    })

    return (
        <>
        
        <div>
        <ListContainer>
            <h3>{folderItemInfo.folder_title}</h3>
            <button className="text-transparent" onClick={()=>{
                console.log("살려줘", folderItemInfo.folder_title)
            }} >버</button>
            </ListContainer>
        </div>
       
        </>
    )

}
export default FolderItem;