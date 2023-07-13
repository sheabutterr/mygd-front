import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navi from "../main/Navi";
import "../css/QnAWrite.css";

const QnaWrite = ({ history }) => {

    const [qnaTitle, setQnaTitle] = useState("");
    const [qnaContents, setQnaContents] = useState("");
    const [userName, setUserName] = useState('');

    const handlerChangeQnaTitle = e => setQnaTitle(e.target.value);
    const handlerChangeQnaContents = e => setQnaContents(e.target.value);
    const handlerClickList = () => history.push('/qna');

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decoded_token = jwt_decode(token);
        setUserName(decoded_token.name);
    }, [])

    const handlerSubmit = e => {
        e.preventDefault();

        axios.post(`http://localhost:8080/qna/write`,
            { qnaTitle, qnaContents, userName },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                if (response.data.count === 1) {
                    alert(`등록되었습니다`);
                    history.push('/qna');
                } else {
                    alert('게시글 등록에 실패했습니다.');
                    return;
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <Navi />
            <div className="qna_write_container">
                <div className="qna_wirte_title">MYGD에 대해 궁금한 점이 있으신가요?</div>
                <form id="frm" name="frm">
                    <div className="qna_text_id">작성자 : {userName}</div>
                    <div className="qna_text_title">
                        <input type="text" value={qnaTitle}
                            placeholder="제목을 입력하세요" onChange={handlerChangeQnaTitle} />
                    </div>
                    <div className="qna_write_contents">
                        <textarea id="qnaContents" name="qnaContents" value={qnaContents}
                            placeholder="내용을 입력하세요"
                            onChange={handlerChangeQnaContents} />
                    </div>
                </form>
                <div className="qna_write_button">
                    <input type="button" value="목록으로" onClick={handlerClickList} />
                    <input type="submit" value="저장" onClick={handlerSubmit} />
                </div>
            </div>
        </div>
    )
}

export default QnaWrite;