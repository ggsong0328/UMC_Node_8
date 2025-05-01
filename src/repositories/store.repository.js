import { pool, prisma } from "../db.config.js";

//가게 추가
export const addStore = async (data) => {
  const store = await prisma.store.findFirst({
    where: { regionId: data.regionId, name: data.name },
  });
  if (store) {
    return null;
  }

  const created = await prisma.store.create({ data: data });
  return created.id;
};

export const getRegionIdByRegionName = async (regionName) => {
  const region = await prisma.region.findFirst({
    select: {
      id: true,
    },
    where: { name: regionName },
  });

  return region?.id;
};

export const getStore = async (storeId) => {
  const store = await prisma.store.findFirstOrThrow({ where: { id: storeId } });
  return store;
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
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
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      point: true,
      deadline: true,
      body: true,
      store: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};
