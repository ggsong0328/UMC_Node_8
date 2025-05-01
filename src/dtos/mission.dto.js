export const bodyToMission = (body, storeId) => {
  const deadline = new Date(body.deadline);
  return {
    storeId,
    point: body.point,
    body: body.body,
    deadline,
  };
};

export const responseFromMission = (body) => {
  return body;
};
