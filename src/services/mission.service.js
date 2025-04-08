import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission, getMission } from "../repositories/mission.repository.js";

export const createMission = async (data) => {
  const joinMissionId = await addMission({
    storeId: data.storeId,
    point: data.point,
    body: data.body,
    deadline: data.deadline,
  });

  if (joinMissionId == null) {
    throw new Error("이미 존재하는 미션입니다.");
  }

  const mission = await getMission(joinMissionId);

  return responseFromMission({ mission });
};
