import { pool, prisma } from "../db.config.js";

//User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.member.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.member.create({ data: data });
  return created.id;
};

//사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.member.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 이용약관 동의 매핑
export const setAgreedTerms = async (userId, termsId) => {
  await prisma.memberTerms.create({
    data: {
      memberId: userId,
      termsId: termsId,
    },
  });
};

// 사용자 이용약관 동의 반환
export const getUserAgreedTermsByUserId = async (userId) => {
  const agreedTerms = await prisma.memberTerms.findMany({
    select: {
      id: true,
      memberId: true,
      termsId: true,
      terms: true,
    },
    where: { memberId: userId },
    orderBy: { termsId: "asc" },
  });

  return agreedTerms;
};

// 음식 선호 카테고리 매핑
export const setPreferredFoods = async (userId, foodCategoryId) => {
  await prisma.memberFood.create({
    data: {
      memberId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferredFoodsByUserId = async (userId) => {
  const preferences = await prisma.memberFood.findMany({
    select: {
      id: true,
      memberId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { memberId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

// 도전중인 미션 추가
export const addUserMission = async (data) => {
  const userMission = await prisma.memberMission.findFirst({
    where: { memberId: data.memberId, missionId: data.missionId },
  });
  if (userMission) {
    return null;
  }

  const created = await prisma.memberMission.create({ data: data });
  return created.id;
};

// 도전 중인 미션 정보 얻기
export const getUserMission = async (memberMissionId) => {
  const userMission = await prisma.memberMission.findFirstOrThrow({
    where: { id: memberMissionId },
  });
  return userMission;
};

export const getAllMemberReview = async (memberId, cursor) => {
  const review = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      storeId: true,
      memberId: true,
      store: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
      member: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    where: { memberId: memberId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return review;
};

export const getAllMemberMissionDone = async (memberId, cursor) => {
  const mission = await prisma.memberMission.findMany({
    select: {
      id: true,
      memberId: true,
      missionId: true,
      member: {
        select: {
          id: true,
          name: true,
        },
      },
      mission: {
        select: {
          id: true,
          point: true,
          body: true,
          deadline: true,
        },
      },
    },
    where: { memberId: memberId, status: false, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return mission;
};

export const changeStatus = async (memberId, missionId) => {
  const mission = await prisma.memberMission.findFirstOrThrow({
    where: { memberId: memberId, missionId: missionId, status: false },
  });
  if (!mission) {
    return null;
  }

  const update = await prisma.memberMission.update({
    where: {
      memberId_missionId: {
        memberId: memberId,
        missionId: missionId,
      },
    },
    data: { status: true },
  });

  return update;
};
