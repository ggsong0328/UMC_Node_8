import { pool } from "../db.config.js";

export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM store WHERE id = ?) as isExistsStore;`,
      data.storeId
    );

    if (!confirm[0].isExistsStore) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO review (member_id, store_id, body, rating) VALUES (?, ?, ?, ?);`,
      [data.storeId, data.memberId, data.body, data.rating]
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

export const getStoreIdByStoreName = async (storeName) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(
      `SELECT * FROM store WHERE name = ?;`,
      storeName
    );

    return store[0].id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(
      `SELECT * FROM review WHERE id = ?;`,
      reviewId
    );

    console.log(review);

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
