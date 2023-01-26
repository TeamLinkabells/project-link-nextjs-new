import connectMongo from "../../../utils/connectMongo";
import Folder from "../../../models/schemas/folder";
import Post from "../../../models/schemas/post";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    console.log("폴더 쿼리입니다.", id.length);

    if (id.length === 1) {

      console.log("CONNECTING TO MONGO");

      await connectMongo();

      console.log("CONNECTED TO MONGO");

      let folderList = await Folder.find({ author: id })
        // .sort({ created: -1 }) //최신순 정렬
        .populate("author");
      ``;

      res.json({ folderList });
    }

    if (id.length === 2) {

      console.log("CONNECTING TO MONGO");

      await connectMongo();

      console.log("CONNECTED TO MONGO");

      let postList = await Post.find({ author: id[1], folder: id[0] })
        // .sort({ created: -1 }) //최신순 정렬
        .populate("author");
      ``;

      res.json({ postList });
    }
  }
}

//url 게시글 리스트 삭제하기
//http://localhost:3000/api/feed/${id}
//   if (req.method === "DELETE") {
//     const { id } = req.query;

//     console.log("삭제입니다..", id);

//     console.log("CONNECTING TO MONGO");

//     await connectMongo();

//     console.log("CONNECTED TO MONGO");

//     //id에 해당하는 일기장을 삭제함.
//     await Post.deleteOne({ _id: id });

//     res.json({
//       status: true,
//       message: "일기장을 삭제하였습니다.",
//     });
//   }
