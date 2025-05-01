import { pool, prisma } from "../db.config.js";

export const addReview = async (data) => {
  const review = await prisma.store.findFirst({ where: { id: data.storeId } });
  if (!review) {
    return null;
  }

  const created = await prisma.review.create({ data: data });
  return created.id;
};

export const getStoreIdByStoreName = async (storeName) => {
  const store = await prisma.store.findFirst({
    select: {
      id: true,
    },
    where: { name: storeName },
  });

  return store?.id;
};

export const getReview = async (reviewId) => {
  const review = await prisma.review.findFirstOrThrow({
    where: { id: reviewId },
  });
  return review;
};
