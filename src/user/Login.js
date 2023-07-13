import { useState } from "react";
import axios from "axios";
import Navi from "../main/Navi";
import "../css/Login.css";

const Login = ({ history }) => {

    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handlerChangeUserId = e => setUserId(e.target.value);
    const handlerChangeUserPassword = e => setUserPassword(e.target.value);

    const handlerOnClick = e => {
        axios.post(`http://localhost:8080/login`, { userId, userPassword })
            .then(response => {
                console.log(response);
                if (response.data) {
                    alert('정상적으로 로그인 되었습니다.')
                    sessionStorage.setItem("token", response.data);
                    history.push('/');
                } else {
                    alert('ID, PW가 일치하지 않습니다. 확인 후 다시 시도해주세요.')
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.log(error);
                alert('ID, PW가 일치하지 않습니다. 확인 후 다시 시도해주세요.')
                sessionStorage.clear();
            });
    };

    return (
        <div>
            <Navi />
            <div className="login_container">
                <div className="login_title">LOGIN</div>
                <div className="login_box">
                    <div>
                        <input type="text" placeholder="아이디를 입력해주세요" value={userId} onChange={handlerChangeUserId} />
                    </div>
                    <div>
                        <input type="password" placeholder="비밀번호를 입력해주세요" value={userPassword} onChange={handlerChangeUserPassword} />
                    </div>
                </div>
                <div className="login_button">
                    <button onClick={handlerOnClick}>login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;