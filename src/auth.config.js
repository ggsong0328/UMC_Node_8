import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import { Strategy as NaverStrategy } from "passport-naver-v2";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  //console.log("profile", profile);

  const user = await prisma.member.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.member.create({
    data: {
      email,
      name: profile.displayName,
      gender: "해당_없음",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      spec_address: "추후 수정",
      phone_num: "추후 수정",
    },
    // 구글이 OAuth 스코프를 통해 제공하는 정보가 제한적 (이름과 이메일만 가져올 수 있다)
    // 나중에 회원가입을 한 후에 사용자에게 나머지 정보를 입력 받아야함!
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/naver",
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const email = profile.email;
    const name = profile.name;

    try {
      const exisiting = await prisma.member.findFirst({ where: { email } });

      if (exisiting) {
        return done(null, exisiting);
      }

      const convertGender = (naverGender) => {
        if (naverGender === "M") return "남자";
        if (naverGender === "F") return "여자";
        return "해당_없음";
      };

      const parseBirth = (birthYear, birthday) => {
        const [month, day] = birthday.split("-");
        return new Date(`${birthYear}-${month}-${day}`);
      };

      const created = await prisma.member.create({
        data: {
          email,
          name,
          gender: convertGender(profile.gender),
          birth: parseBirth(profile.birthYear, profile.birthday),
          address: "추후 수정",
          spec_address: "추후 수정",
          phone_num: profile.mobile || "추후 수정",
        },
      });

      done(null, { id: created.id, email: created.email, name: created.name });
    } catch (err) {
      done(err);
    }
  }
);
