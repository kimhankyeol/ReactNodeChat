/*현재 DB연결없이 서버내에서만 예제를 진행하기 떄문에 
users 객체가 DB역할을 임시적으로 함*/

const users = [];

//사용자 입장
const addUser = ({ id, name, room }) => {

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "사용자명이 존재합니다."};
  }

  const user = { id, name, room };

  users.push(user);
  console.log(users, "users");
  return { user };
};

//사용자 나갔을떄
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//사용자 조회
const getUser = (id) => users.find((user) => user.id === id);

//방안에 사용자가 있는지 조회
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };