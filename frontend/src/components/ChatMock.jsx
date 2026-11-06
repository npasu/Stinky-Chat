const ChatMock = [
  {
    id: "msg1",
    isSender: true,
    user: { name: "user1", profile: "/profile1.svg" },
    message: `ถ้าต้องการส่งข้อความยาว ๆ ที่ทั้งจริงใจและอ่อนโยน
ข้อความในแชทประจำวันสามารถเป็นเครื่องมือสร้างสัมพันธ์และย้ำเป้าหมายร่วมกันได้
เริ่มด้วยความอบอุ่น: เปิดข้อความด้วยคำทักทายเรียบง่ายแต่มีความหมาย เช่น 
"สวัสดีเช้านะที่รัก" หรือ "ตื่นมาแล้วนึกถึงเธอเลย" เพื่อทำให้คู่ของคุณรับรู้ทันทีว่าคุณใส่ใจ 
ใส่รายละเอียดที่เป็นส่วนตัว: เล่าถึงสิ่งเล็ก ๆ ที่ทำให้คิดถึงเขา`,
    reactions: {
      HEART: ["user1", "user2"],
      THUMBS_UP: ["user2"],
      THUMBS_DOWN: ["user2", "user3"],
    },
  },
  {
    id: "msg2",
    isSender: true,
    user: { name: "user2", profile: "/profile2.svg" },
    message: `ดีคับผม`,
    reactions: {
      HEART: ["user1", "user2"],
      THUMBS_UP: ["user1", "user2"],
      THUMBS_DOWN: ["user1", "user2", "user3"],
    },
  },
  {
    id: "msg3",
    isSender: false,
    user: { name: "user3", profile: "/profile3.svg" },
    message: `ผมอยากมีแมว`,
    reactions: {
      HEART: ["user1", "user2"],
      THUMBS_UP: ["user3", "user2"],
    },
  },
  {
    id: "msg4",
    isSender: true,
    user: { name: "user4", profile: "/profile4.svg" },
    message: `จริงครับพี่ชาย`,
    reactions: {
      THUMBS_DOWN: ["user1", "user2", "user3"],
    },
  },
  {
    id: "msg5",
    isSender: true,
    user: { name: "user5", profile: "/profile1.svg" },
    message: `้ฟแเทหอ้ืวแยงดฟแห้ืกอแวฟยสแาอก่อหใแฟยสาอก้ืหแปงฟสแหอก้ืหแใปฟงสา่้ืหปฟยง`,
    reactions: {},
  },
  {
    id: "msg6",
    isSender: false,
    user: { name: "user6", profile: "/profile2.svg" },
    message: `ผมรักแมว`,
    reactions: {
      THUMBS_DOWN: ["user1", "user2", "user3"],
    },
  },
  {
    id: "msg7",
    isSender: false,
    user: { name: "user6", profile: "/profile2.svg" },
    message: `ผมรักแมว`,
    reactions: {
      THUMBS_DOWN: ["user1", "user2", "user3"],
    },
  },
  {
    id: "msg8",
    isSender: true,
    user: { name: "user6", profile: "/profile2.svg" },
    message: `ผมรักแมว`,
    reactions: {
      HEART: ["user1", "user2"],
      THUMBS_UP: ["user1", "user2"],
      THUMBS_DOWN: ["user1", "user2", "user3"],
    },
  },
  {
    id: "msg9",
    isSender: false,
    user: { name: "user6", profile: "/profile2.svg" },
    message: `ผมรักแมว`,
    reactions: {
      HEART: ["user1", "user2"],
      THUMBS_UP: ["user1", "user2"],
      THUMBS_DOWN: ["user1", "user2", "user3"],
    },
  },
];

export default ChatMock;
