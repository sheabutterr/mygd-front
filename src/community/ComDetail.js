import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navi from "../main/Navi";
import "../css/ComDetail.css";

const ComDetail = ({ match, history }) => {

    const { comId } = match.params;
    const [com, setCom] = useState([]);
    const [comTitle, setComTitle] = useState('');
    const [comContents, setComContents] = useState('');
    const [recommend, setRecommend] = useState('');
    const [idCheck, setIdCheck] = useState(false);

    const handlerChangeComTitle = e => setComTitle(e.target.value);
    const handlerChangeComContents = e => setComContents(e.target.value);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decoded_token = jwt_decode(token);
        console.log(decoded_token);

        axios.get(`http://localhost:8080/community/${comId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response)
                setCom(response.data);
                setComTitle(response.data.comTitle);
                setComContents(response.data.comContents);
                setRecommend(response.data.recommend);

                if (response.data.comCreatedId === decoded_token.sub) {
                    console.log(true);
                    setIdCheck(true);
                } else {
                    console.log(false);
                    setIdCheck(false);
                };

            })
            .catch(error => console.log(error));
    }, []);


    const handlerClickList = () => history.push('/community');
    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/community/${com.comId}`,
            { "comTitle": comTitle, "comContents": comContents, "recommend": recommend }
            , { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response)
                if (response.data === 1) {
                    alert('정상적으로 수정되었습니다.');
                    history.push(`/community`);
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
    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/community/${com.comId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response)
                if (response.data === 1) {
                    alert('정상적으로 삭제되었습니다.');
                    history.push(`/community`);
                } else {
                    alert('삭제에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error)
                alert(`삭제에 실패했습니다.`);
                return;
            });
    };

    return (
        <>
            <div>
                <Navi />
                <div className="community_detail_container">
                {/* <div className="com_detail_title">커뮤니티</div> */}
                    <form action="" method="POST" id="frm" name="frm">
                        <div className="community_detail_box">
                            <div className="com_title_box1">
                                <div>작성자 : {com.comCreatedId}</div>
                                <div>조회수 : {com.comHitCnt}</div>
                            </div>
                            <div className="com_title_box2">
                                <div>글번호 : {com.comId}</div>
                                <div>작성일 : {com.comCreatedDt}</div>
                            </div>
                        </div>
                        <div className="com_detail_text_box">
                            <div className="com_detail_text_title">제목</div>
                            <input type="text" value={comTitle}
                                maxLength={70} onChange={handlerChangeComTitle} />
                        </div>
                        <div className="community_detail_contents">
                            <textarea value={comContents} onChange={handlerChangeComContents}></textarea>
                        </div>
                    </form>
                    <div className="com_btn">
                        <input type="button" value="목록으로" onClick={handlerClickList} />
                        <input type="button" value="수정하기" onClick={handlerClickUpdate} />
                        <input type="button" value="삭제하기" onClick={handlerClickDelete} />
                    </div>
                </div>
            </div>
        </>
    );

}
export default ComDetail;