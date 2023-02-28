import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navi from "../Navi";

const QnaWrite = ({ history }) => {

    const [qnaTitle, setQnaTitle] = useState("");
    const [qnaContents, setQnaContents] = useState("");
    const [userName, setUserName] = useState('');


    const handlerChangeQnaTitle = e => setQnaTitle(e.target.value);
    const handlerChangeQnaContents = e => setQnaContents(e.target.value);
    const handlerChangeUserName = e => setUserName(e.target.value);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decoded_token = jwt_decode(token);
        console.log(decoded_token);
        setUserName(decoded_token.name);
    }, [])

    const handlerSubmit = e => {
        e.preventDefault();

        axios.post(`http://192.168.0.53:8080/qna/write`,
            { qnaTitle, qnaContents, userName },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                if (response.data.count === 1) {
                    alert(`${response.data.message} (게시판 번호: ${response.data.qnaId})`);
                    history.push('/qna');
                } else {
                    alert('게시글 등록에 실패했습니다.');
                    return;
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div>
                <Navi />
            </div>
            <div className="qna_write_container">
                <h2>MYGD에 대해 궁금한 점을 문의해보세요.</h2>
                <form id="frm" name="frm" onSubmit={handlerSubmit}>
                    <table className="qna_write">
                        <tbody>
                            <tr className="qna_write_title">
                                <td>제목</td>
                                <td><input type="text" id="qnaTitle" name="qnaTitle" value={qnaTitle} onChange={handlerChangeQnaTitle} /></td>
                            </tr>
                            <tr>
                                <td>작성자</td>
                                <td id="userName" name="userName" value={userName} onChange={handlerChangeUserName}>{userName}</td>
                            </tr>
                            <tr className="qna_write_contents">
                                <td colSpan="2"><textarea id="qnaContents" name="qnaContents" value={qnaContents} onChange={handlerChangeQnaContents}></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="qna_write_button">
                        <input type="submit" id="submit" value="저장" className="btn" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default QnaWrite;