import { useState } from "react";
import axios from "axios";
import Navi from "../main/Navi";
import "../css/Join.css";

const Join = ({ history }) => {

    const [userId, setUserId] = useState('');
    const [userPassword, setUserpassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handlerChangeUserId = e => setUserId(e.target.value);
    const handlerChangeUserPassword = e => setUserpassword(e.target.value);
    const handlerChangeUserName = e => setUserName(e.target.value);
    const handlerChangeUserEmail = e => setUserEmail(e.target.value);

    const handlerOnClick = e => {
        e.preventDefault();
        axios.post(`http://localhost:8080/regist`, { userId, userPassword, userEmail, userName })
            .then(response => {
                console.log(response);
                if (response.data) {
                    alert('정상적으로 가입 되었습니다.')
                    history.push('/');
                }
            })
            .catch(error => {
                console.log(error);
                alert('확인 후 다시 시도해주세요.')
            });
    };

    return (
        <div>
            <Navi />
            <div className="join_container">
                <div className="join_title">JOIN</div>
                <div className="join_content_container">
                    <div className="join_content">
                        <div className="join_id">
                            <label>아이디</label>
                            <input type="text" placeholder="아이디를 입력해주세요." value={userId} onChange={handlerChangeUserId} />
                        </div>
                        <div className="join_pw">
                            <label>비밀번호</label>
                            <input type="text" placeholder="비밀번호를 입력해주세요." value={userPassword} onChange={handlerChangeUserPassword} />
                        </div>
                        <div className="join_name">
                            <label>이름</label>
                            <input type="text" placeholder="이름을 입력해주세요." value={userName} onChange={handlerChangeUserName} />
                        </div>
                        <div className="join_email">
                            <label>이메일</label>
                            <input type="text" placeholder="이메일을 입력해주세요." value={userEmail} onChange={handlerChangeUserEmail} />
                        </div>
                    </div>
                </div>
                <div className="join_button">
                    <button onClick={handlerOnClick}>join</button>
                </div>
            </div>
        </div>
    );
};

export default Join;