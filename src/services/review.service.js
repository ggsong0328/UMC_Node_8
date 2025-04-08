import { responseFromReview } from "../dtos/review.dto.js";
import {
  addReview,
  getReview,
  getStoreIdByStoreName,
} from "../repositories/review.repository.js";

export const createReview = async (data) => {
  const storeId = await getStoreIdByStoreName(data.storeName);
  console.log(storeId);
  const joinReivewId = await addReview({
    storeId,
    memberId: 1,
    body: data.body,
    rating: data.rating,
  });

  if (joinReivewId === null) {
    throw new Error("리뷰를 작성하려는 가게가 존재하지 않습니다.");
  }

  const review = await getReview(joinReivewId);

  return responseFromReview({ review });
};
