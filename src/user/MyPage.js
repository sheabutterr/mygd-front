import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Navi from "../main/Navi";
import "../css/MyPage.css";

const MyPage = () => {

    const [userIdx, setUserIdx] = useState('');
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

        axios.get(`http://localhost:8080/myInfo/${userIdx}`,
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
        axios.put(`http://localhost:8080/myInfo/${userIdx}`,
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
        <div className="my_container">
            <Navi />
            <div className="my_title">MyPage</div>
            <p>*이름과 이메일만 변경 가능합니다</p>
            <div className="my_content_container">
                <div className="my_content">
                    <div className="my_id">
                        <label>아이디</label>
                        <input type="text" value={userId} readOnly={true} />
                    </div>
                    <div className="my_name">
                        <label>*이름</label>
                        <input type="text" value={userName} onChange={handlerChangeUserName} />
                    </div>
                    <div className="my_email">
                        <label>*이메일</label>
                        <input type="text" value={userEmail} onChange={handlerChangeUserEmail} />
                    </div>
                    <div className="my_level">
                        <label>레벨</label>
                        <input type="text" value={levelName} readOnly={true} />
                    </div>
                    <div className="my_class">
                        <label>클래스</label>
                        <input type="text" value={className} readOnly={true} />
                    </div>
                </div>
            </div>
            <div className="my_btn">
                <button onClick={handlerClickUpdate}>수정 완료</button>
            </div>
        </div>
    );
};

export default MyPage;