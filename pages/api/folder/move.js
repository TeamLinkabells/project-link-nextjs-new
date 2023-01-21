//post folder 값 변경

import connectMongo from "../../../utils/connectMongo";

import Post from "../../../models/schemas/post";
import Folder from "../../../models/schemas/folder";

//http://localhost:3000/api/folder/move
export default async function handler(req, res, next) {
  if (req.method === "POST") {
    let { user_id, folder_id, post_id, folder } = req.body;
    console.log("move입니다:", req.body);

    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    await Post.updateOne({ _id: post_id }, { $set: { folder: folder } });

    console.log("CREATED TO DOCUMENT");

    res.json({
      status: true,
      message: "폴더에 추가되었습니다.",
    });
  }

  //폴더 삭제
  if (req.method === "DELETE") {
    let { user_id, folder_title } = req.body.folderItemInfo;
    // const { id } = req.query;

    console.log("삭제 중입니다..");
    console.log("삭제 데이터 입니다..", user_id, folder_title);

    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    //id에 해당하는 일기장을 삭제함.

    //폴더 삭제 1  Folder
    //user_id를 확인하고, Folder에서 user_id에 맞는 folder의 title을 삭제함
    await Folder.deleteOne({ author: user_id, folder_title: folder_title });

    //폴더 삭제 2  Post
    //post에서 user_id, Post에서 folder : folder인 post를 모두 찾아서 전체 링크로 바꿔줌

    await Post.updateMany(
      { author: user_id, folder: folder_title },
      { $set: { folder: "전체 링크" } }
    );

    res.json({
      status: true,
      message: "폴더를 삭제하였습니다.",
    });
  }
}
