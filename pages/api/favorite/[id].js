import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/schemas/post";
import User from "../../../models/schemas/user";

export default async function handler(req, res) {
  //url 즐겨찾기 게시글 리스트 가져오기
  //http://localhost:3000/api/favorite/${id}
  if (req.method === "GET") {
    const { id } = req.query;

    console.log("쿼리입니다.", id);

    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    let postList = await Post.find({
      author: id,
      favorites: true,
    }).sort({ created: -1 });

    res.json({ postList });
  }
}
