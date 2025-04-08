import { pool } from "../db.config.js";

export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM mission WHERE store_id = ? AND body = ?) as isExistMission;`,
      [data.storeId, data.body]
    );

    if (confirm[0].isExistMission) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO mission (store_id, point, body, deadline) VALUES (?, ?, ?, ?);`,
      [data.storeId, data.point, data.body, data.deadline]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(
      `SELECT * FROM mission WHERE id = ?;`,
      missionId
    );

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
