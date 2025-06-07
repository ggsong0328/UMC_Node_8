import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUserMission } from "../dtos/user.dto.js";
import {
  addNewUserMission,
  changeMissionStatus,
  listMemberMissions,
  listMemberReviews,
  userSignUp,
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
  #swagger.summary = "회원가입 API";
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            gender: { type: "string" },
            birth: { type: "string", format: "date" },
            address: { type: "string" },
            spec_address: { type: "string" },
            agreedTerms: { type: "array", items: { type: "number" } },
            preferredFoods: { type: "array", items: { type: "number" } }
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "회원가입 성공 응답",
    content:  {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                email: { type: "string" },
                name: { type: "string" },
                agreedTerms: { type: "array", items: { type: "string" } },
                preferCategory: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: "회원가입 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
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
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};

export const handleAddUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '도전 중인 미션에 추가 API';
    #swagger.responses[200] = {
      description: '도전 중인 미션에 추가 성공 응답',
      content: {
        'application/json': {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  userMission: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      memberId: { type: "number" },
                      missionsId: { type: "number" },
                      status: { type: "boolean" },
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
      description: '도전 중인 미션에 추가 실패 응답',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      memberId: { type: "number" },
                      missionId: { type: "number" }
                    }
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("도전 미션에 추가를 요청했습니다!");
  const memberId = req.params.memberId;
  const missionId = req.params.missionId;

  const userMission = await addNewUserMission(
    bodyToUserMission(memberId, missionId)
  );
  res.status(StatusCodes.OK).success(userMission);
};

export const handleMemberReviews = async (req, res, next) => {
  /*
  #swagger.summary = "내가 작성한 리뷰 조회 API"
  #swagger.parameters['memberId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '사용자 ID'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'integer',
    description: '페이징 처리를 위한 커서 (기본값 0)'
  }
  #swagger.responses[200] = {
    description: "리뷰 목록 조회 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  content: { type: "string" },
                  storeName: { type: "string" },
                  createdAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    }
  }
*/
  console.log("내가 작성한 리뷰들을 조회합니다.");
  const reviews = await listMemberReviews(
    parseInt(req.params.memberId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleMemberMissionsDone = async (req, res, next) => {
  /*
  #swagger.summary = "내가 도전 중인 미션 목록 조회 API"
  #swagger.parameters['memberId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '사용자 ID'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    type: 'integer',
    description: '페이징 커서 (기본값 0)'
  }
  #swagger.responses[200] = {
    description: "도전 중인 미션 조회 성공",
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
                      id: { type: "number", example: 2 },
                      memberId: { type: "number", example: 1 },
                      missionId: { type: "number", example: 2 },
                      member: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 1 },
                          name: { type: "string", example: "나다라" }
                        }
                      },
                      mission: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 2 },
                          point: { type: "number", example: 2000 },
                          body: { type: "string", example: "테스트" },
                          deadline: { type: "string", format: "date-time", example: "2025-04-11T00:00:00.000Z" }
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
  console.log("내가 진행중인 미션을 조회합니다");
  const missions = await listMemberMissions(
    parseInt(req.params.memberId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(missions);
};

export const handleChangeMissionStatus = async (req, res, next) => {
  /*
  #swagger.summary = "도전 중인 미션 완료 처리 API"
  #swagger.parameters['memberId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '사용자 ID'
  }
  #swagger.parameters['missionId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '미션 ID'
  }
  #swagger.responses[200] = {
    description: "미션 완료 처리 성공 응답",
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
                missionId: { type: "number" },
                status: { type: "boolean", example: true }
              }
            }
          }
        }
      }
    }
  }
*/
  console.log("해당 미션을 완료했습니다");
  const missions = await changeMissionStatus(
    parseInt(req.params.memberId),
    parseInt(req.params.missionId)
  );
  res.status(StatusCodes.OK).success(missions);
};
