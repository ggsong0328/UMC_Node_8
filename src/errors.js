export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class UnderwayUserMissionError extends Error {
  errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class DuplicateStoreError extends Error {
  errorCode = "S001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class StoreNotExists extends Error {
  errorCode = "R001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionAlreadyExists extends Error {
  errorCode = "M001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
