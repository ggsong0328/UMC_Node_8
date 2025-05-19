import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import {
  createStore,
  listStoreMissions,
  listStoreReviews,
} from "../services/store.service.js";

export const handleCreateStore = async (req, res, next) => {
  console.log("가게 추가를 요청했습니다!");
  console.log("body: ", req.body);

  const store = await createStore(bodyToStore(req.body));
  res.status(StatusCodes.OK).success(store);
};

export const handleStoreReviews = async (req, res, next) => {
  console.log("가게 리뷰들을 조회합니다");
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleStoreMissions = async (req, res, next) => {
  console.log("가게의 미션 목록을 조회합니다");
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};
