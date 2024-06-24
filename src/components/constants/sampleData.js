import mk from "../../assets/images/mk.jpg";

export const sampleChats = [
  {
    avatar: [mk],
    name: "mukesh prajapat",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [mk],
    name: "mayank prajapat",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [mk],
    name: "mayank prajapat",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [mk],
    name: "mayank prajapat",
    _id: "4",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [mk],
    name: "mayank prajapat",
    _id: "5",
    groupChat: false,
    members: ["1", "2"],
  },
  
];

export const sampleUsers = [
  {
    avatar: [mk],
    name: "mukesh prajapat",
    _id: "1",
  },
  {
    avatar: [mk],
    name: "mayank prajapat",
    _id: "2",
  },
];
export const sampleNotifications = [
  {
    sender: {
      avatar: [mk],
      name: "mukesh prajapat",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: [mk],
      name: "mukesh kumhar",
    },
    _id: "2",
  },
];
export const sampleMessage = [
  {
    attachments: [],
    content: " message aaya hai",
    _id: "ccjakscasxscksackacicclcjkac",
    sender: {
      _id: "user._id",
      name: "mukesh",
    },
    chat: "chatId",
    createdAt: "2024-02-26T00:00:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "dcdddldllddc",
        url: "https://www.w3schools.com/images/w3schools_green.jpg",
      },
    ],
    _id: "ccjakscasackacicclcjkac",
    sender: {
      _id: "cjahcasjchschjhc",
      name: "mukesh prajapat",
    },
    chat: "chatId",
    createdAt: "2024-02-26T00:00:00.000Z",
  },
];

export const dashboardData = {
  users: [
    {
      avatar: "https://www.w3schools.com/images/w3schools_green.jpg",
      name: "mukesh prajapat",
      _id: "1",
      username: "mukeshprajapat",
      friends: 20,
      groups: 5,
    },
    {
      avatar: "https://www.w3schools.com/images/w3schools_green.jpg",
      name: "mayank prajapat",
      _id: "2",
      username: "mukeshprajapat",
      friends: 20,
      groups: 5,
    },
  ],
  chats: [
    {
      avatar: ["https://www.w3schools.com/images/w3schools_green.jpg"],
      name: "mukesh prajapat",
      _id: "1",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar: " https://www.w3schools.com/images/w3schools_green.jpg",
        },
        {
          _id: "2",
          avatar: "https://www.w3schools.com/images/w3schools_green.jpg",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "mukesh ",
        avatar: "https://www.w3schools.com/images/w3schools_green.jpg",
      },
    },
    {
      avatar: ["https://www.w3schools.com/images/w3schools_green.jpg"],
      name: "mukesh kumhar",
      _id: "2",
      groupChat: true,
      members: [{
        _id: "1",
        avatar: " https://www.w3schools.com/images/w3schools_green.jpg",
      },
      {
        _id: "2",
        avatar: "https://www.w3schools.com/images/w3schools_green.jpg",
      },],
      totalMembers: 244,
      totalMessages: 23,
      creator: {
        name: "mayan ",
        avatar: "https://www.w3schools.com/images/w3schools_green.jpg",
      },
    },
],
    messages:[{
      attachments: [],
      content: " message aaya hai",
      _id: "ccjakscasxscksackacicclcjkac",
      sender: {
        avatar: "https://www.w3schools.com/images/w3schools_green.jpg",
        name: "mukesh",
      },
      chat: "chatId",
      groupChat:false,
      createdAt: "2024-02-26T00:00:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "dcdddldllddc",
          url: "https://www.w3schools.com/images/w3schools_green.jpg",
        },
      ],
      _id: "ccjakscasackacicclcjkac",
      sender: {
        avatar: "https://www.w3schools.com/images/w3schools_green.jpg",
        name: "mukesh prajapat",
      },
      chat: "chatId",
      groupChat:true,
      createdAt: "2024-02-26T00:00:00.000Z",
    },
  ]
}

