import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Navi from "../Navi";
import "./MyPage.css";

const MyPage = ({ match, history }) => {

    const [userIdx, setUserIdx] = useState('');
    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [levelName, setLevelName] = useState('');
    const [className, setClassName] = useState('');

    const handlerChangeUserName = e => setUserName(e.target.value);
    const handlerChangeUserEmail = e => setUserEmail(e.target.value);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decoded_token = jwt_decode(token);
        console.log(decoded_token);
        setUserId(decoded_token.sub);
        setUserIdx(decoded_token.userIdx);

        let userIdx = decoded_token.userIdx;

        axios.get(`http://192.168.0.53:8080/myInfo/${userIdx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                setLevelName(response.data.levelName);
                setClassName(response.data.className);
                setUserName(response.data.userName);
                setUserEmail(response.data.userEmail);
            });
    }, []);

    const handlerClickUpdate = () => {
        axios.put(`http://192.168.0.53:8080/myInfo/${userIdx}`,
            { "userId": userId, "userEmail": userEmail, "userName": userName, "userPassword": userPassword },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response)
                if (response.data === 1) {
                    alert('정상적으로 수정되었습니다.');
                } else {
                    alert('수정에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error)
                alert(`수정에 실패했습니다.`);
                return;
            });
    };

    return (
        <>
            <div>
                <Navi />
            </div>
            <div className="mp_container">
                <div className="title"><h1>MyPage</h1></div>
                <div className="mpbox">
                    <div className="content">
                        <label>아이디</label><input type="text" id="userId" name="userId" value={userId} readOnly={true} />
                    </div>
                    <div className="content">
                        <label>이름</label><input type="text" id="userName" name="userName" value={userName} onChange={handlerChangeUserName} />
                    </div>
                    <div className="content">
                        <label>이메일</label><input type="text" id="userEmail" name="userEmail" value={userEmail} onChange={handlerChangeUserEmail} />
                    </div>
                    <div className="content">
                        <label>레벨</label><input type="text" id="levelName" name="levelName" value={levelName} readOnly={true} />
                    </div>
                    <div className="content">
                        <label>클래스</label><input type="text" id="className" name="className" value={className} readOnly={true} />
                    </div>
                    <button className="mp_button" onClick={handlerClickUpdate}>수정</button>
                </div>
            </div>
        </>
    );
};

export default MyPage;