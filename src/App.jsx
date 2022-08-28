import React from "react";
import axios from "axios";

function App() {
    const [talking, setTalking] = React.useState();
    const [history, setHistory] = React.useState();
    const [text, setText] = React.useState();

    const url = "http://127.0.0.1:8000";

    const GetPostData = () => {
        // Getリクエストを先に処理
        axios.get(url + "/history/list").then((res) => {
            setHistory(res.data);
        })
        
        // Postリクエストを後から処理
        .then((res) => {
            axios.post(url + "/chat", {user_input:text}).then((res) => {
                setTalking(res.data);
            });
        });
    };

    return (
        <div>
            <div>以下のいずれかの質問をしてください</div>
            <div>&nbsp;</div>
            <div>-こんにちは</div>
            <div>-今何時？</div>
            <div>今日の東京の天気は？</div>
            <div>&nbsp;</div>

            <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
            <button onClick={GetPostData}>送信</button>
            <div>&nbsp;</div>

            {talking && <div>{talking.response_timestamp.slice(11)} You > {talking.user_input}</div>}
            {talking && <div>{talking.response_timestamp.slice(11)} Bot > {talking.bot_response}</div>}
            <div>&nbsp;</div>

            {history && history.map((value) =>
                <div>
                    <div>{value.response_timestamp.slice(11)} You > {value.user_input}</div>
                    <div>{value.response_timestamp.slice(11)} Bot > {value.bot_response}</div>
                    <div>&nbsp;</div>
                </div>
            )
            }
        </div>
    );
}

export default App;
