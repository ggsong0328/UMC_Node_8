import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";

export const handleCreateStore = async (req, res, next) => {
  console.log("가게 추가를 요청했습니다!");
  console.log("body: ", req.body);

  const store = await createStore(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};
