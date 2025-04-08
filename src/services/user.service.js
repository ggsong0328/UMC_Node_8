import { responseFromUser, responseFromUserMission } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserAgreedTermsByUserId,
  setAgreedTerms,
  getUserPreferredFoodsByUserId,
  setPreferredFoods,
  addUserMission,
  getUserMission,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    name: data.name,
    email: data.email,
    gender: data.gender,
    birth: data.birth,
    phone_num: data.phone_num,
    address: data.address,
    spec_address: data.spec_address,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const term of data.agreedTerms) {
    await setAgreedTerms(joinUserId, term);
  }

  for (const food of data.preferredFoods) {
    await setPreferredFoods(joinUserId, food);
  }

  const user = await getUser(joinUserId);
  const terms = await getUserAgreedTermsByUserId(joinUserId);
  const foods = await getUserPreferredFoodsByUserId(joinUserId);

  return responseFromUser({ user, terms, foods });
};

export const addNewUserMission = async (data) => {
  console.log(data.memberId, data.missionId);
  const joinUserMissionId = await addUserMission({
    memberId: data.memberId,
    missionId: data.missionId,
  });

  if (joinUserMissionId === null) {
    throw new Error("이미 도전중인 미션입니다.");
  }

  const userMission = await getUserMission(joinUserMissionId);

  return responseFromUserMission({ userMission });
};
