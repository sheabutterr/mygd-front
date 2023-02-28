import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navi.css";
import jwt_decode from "jwt-decode";


const GuestNavi = () => {
    return (
        <>
            <div className="navi_bar">

                <div className="navi_login"><Link to="/login" style={{ textDecoration: "none", color: "black" }}>로그인</Link></div>
                <div className="navi_join"><Link to="/join" style={{ textDecoration: "none", color: "black" }}>회원가입</Link></div>
            </div>
        </>
    );
}

const UserNavi = ({ logout, userId }) => {
    return (
        <>
            <div className="navi_bar">
                <div className="navi_mypage"><Link to="/myPage" style={{ textDecoration: "none", color: "black" }}>My Page</Link></div>
                <div className="navi_logout"><button className="navi_button" onClick={logout}>Logout</button></div>
                <div className="navi_name">{userId} 님 환영합니다.</div>
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
        window.location.replace('/main');
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
            <div className="navi_all">
                <div>
                    {isLoggedIn ? <UserNavi logout={handlerLogOut} userId={userId} /> : <GuestNavi />}
                </div>
                <div className="main_bar">
                    <div className="main_menu">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Link to="/classList/classLow" ><p className="main_text">강의소개</p></Link>
                    </div>
                    <div className="main_menu">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Link to="/apply" ><p className="main_text">수강신청</p></Link>
                    </div>
                    <div className="main_menu">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Link to="/level" ><p className="main_text">레벨테스트</p></Link>
                    </div>
                    <div className="main_menu">
                        <Link to="/main" ><img className="logo_image" src="http://192.168.0.53:3000/image/logo.png" ></img></Link>
                    </div>
                    <div className="main_menu">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Link to="/community" ><p className="main_text">커뮤니티</p></Link>
                    </div>
                    <div className="main_menu">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Link to="/qna" ><p className="main_text">고객센터</p></Link>
                    </div>
                    <div className="main_menu">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <p style={{ fontSize: "20px", fontWeight: "600" }}>환영합니다</p>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Navi;