import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/schemas/post";
import User from "../../../models/schemas/user";

//url 즐겨찾기 게시글 생성
//http://localhost:3000/api/favorite/uncheck
export default async function handler(req, res, next) {
  if (req.method === "POST") {
    let { id } = req.body;
    console.log("콘솔 값:", id);

    await Post.updateOne({ _id: id }, { $set: { favorites: false } });

    console.log("CREATED TO DOCUMENT");

    res.json({
      status: true,
      message: "즐겨찾기에서 삭제했습니다.",
    });
  }
}
