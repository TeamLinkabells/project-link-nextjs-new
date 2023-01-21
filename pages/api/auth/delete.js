import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/schemas/user";
import Post from "../../../models/schemas/post";
import Folder from "../../../models/schemas/Folder";

import crypto from "crypto";
import { resolve } from "path";

//user 삭제하기
//http://localhost:3000/api/auth/delete
export default async function (req, res) {
  if (req.method === "DELETE") {
    const { user_id, email } = req.body.userData;
    console.log("유저 삭제입니다..", user_id);

    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    let checkEmail = await User.findOne({
      _id: user_id,
      email: email,
    });

    if (checkEmail) {
      await Post.deleteMany({ author: user_id });
      await Folder.deleteMany({ author: user_id });
      await User.deleteMany({ _id: user_id });
    }

    res.json({
      status: true,
      message: "탈퇴를 완료했습니다.",
    });
  }
}
