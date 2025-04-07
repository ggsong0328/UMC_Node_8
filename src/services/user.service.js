import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserAgreedTermsByUserId,
  setAgreedTerms,
  getUserPreferredFoodsByUserId,
  setPreferredFoods,
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
    throw new Error("이미 존재하는 이메일입니다.");
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
