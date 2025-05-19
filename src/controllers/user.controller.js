import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUserMission } from "../dtos/user.dto.js";
import {
  addNewUserMission,
  changeMissionStatus,
  listMemberMissions,
  listMemberReviews,
  userSignUp,
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};

export const handleAddUserMission = async (req, res, next) => {
  console.log("도전 미션에 추가를 요청했습니다!");
  const memberId = req.params.memberId;
  const missionId = req.params.missionId;

  const userMission = await addNewUserMission(
    bodyToUserMission(memberId, missionId)
  );
  res.status(StatusCodes.OK).success(userMission);
};

export const handleMemberReviews = async (req, res, next) => {
  console.log("내가 작성한 리뷰들을 조회합니다.");
  const reviews = await listMemberReviews(
    parseInt(req.params.memberId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleMemberMissionsDone = async (req, res, next) => {
  console.log("내가 진행중인 미션을 조회합니다");
  const missions = await listMemberMissions(
    parseInt(req.params.memberId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};

export const handleChangeMissionStatus = async (req, res, next) => {
  console.log("해당 미션을 완료했습니다");
  const missions = await changeMissionStatus(
    parseInt(req.params.memberId),
    parseInt(req.params.missionId)
  );
  res.status(StatusCodes.OK).success(missions);
};
