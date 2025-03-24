const bcrypt = require('bcrypt');

// const hashPassword = async pw => {
//   const salt = await bcrypt.genSalt(12);
//   const hash = await bcrypt.hash(pw, salt);
//   console.log(salt);
//   console.log(hash);
// };

const hashPassword = async pw => {
  const hash = await bcrypt.hash(pw, 12);
  console.log(hash);
};

const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
    console.log('로그인 성공! 비밀번호가 일치합니다');
  } else {
    console.log('비밀번호가 일치하지 않습니다');
  }
};

// hashPassword('monkey');
login('monkEy', '$2b$12$79xfHnT/GEGBIWB4F4iKLe0aW54a3LhZbEkWiRs58cybi4uEFF9V.')
