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
  const agreedTerms = terms.map((term) => term.terms.title);

  const preferFoods = foods.map((food) => food.foodCategory.name);

  return {
    email: user.email,
    name: user.name,
    agreedTerms: agreedTerms,
    preferCategory: preferFoods,
  };
};

export const bodyToUserMission = (memberId, missionId, body) => {
  //console.log(memberId, missionId);
  return {
    memberId,
    missionId,
  };
};

export const responseFromUserMission = (body) => {
  return body;
};

export const responseFromMemberReview = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

export const responseFromMemberMission = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};

export const responseFromMissionStatus = (updated) => {
  return {
    id: updated.id,
    status: updated.status,
  };
};
