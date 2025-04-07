export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    name: body.name,
    email: body.email,
    gender: body.gender,
    birth,
    phone_num: body.phone_num,
    address: body.address,
    spec_address: body.spec_address,
    agreedTerms: body.agreedTerms,
    preferredFoods: body.preferredFoods,
  };
};

export const responseFromUser = ({ user, terms, foods }) => {
  const birth = new Date(user.birth);

  return {
    name: user.name,
    email: user.email,
    gender: user.gender,
    birth,
    phone_num: user.phone_num,
    address: user.address,
    spec_address: user.spec_address,
    agreedTerms: terms,
    preferredFoods: foods,
  };
};
