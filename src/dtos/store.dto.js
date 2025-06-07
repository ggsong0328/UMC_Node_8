export const bodyToStore = (body) => {
  return {
    name: body.name,
    address: body.address,
    regionName: body.regionName,
  };
};

export const responseFromStore = (body) => {
  return body;
};

export const responseFromStoreReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

export const responseFromStoreMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
