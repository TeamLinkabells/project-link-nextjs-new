import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/schemas/user";
import Folder from "../../../models/schemas/folder";

import crypto from "crypto";

//회원가입
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    console.log("CONNECTING TO MONGO");

    await connectMongo();

    console.log("CONNECTED TO MONGO");

    //기존에 가입된 이메일이 있는지 체크하기
    const checkExisting = await User.findOne({ email });
    //가입된 계정이 있다면..에러 메시지 출력
    if (checkExisting) {
      res.status(422).json({ result: false, error: "이미 가입된 계정이에요!" });
      return;
    }
    console.log("CREATING TO DOCUMENT");

    let hashPassword = passwordHash(password);

    //회원 저장
    const user = await User.create({
      email,
      password: hashPassword,
      name,
    });

    // 여기서부터 폴더 생성
    //1. 회원을 생성함과 즉시 전체 링크라는 이름의 폴더를 하나 생성한다
    await Folder.create({
      folder_title: "전체 링크",
      author: user,
    });

    console.log("CREATED TO DOCUMENT");

    res.json({
      status: true,
      message: "회원가입을 완료했습니다.",
      user,
    });
  }
}

// -----------------[몽고 db 연결 완료]-----------------------

// console.log("CREATING TO DOCUMENT");

// //비밀번호를 그냥 쓴게아니고 *해쉬로 변경해서* DB에 저장을함
// // 안하면 벌금
// let hashPassword = passwordHash(password);

// //회원 저장
// const user = await User.create({
//   email,
//   password: hashPassword,
//   name,
// });

// console.log("CREATED TO DOCUMENT");

// res.json({ user });

const passwordHash = (password) => {
  return crypto.createHash("sha1").update(password).digest("hex");
};
