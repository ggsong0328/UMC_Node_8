import { responseFromReview } from "../dtos/review.dto.js";
import { StoreNotExists } from "../errors.js";
import {
  addReview,
  getReview,
  getStoreIdByStoreName,
} from "../repositories/review.repository.js";

export const createReview = async (data) => {
  const storeId = await getStoreIdByStoreName(data.storeName);
  console.log(storeId);
  const joinReviewId = await addReview({
    storeId,
    memberId: 1,
    body: data.body,
    rating: data.rating,
  });

  if (joinReviewId === null) {
    throw new StoreNotExists("리뷰하려는 가게가 존재하지 않습니다.", data);
  }

  const review = await getReview(joinReviewId);

  return responseFromReview({ review });
};
