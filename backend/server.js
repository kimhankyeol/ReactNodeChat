//1.서버 생성
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
// localhost 포트 설정
const port = 4002;

// users.js
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();

// server instance
const server = http.createServer(app);

// socketio 생성후 서버 인스턴스 사용
const io = socketIO(server, {
	cors: {
	  origin: '*',
	}
  });

// socketio 문법
io.on("connection", (socket) => {
	console.log("소켓 연결 완료");
  
	// 클라이언트에서 join이벤트를 보냈을 경우에 대해서 처리 `on`
	socket.on("join", ({ name, room }, callback) => {
	  const { error, user } = addUser({ id: socket.id, name, room });
	  if (error) return callback(error); // username taken
	  // 해당 유저 방에 접속처리
	  // join(방의 아이디)
	  socket.join(user.room);
	  // 관리자(서버)에서 소켓으로 보내는 이벤트
	  socket.emit("message", {
		user: "admin",
		text: `${user.name},님  방 ${user.room}에 들어오신걸 환영합니다.`,
	  });
	  // 같은 방에 있는 유저에게 보내는 서버측 전달
	  //특정인에게 to(방의 아이디)
	  //나를 제외한 전체 emit
	  socket.broadcast
		.to(user.room)
		.emit("message", { user: "admin", text: `${user.name}이 방에 들어왔습니다.` });
  
	  io.to(user.room).emit("roomData", {
		room: user.room,
		users: getUsersInRoom(user.room),
	  });
  
	  callback();
	  // const error = true;
	  // if (error) {
	  //   callback({ error: "error" });
	  // }
	});
	// 유저가 생성한 이벤트에 대한 처리 `on`
	socket.on("sendMessage", (message, callback) => {
	  // console.log(socket.id, "socket.id");
	  const user = getUser(socket.id);
	  // console.log(user); //
	  // 해당 방으로 메세지를
	  io.to(user.room).emit("message", { user: user.name, text: message });
  
	  // callback();
	});
  
	socket.on("disconnect", () => {
	  const user = removeUser(socket.id);
	  console.log("유저가 떠났습니다..");
  
	  if (user) {
		io.to(user.room).emit("message", {
		  user: "admin",
		  text: `${user.name}이 방을 나갔습니다..`,
		});
		io.to(user.room).emit("roomData", {
		  room: user.room,
		  users: getUsersInRoom(user.room),
		});
	  }
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`))
