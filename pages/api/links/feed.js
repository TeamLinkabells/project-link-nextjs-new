import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/schemas/post";
import User from "../../../models/schemas/user";

//url 생성
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, image, url, email } = req.body;

    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    //url 생성하기전에 작성자를 같이 담아주기 위해서 email에 맞는 정보를 가지고 있는,
    // 회원의 데이터를 가져옴

    const authData = await User.findOne({ email });

    //회원의 정보와 함께 저장함
    await Post.create({
      item_title: title,
      item_description: description,
      item_image_url: image,
      item_url: url,
      author: authData,
    });

    console.log("CREATED TO DOCUMENT");

    res.json({
      status: true,
      message: "url 포스트를 생성하였습니다.",
    });
  }

  if (req.method === "GET") {
    const query = req.query;
    console.log("쿼리", query);
    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    let urlPost = await Post.find({})
      .sort({ created: -1 }) //최신순 정렬
      .populate("author");

    res.json({ urlPost });
  }
}
