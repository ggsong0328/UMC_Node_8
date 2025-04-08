import { pool } from "../db.config.js";

export const addStore = async (data) => {
  const conn = await pool.getConnection();

  console.log(data.regionId, data.name);

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM store WHERE region_id = ? AND name = ?) as isExistStore;`,
      [data.regionId, data.name]
    );

    if (confirm[0].isExistStore) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO store (region_id, name, address) VALUES (?, ?, ?);`,
      [data.regionId, data.name, data.address]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생헀어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getRegionIdByRegionName = async (regionName) => {
  const conn = await pool.getConnection();

  try {
    const [region] = await pool.query(
      `SELECT * FROM region where name = ?;`,
      regionName
    );

    console.log(region);
    return region[0].id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(
      `SELECT * FROM store WHERE id = ?;`,
      storeId
    );

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
