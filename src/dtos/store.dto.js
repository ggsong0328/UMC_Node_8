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
