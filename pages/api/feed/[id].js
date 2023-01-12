import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/schemas/post";
import User from "../../../models/schemas/user";

export default async function handler(req, res) {
  //url게시글 리스트 가져오기
  if (req.method === "GET") {
    const { id } = req.query;

    console.log("쿼리입니다.", id);

    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    let urlPost = await Post.find({ author: id })
      .sort({ created: -1 }) //최신순 정렬
      .populate("author");

    res.json({ urlPost });
  }
}
