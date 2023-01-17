import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/schemas/post";

export default async function handler(req, res) {
  //검색어 포함 게시글 리스트 가져오기
  //http://localhost:3000/api/search
  if (req.method === "GET") {
    const { pid } = req.query;

    let searhText = pid[0];
    console.log("search 쿼리입니다.", searhText);

    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    let postList = await Post.find({
      author: pid[1],
      item_title: {$regex : searhText , '$options':'i'},
    }).sort({ created: -1 });;

    // let postList = await Post.find({
    //   item_title: {$regex : searhText , '$options':'i'},
    // }).sort({ created: -1 });

    res.json({ postList });
  }
}
