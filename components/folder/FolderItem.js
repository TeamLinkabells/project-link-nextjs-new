import { useState } from "react";

let FolderItem = (props) => {
    let {id, folder_title } = props

    const [folderItemInfo, setFolderIteminfo] = useState({
        id : id,
        folder_title : folder_title
    })

    return (
        <>
        <div>
            <h3>{folderItemInfo.folder_title}</h3>
        </div>
        </>
    )

}
export default FolderItem;