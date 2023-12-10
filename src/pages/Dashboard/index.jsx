import Avatar from "../../assets/avatar_avocado.svg";
import Call from "../../assets/call.svg";
import Send from "../../assets/send.svg";
import Add from "../../assets/add.svg";
import Textarea from "../../components/Textarea";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../helpers";
import Input from "../../components/Input";
import { io } from "socket.io-client";

function Dashboard() {
  const userLoggin = JSON.parse(localStorage.getItem("user"));
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [usersWithoutSearch, setUsersWithoutSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://13.49.21.187:4080"));
  }, []);

  const fetchConversations = useCallback(async () => {
    const { data } = await axios({
      method: "get",
      url: `http://13.49.21.187:4000/api/conversations/${userLoggin.id}`,
    });
    setConversations([...data]);
  }, [userLoggin.id]);

  useEffect(() => {
    socket?.emit("addUser", userLoggin?.id);
    socket?.on("getUsers", (users) => {
      console.log("Active users", users);
    });
    socket?.on("getMessage", (data) => {
      console.log("Data Message >>>>", data);
      fetchConversations();
      setMessages((prev) => {
        return [...prev, data];
      });
    });
  }, [socket, userLoggin.id, fetchConversations]);

  useEffect(() => {
    fetchConversations();
  }, [userLoggin.id, fetchConversations]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios({
        method: "get",
        url: `http://13.49.21.187:4000/api/users`,
      });

      const conversationEmail = conversations.map(
        (conversation) => conversation.contact.email
      );

      const dataFilter = data.filter((user) => {
        if (
          conversationEmail.includes(user.email) ||
          user.email === userLoggin.email
        ) {
          return false;
        } else {
          return true;
        }
      });
      setUsersWithoutSearch([...dataFilter]);
      setUsers([...dataFilter]);
    }
    fetchUsers();
  }, [conversations, userLoggin.email]);

  useEffect(() => {
    if (search.length >= 3) {
      const usersFilter = usersWithoutSearch.filter((user) =>
        user.email.includes(search)
      );
      setUsers([...usersFilter]);
    } else {
      setUsers([...usersWithoutSearch]);
    }
  }, [search, usersWithoutSearch]);

  async function fetchMessages(conversaion_id) {
    const { data } = await axios({
      method: "get",
      url: `http://13.49.21.187:4000/api/messages/${conversaion_id}`,
    });
    setMessages([...data]);
  }

  async function sendMessage(conversation_id, content) {
    await axios({
      method: "post",
      url: `http://13.49.21.187:4000/api/messages`,
      data: {
        conversation_id,
        sender_id: userLoggin.id,
        content,
        receiver_id: currentConversation.contact.id,
      },
    })
      .then(({ data }) => {
        console.log(data);
        socket.emit("sendMessage", {
          id: data.message.id,
          sender_id: userLoggin.id,
          content,
          receiver_id: currentConversation.contact.id,
          updated_at: data.message.updated_at,
          conversation_id: data.message.conversation_id,
        });
        setMessage("");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    console.log("Users >>>>", users);
  }, [users]);

  useEffect(() => {
    console.log("Current Conversation >>>>", currentConversation);
  }, [currentConversation]);

  useEffect(() => {
    console.log("Conversation >>>>", conversations);
  }, [conversations]);

  useEffect(() => {
    console.log("Message >>>>", message);
  }, [message]);

  useEffect(() => {
    console.log("Messages >>>>", messages);
  }, [messages]);

  return (
    <div className="w-screen flex">
      <div className="w-[25%] h-screen bg-white overflow-scroll">
        <div className="flex items-center my-8 mx-14">
          <div className="border border-primary p-[2px] rounded-full">
            <img src={Avatar} alt="Avatar icon" width={75} height={75} />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl">{userLoggin.full_name}</h3>
            <p className="text-lg font-light">{userLoggin.email}</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10">
          <div className="text-primary text-lg">Contacts</div>
          <div>
            {conversations.map(({ id, contact, img }) => {
              return (
                <div
                  className="flex items-center py-8 border-b border-b-gray-300 "
                  key={id}
                >
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                      fetchMessages(id);
                      setCurrentConversation({ id, contact });
                    }}
                  >
                    <div className="border border-primary p-[2px] rounded-full">
                      <img
                        src={img || Avatar}
                        alt="Avatar icon"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">
                        {contact.full_name}
                      </h3>
                      <p className="text-sm font-light text-gray-400">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[50%] h-screen flex flex-col items-center">
        {currentConversation !== undefined && (
          <div className="bg-white w-[75%] h-[80px] my-14 rounded-full flex items-center px-14 shadow-lg">
            <div className="cursor-pointer">
              <img src={Avatar} alt="Call icon" width={60} height={60} />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg">
                {currentConversation.contact.full_name}
              </h3>
              <p className="text-sm font-light text-gray-400">
                {currentConversation.contact.email}
              </p>
            </div>
            <div className="cursor-pointer">
              <img src={Call} alt="Avatar icon" width={24} height={24} />
            </div>
          </div>
        )}
        <div
          className={`${
            currentConversation !== undefined ? "h-[75%]" : "h-[100%]"
          } w-full border-b overflow-scroll`}
        >
          <div className="p-14">
            {currentConversation !== undefined ? (
              messages.length > 0 ? (
                messages.map(({ content, sender_id, id, updated_at }) => {
                  if (sender_id === userLoggin.id) {
                    return (
                      <div className="max-w-[40%] ml-auto mb-6" key={id}>
                        <p className="text-sm font-light text-gray-400 text-end">
                          {formatDate(updated_at)}
                        </p>
                        <div className="w-full bg-primary text-white rounded-b-xl rounded-tl-xl p-4">
                          {content}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="max-w-[40%] mb-6" key={id}>
                        <span className="text-sm font-light text-gray-400">
                          {formatDate(updated_at)}
                        </span>
                        <div className="w-full bg-white rounded-b-xl rounded-tr-xl p-4">
                          {content}
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <p className="text-2xl text-center">No Message</p>
              )
            ) : (
              <p className="text-2xl text-center">No conversation selected</p>
            )}
          </div>
        </div>
        {currentConversation !== undefined && (
          <div className="p-14 w-full bg-white flex items-center">
            <Textarea
              name="message"
              placeholder="Type a message..."
              className="w-[75%]"
              textareaClassName="p-4 ring-0 shadow-md"
              isRequired={false}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              className="cursor-pointer ml-4 p-2 bg-secondary rounded-full"
              onClick={() => sendMessage(currentConversation.id, message)}
            >
              <img src={Send} alt="Send icon" width={30} height={30} />
            </div>
            <div className="cursor-pointer ml-4 p-2 bg-secondary rounded-full">
              <img src={Add} alt="Add icon" width={30} height={30} />
            </div>
          </div>
        )}
      </div>
      <div className="w-[25%] h-screen bg-white overflow-scroll">
        <div className="mx-14 mt-10">
          <div className="text-primary text-lg mb-6">Users</div>
          <Input
            name="search"
            placeholder="Find user"
            className="w-[100%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            {users.length > 0 ? (
              users.map(({ id, full_name, email, img }) => {
                return (
                  <div
                    className="flex items-center py-8 border-b border-b-gray-300 "
                    key={id}
                  >
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        setMessages([]);
                        setCurrentConversation({
                          id: "new",
                          contact: { id, full_name, email },
                        });
                      }}
                    >
                      <div className="border border-primary p-[2px] rounded-full">
                        <img
                          src={img || Avatar}
                          alt="Avatar icon"
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">{full_name}</h3>
                        <p className="text-sm font-light text-gray-400">
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xl text-gray-400 text-center mt-8">
                No user found 🫠
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
