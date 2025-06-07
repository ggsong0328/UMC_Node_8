import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const handleCreateMission = async (req, res, next) => {
  /*
    #swagger.summary = '가게에 미션 추가 API'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              point:  { type: "number" },
              body: { type: "string" },
              deadline: { type: "string", format: "date" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '가게에 미션 추가 성공 응답',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "object",
                properties: {
                  mission: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      storeId: { type: "number" },
                      point: { type: "number" },
                      deadline: { type: "string", format: "date" },
                      body: { type: "string" },
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: '가게에 미션 추가 실패 응답',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      storeId: { type: "number" },
                      point: { type: "number" },
                      body: { type: "string" },
                      deadline: { type: "string", format: "date" }
                    }
                  }
                }
              },
              success: { type: "string", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("미션 추가를 요청했습니다!");
  console.log("body: ", req.body);
  const storeId = req.params.storeId;

  const mission = await createMission(bodyToMission(req.body, storeId));
  res.status(StatusCodes.OK).json({ result: mission });
};
