import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navi from '../main/Navi';
import "../css/QnAList.css";
import Pagination from "./Qna_page";

const QnaList = ({ history }) => {

    const [datas, setDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (datas) => {
        let currentPosts = 0;
        currentPosts = datas.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('로그인 후 사용할 수 있습니다.');
            history.push('/login');
            return;
        }

        axios.get('http://localhost:8080/qna',
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                setDatas(response.data);
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 후 다시 접속해 주세요.');
                    history.push('/login');
                }
            });
    }, []);


    return (
        <div>
            <Navi />
            <div className="qna_container">
                <div className="qna_title">QnA</div>
                <div className="qna_list_container">
                    <div className="qna_list_bar">
                        <div className="qna_list_num">글번호</div>
                        <div className="qna_list_id">작성자</div>
                        <div className="qna_list_title">제목</div>
                        <div className="qna_list_view">조회수</div>
                        <div className="qna_list_date">작성일</div>
                    </div>
                    <table className="qna_content">
                        <tbody>
                            {datas.length === 0 && (
                                <tr>
                                    <td>등록된 글이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                        <tbody>
                            {currentPosts(datas) && currentPosts(datas).map(qna => (
                                <tr key={qna.qnaId}>
                                    <td className="qna_list_num">{qna.qnaId}</td>
                                    <td className="qna_list_id">{qna.qnaCreatedId}</td>
                                    <td className="qna_list_title">
                                        <Link to={`/qna/detail/${qna.qnaId}`}>{qna.qnaTitle}</Link></td>
                                    <td className="qna_list_view">{qna.qnaHitCnt}</td>
                                    <td className="qna_list_date">{qna.qnaCreatedDt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="qna_page_btn">
                    <div className="qna_page">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={datas.length}
                            paginate={setCurrentPage}
                        ></Pagination>
                    </div>
                    <div className="qna_btn">
                        <Link to={`/qna/write`}>글쓰기</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QnaList;
