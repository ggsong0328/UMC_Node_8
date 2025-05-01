import dotenv from "dotenv";
import cors from "cors";
import express from "express"; // -> ES Module
import {
  handleAddUserMission,
  handleChangeMissionStatus,
  handleMemberMissionsDone,
  handleMemberReviews,
  handleUserSignUp,
} from "./controllers/user.controller.js";
import {
  handleCreateStore,
  handleStoreMissions,
  handleStoreReviews,
} from "./controllers/store.controller.js";
import { handleCreateReview } from "./controllers/review.controller.js";
import { handleCreateMission } from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 회원가입
app.post("/members", handleUserSignUp);

// 특정 지역에 가게 추가 = 가게 추가
app.post("/stores", handleCreateStore);

// 가게에 리뷰 추가하기 = 리뷰 작성
app.post("/reviews", handleCreateReview);

// 가게에 미션 추가하기
app.post("/stores/:storeId/missions", handleCreateMission);

// 가게의 미션을 도전 중인 미션에 추가
app.post("/members/:memberId/missions/:missionId", handleAddUserMission);

// 가게 리뷰 목록 보기
app.get("/stores/:storeId/reviews", handleStoreReviews);

// 내가 작성한 리뷰 목록
app.get("/members/:memberId/reviews", handleMemberReviews);

// 특정 가게의 미션 목록
app.get("/stores/:storeId/missions", handleStoreMissions);

// 내가 수행중인 미션 목록
app.get("/members/:memberId/missions/done", handleMemberMissionsDone);

// 진행 중인 미션 진행 완료로 바꾸기
app.patch("/members/:memberId/missions/:missionId", handleChangeMissionStatus);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
