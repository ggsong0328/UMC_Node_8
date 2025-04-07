import { pool } from "../db.config.js";

//User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO member (name, email, gender, birth, phone_num, address, spec_address) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.name,
        data.email,
        data.gender,
        data.birth,
        data.phone_num,
        data.address,
        data.spec_address,
      ]
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

//사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(
      `SELECT * FROM member WHERE id = ?;`,
      userId
    );

    console.log(user);

    if (user.length == 0) {
      return null;
    }

    return user[0];
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. ${err}`);
  } finally {
    conn.release();
  }
};

// 이용약관 동의 매핑
export const setAgreedTerms = async (userId, termsId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO member_terms (member_id, terms_id) VALUES (?, ?);`,
      [userId, termsId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 이용약관 동의 반환
export const getUserAgreedTermsByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [terms] = await pool.query(
      "SELECT mt.id, mt.member_id, mt.terms_id, t.title " +
        "FROM member_terms mt join terms t on mt.terms_id = t.id " +
        "WHERE mt.member_id = ? ORDER BY mt.terms_id ASC;",
      userId
    );

    return terms;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreferredFoods = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO member_food (member_id, food_category_id) VALUES (?, ?);`,
      [userId, foodCategoryId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferredFoodsByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT mf.id, mf.member_id, mf.food_category_id, fc.name " +
        "FROM member_food mf join food_category fc on mf.food_category_id = fc.id " +
        "WHERE mf.member_id = ? ORDER BY mf.food_category_id ASC;",
      userId
    );
    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
