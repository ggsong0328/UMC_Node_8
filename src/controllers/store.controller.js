import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import {
  createStore,
  listStoreMissions,
  listStoreReviews,
} from "../services/store.service.js";

export const handleCreateStore = async (req, res, next) => {
  /*
    #swagger.summary = '새로운 가게 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              regionName: { type: "string" },
              name: { type: "string" },
              address: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 추가 성공 응답",
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
                  store: { type: "object", properties: {
                    id: { type: "number" },
                    regionid: { type: "number" },
                    name: { type: "string" },
                    address: { type: "string" },
                    rating: { type: "float" },
                    createdAt: { type: "string", format: "date" },
                    updatedAt: { type: "string", format: "date" }
                  }},
                  regionId: { type: "number" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "가게 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      address: { type: "string" },
                      regionName: { type: "string" }
                    }
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    */

  console.log("가게 추가를 요청했습니다!");
  console.log("body: ", req.body);

  const store = await createStore(bodyToStore(req.body));
  res.status(StatusCodes.OK).success(store);
};

export const handleStoreReviews = async (req, res, next) => {
  /*
  #swagger.summary = "가게 리뷰 목록 조회 API"
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '가게 ID'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'integer',
    description: '페이징 커서 (기본값 0)'
  }
  #swagger.responses[200] = {
    description: "가게 리뷰 목록 조회 성공",
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
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", example: 5 },
                      body: { type: "string", example: "가게가 깨끗해요" },
                      storeId: { type: "number", example: 1 },
                      memberId: { type: "number", example: 1 },
                      store: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 1 },
                          name: { type: "string", example: "한라맥주" },
                          address: { type: "string", example: "용인시 모현읍 어쩌구 저쩌구" }
                        }
                      },
                      member: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 1 },
                          name: { type: "string", example: "나다라" },
                          email: { type: "string", example: "nadara@test.com" }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", example: 7 }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
*/
  console.log("가게 리뷰들을 조회합니다");
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleStoreMissions = async (req, res, next) => {
  /*
  #swagger.summary = "가게 미션 목록 조회 API"
  #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '가게 ID'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'integer',
    description: '페이징 커서 (기본값 0)'
  }
  #swagger.responses[200] = {
    description: "가게 미션 목록 조회 성공",
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
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", example: 1 },
                      point: { type: "number", example: 2000 },
                      deadline: {
                        type: "string",
                        format: "date-time",
                        example: "2025-04-11T00:00:00.000Z"
                      },
                      body: { type: "string", example: "아무 메뉴 시켜 먹기" },
                      store: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 1 },
                          name: { type: "string", example: "한라맥주" },
                          address: {
                            type: "string",
                            example: "용인시 모현읍 어쩌구 저쩌구"
                          }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  type: "object",
                  properties: {
                    cursor: { type: "number", example: 2 }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
*/
  console.log("가게의 미션 목록을 조회합니다");
  const missions = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};
