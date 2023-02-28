import axios from 'axios';
import { useEffect, useState } from 'react';
import Navi from '../Navi';
import jwt_decode from "jwt-decode";

function QnaDetail({ match, history }) {
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

        axios.get(`http://192.168.0.53:8080/qna/${qnaId}`,
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
        axios.put(`http://192.168.0.53:8080/qna/${qna.qnaId}`,
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
            alert ('관리자만 등록할 수 있습니다');
            return;
        }

        axios.put(`http://192.168.0.53:8080/reply/${qna.qnaId}`,
            { "reply" : reply },
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
        axios.delete(`http://192.168.0.53:8080/qna/${qna.qnaId}`,
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
                <Navi/>                
            </div> 
            <div className="qna_detail_container">
                <h2>게시판 상세</h2>
                <form action="" method="POST" id="frm" name="frm">

                    <input type="hidden" name="qnaId" />

                    <table className="qna_detail">
                        <colgroup>
                            <col width="15%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">글번호</th>
                                <td>{qna.qnaId}</td>
                                <th scope="row">조회수</th>
                                <td>{qna.qnaHitCnt}</td>
                            </tr>
                            <tr>
                                <th scope="row">작성자</th>
                                <td>{qna.qnaCreatedId}</td>
                                <th scope="row">작성일</th>
                                <td>{qna.qnaCreatedDt}</td>
                            </tr>
                            <tr className='qna_detail_title'>
                                <th scope="row">제목</th>
                                <td colSpan="3">
                                    <input type="text" id="qnaTitle" name="qnaTitle" value={qnaTitle} onChange={handlerChangeQnaTitle} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="qna_detail_contents">
                                    <textarea title="내용" id="qnaContents" name="qnaContents" value={qnaContents} onChange={handlerChangeQnaContents}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="qna_detail_reply">
                                    <textarea title="댓글" id="reply" name="reply" value={reply} onChange={handlerChangeReply}></textarea>
                                    <input type="button" id="updateReply" className='btn' value="댓글등록" onClick={handlerUpdateReply} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <input type="button" id="list" className="btn" value="목록으로" onClick={handlerClickList} />
                <input type="button" id="edit" className="btn" value="수정하기" onClick={handlerClickUpdate} />
                <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickDelete} />
            </div>
        </>
    );
}

export default QnaDetail;
