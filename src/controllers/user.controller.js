import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUserMission } from "../dtos/user.dto.js";
import { addNewUserMission, userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleAddUserMission = async (req, res, next) => {
  console.log("도전 미션에 추가를 요청했습니다!");
  const memberId = req.params.memberId;
  const missionId = req.params.missionId;

  const userMission = await addNewUserMission(
    bodyToUserMission(memberId, missionId)
  );
  res.status(StatusCodes.OK).json({ result: userMission });
};
