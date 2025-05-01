import {
  responseFromStore,
  responseFromStoreMissions,
  responseFromStoreReviews,
} from "../dtos/store.dto.js";
import {
  addStore,
  getAllStoreMissions,
  getAllStoreReviews,
  getRegionIdByRegionName,
  getStore,
} from "../repositories/store.repository.js";

export const createStore = async (data) => {
  const regionId = await getRegionIdByRegionName(data.regionName);

  const joinStoreId = await addStore({
    name: data.name,
    address: data.address,
    regionId,
  });

  if (joinStoreId === null) {
    throw new Error("이미 존재하는 가게입니다.");
  }

  const store = await getStore(joinStoreId);

  return responseFromStore({ store, regionId });
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromStoreReviews(reviews);
};

export const listStoreMissions = async (storeId) => {
  const missions = await getAllStoreMissions(storeId);
  return responseFromStoreMissions(missions);
};
