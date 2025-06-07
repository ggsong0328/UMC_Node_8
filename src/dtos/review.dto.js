export const bodyToReview = (body) => {
  return {
    storeName: body.storeName,
    body: body.body,
    rating: body.rating,
  };
};

export const responseFromReview = (body) => {
  console.log(body);
  return body;
};
