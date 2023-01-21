import connectMongo from "../../../utils/connectMongo";
import Folder from "../../../models/schemas/folder";
import User from "../../../models/schemas/user";

//folder 생성
//http://localhost:3000/api/folder/
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, email } = req.body;

    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    //폴더 생성하기전에 작성자를 같이 담아주기 위해서 email에 맞는 정보를 가지고 있는,
    // 회원의 데이터를 가져옴

    const authData = await User.findOne({ email });

    console.log("숑숑", authData);

    const checkFolder = await Folder.findOne({ folder_title: title });

    if (checkFolder) {
      res.json({
        status: false,
        message: "이미 존재하는 폴더입니다.",
      });
      return;
    }

    //회원의 정보와 함께 저장함
    await Folder.create({
      folder_title: title,
      author: authData,
    });

    console.log("CREATED TO DOCUMENT");

    res.json({
      status: true,
      message: "폴더를 생성하였습니다.",
    });
  }
}
