import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";

import EmojiPicker from "emoji-picker-react";
import emoji from "../images/emoji.svg";
import styles from "../styles/Chat.module.css";
import Messages from "./Messages";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState({ room: "", user: "" });
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState([]);
    const [users, setUsers] = useState(0);

    console.log(users);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit("join", searchParams);
    }, [search]);

    useEffect(() => {
        socket.on("message", ({ data }) => {
            setState((_state) => [..._state, data]);
        });
    }, []);

    useEffect(() => {
        socket.on("room", ({ data: { users } }) => {
            setUsers(users.length);
        });
    });

    const exitRoom = () => {
        socket.emit("exit", { params });
        navigate("/");
    };

    const handleChange = ({ target: { value } }) => setMessage(value);

    const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message) return;
        socket.emit("sendMessage", { message, params });
        setMessage("");
    };

    return (
        <div className={styles["wrap"]}>
            <div className={styles["header"]}>
                <div className={styles["title"]}>Чат: {params.room}</div>
                <div className={styles["users"]}>
                    {users} пользователей в чате
                </div>
                <button onClick={exitRoom} className={styles["left"]}>
                    Выйти
                </button>
            </div>

            <div className={styles["messages"]}>
                <Messages messages={state} name={params.name} />
            </div>

            <form onSubmit={handleSubmit} className={styles["form"]}>
                <div className={styles["input"]}>
                    <input
                        value={message}
                        onChange={handleChange}
                        className={styles["input"]}
                        type="text"
                        placeholder="Сообщение"
                    />
                </div>

                <div className={styles["emoji"]}>
                    <img
                        onClick={() => setIsOpen(!isOpen)}
                        src={emoji}
                        alt="emoji"
                    />

                    {isOpen && (
                        <div className={styles["emojies"]}>
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>

                <button onClick={handleSubmit} className={styles["button"]}>
                    <input type="sumbit" value={"Отправить"} />
                </button>
            </form>
        </div>
    );
};

export default Chat;
