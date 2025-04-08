import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const handleCreateMission = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body: ", req.body);
  const storeId = req.params.storeId;

  const mission = await createMission(bodyToMission(req.body, storeId));
  res.status(StatusCodes.OK).json({ result: mission });
};
