import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Main.module.css";

const Main = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className={styles["wrap"]}>
            <div className={styles["container"]}>
                <h1 className={styles["heading"]}>Вход</h1>

                <form className={styles["form"]}>
                    <div className={styles["grop"]}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles["input"]}
                            type="text"
                            placeholder="Имя"
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className={styles["grop"]}>
                        <input
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className={styles["input"]}
                            type="text"
                            placeholder="Комната"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <Link
                        className={styles.grop}
                        to={`/chat?name=${name}&room=${room}`}
                    >
                        <button type="sumbit" className={styles["button"]}>
                            Войти
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Main;
