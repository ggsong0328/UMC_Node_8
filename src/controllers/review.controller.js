import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";

export const handleCreateReview = async (req, res, next) => {
  /*
    #swagger.summary = '리뷰 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeName: { type: "string" },
              body: { type: "string" },
              rating: { type: "number", format: "float" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  review: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      storeId: { type: "number" },
                      memberId: { type: "number" },
                      body: { type: "string" },
                      ratirng: { type: "number", format: "float" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400]= {
      description: "리뷰 생성 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };

  */
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body: ", req.body);

  const review = await createReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(review);
};
