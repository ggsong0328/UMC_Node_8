import { responseFromStore } from "../dtos/store.dto.js";
import {
  addStore,
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
