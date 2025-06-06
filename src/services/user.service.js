import {
  responseFromMemberMission,
  responseFromMemberReview,
  responseFromMissionStatus,
  responseFromUser,
  responseFromUserMission,
} from "../dtos/user.dto.js";
import {
  DuplicateUserEmailError,
  UnderwayUserMissionError,
} from "../errors.js";
import {
  addUser,
  getUser,
  getUserAgreedTermsByUserId,
  setAgreedTerms,
  getUserPreferredFoodsByUserId,
  setPreferredFoods,
  addUserMission,
  getUserMission,
  getAllMemberReview,
  getAllMemberMissionDone,
  changeStatus,
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
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
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
    memberId: Number(data.memberId),
    missionId: Number(data.missionId),
  });

  if (joinUserMissionId === null) {
    throw new UnderwayUserMissionError("이미 진행중인 미션입니다.", data);
  }

  const userMission = await getUserMission(joinUserMissionId);

  return responseFromUserMission({ userMission });
};

export const listMemberReviews = async (memberId) => {
  const reviews = await getAllMemberReview(memberId);
  return responseFromMemberReview(reviews);
};

export const listMemberMissions = async (memberId) => {
  const missions = await getAllMemberMissionDone(memberId);
  return responseFromMemberMission(missions);
};

export const changeMissionStatus = async (memberId, missionId) => {
  const mission = await changeStatus(memberId, missionId);
  return responseFromMissionStatus(mission);
};
