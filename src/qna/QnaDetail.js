import axios from 'axios';
import { useEffect, useState } from 'react';
import Navi from '../main/Navi';
import jwt_decode from "jwt-decode";
import "../css/QnADetail.css";

const QnaDetail = ({ match, history }) => {

    const { qnaId } = match.params;
    const [userIdx, setUserIdx] = useState('');
    const [qna, setQna] = useState({});
    const [qnaTitle, setQnaTitle] = useState("");
    const [qnaContents, setQnaContents] = useState("");
    const [reply, setReply] = useState("관리자만 작성할 수 있습니다.");

    const handlerChangeQnaTitle = e => setQnaTitle(e.target.value);
    const handlerChangeQnaContents = e => setQnaContents(e.target.value);
    const handlerChangeReply = e => setReply(e.target.value);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decoded_token = jwt_decode(token);
        console.log(decoded_token);
        setUserIdx(decoded_token.userIdx);

        let userIdx = decoded_token.userIdx;

        axios.get(`http://localhost:8080/qna/${qnaId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                setQna(response.data);
                setQnaTitle(response.data.qnaTitle);
                setQnaContents(response.data.qnaContents);
                setReply(response.data.reply);
            })
            .catch(error => console.log(error));
    }, []);

    const handlerClickList = () => history.push('/qna');
    const handlerClickUpdate = () => {
        axios.put(`http://localhost:8080/qna/${qna.qnaId}`,
            { "qnaTitle": qnaTitle, "qnaContents": qnaContents },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                if (response.data === 1) {
                    alert('정상적으로 수정되었습니다.');
                } else {
                    alert('수정에 실패했습니다.');
                    return;
                }
            })
            .catch(error => console.log(error));
    }

    const handlerUpdateReply = () => {

        if (userIdx != 1) {
            alert('관리자만 등록할 수 있습니다');
            return;
        }

        axios.put(`http://localhost:8080/reply/${qna.qnaId}`,
            { "reply": reply },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                if (response.data === 1) {
                    alert('정상적으로 수정되었습니다.');
                } else {
                    alert('수정에 실패했습니다.');
                    return;
                }
            })
            .catch(error => console.log(error));
    }


    const handlerClickDelete = () => {
        axios.delete(`http://localhost:8080/qna/${qna.qnaId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                if (response.data === 1) {
                    alert('정상적으로 삭제되었습니다.');
                    history.push('/qna');
                } else {
                    alert('삭제에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    };

    return (
        <>
            <div>
                <Navi />
                <div className="qna_detail_container">
                    <form action="" method="POST" id="frm" name="frm">
                        <div className="qna_detail_box">
                            <div className="qna_title_box1">
                                <div>작성자 : {qna.qnaCreatedId}</div>
                                <div>조회수 : {qna.qnaHitCnt}</div>
                            </div>
                            <div className="qna_title_box2">
                                <div>글번호 : {qna.qnaId}</div>
                                <div>작성일 : {qna.qnaCreatedDt}</div>
                            </div>
                        </div>
                        <div className="qna_detail_text_box">
                            <div className="qna_detail_text_title">제목</div>
                            <input type="text" value={qnaTitle}
                                maxLength={70} onChange={handlerChangeQnaTitle} />
                        </div>
                        <div className="qna_detail_contents">
                            <textarea value={qnaContents} onChange={handlerChangeQnaContents}></textarea>
                        </div>
                        <div className="qna_reply">
                            <textarea title="댓글" value={reply} onChange={handlerChangeReply}></textarea>
                        </div>
                    </form>
                    <div className="qna_detail_btn">
                        <input type="button" value="댓글등록" onClick={handlerUpdateReply} />
                        <input type="button" value="목록으로" onClick={handlerClickList} />
                        <input type="button" value="수정하기" onClick={handlerClickUpdate} />
                        <input type="button" value="삭제하기" onClick={handlerClickDelete} />
                    </div>

                </div>
            </div>
        </>
    );
}

export default QnaDetail;
