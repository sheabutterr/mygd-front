import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navi.css";
import jwt_decode from "jwt-decode";
import logo from "../image/logo.png"

const GuestNavi = () => {
    return (
        <>
            <div className="navi_bar">
                <div className="login"><Link to="/login">log in</Link></div>
                <div className="join"><Link to="/join">join</Link></div>
            </div>
        </>
    );
}

const UserNavi = ({ logout, userId }) => {
    return (
        <>
            <div className="navi_bar">
                <div className="navi_mypage"><Link to="/myPage">{userId} 님의 마이페이지</Link></div>
                <div className="navi_logout" onClick={logout}>log out</div>
            </div>
        </>
    );
};

const Navi = () => {

    const [userId, setUserId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const handlerLogOut = e => {
        sessionStorage.removeItem('token');
        alert('로그아웃 되었습니다.');
        window.location.replace('/');
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token != null) {
            setIsLoggedIn(true);
            const decoded_token = jwt_decode(token);
            setUserId(decoded_token.sub);
        } else {
            setIsLoggedIn(false);
        };
    }, []);

    return (
        <>
            <div>
                {isLoggedIn ? <UserNavi logout={handlerLogOut} userId={userId} /> : <GuestNavi />}
            </div>
            <div className="navi_logo">
                <Link to="/" ><img src={logo} /></Link>
            </div>
            <div className="main_bar">
                <div className="main_menu"><Link to='/classList/classLow'>강의 소개</Link></div>
                <div className="main_menu"><Link to='/apply'>수강 신청</Link></div>
                <div className="main_menu"><Link to='/level'>레벨테스트</Link></div>
                <div className="main_menu"><Link to='/community'>커뮤니티</Link></div>
                <div className="main_menu"><Link to='/qna'>QnA</Link></div>
            </div>
        </>
    )
};

export default Navi;