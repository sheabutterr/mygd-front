import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navi from '../Navi';
import "./QnA.css";
import Pagination from "./Pagination";

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
            history.push('/main');
            return;
        }

        axios.get('http://192.168.0.53:8080/qna',
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
        <>
            <div>
                <Navi/>                
            </div> 
            <div className="qna_container">
                <h2>Q&A</h2>
                <table className="qna_list">
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">글번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">조회수</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4">일치하는 데이터가 없습니다.</td>
                                </tr>
                            )
                        }
                        {
                            currentPosts(datas) && currentPosts(datas).map(qna => (
                                <tr key={qna.qnaId}>
                                    <td>{qna.qnaId}</td>
                                    <td className="title">
                                        <Link to={`/qna/detail/${qna.qnaId}`}>{qna.qnaTitle}</Link></td>
                                    <td>{qna.qnaCreatedId}</td>
                                    <td>{qna.qnaHitCnt}</td>
                                    <td>{qna.qnaCreatedDt}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={datas.length}
                        paginate={setCurrentPage}
                    ></Pagination>
                </div>
                <div>
                    <Link to={`/qna/write`} className="btn">글쓰기</Link>
                </div>                 
            </div>
        </>
    );
};

export default QnaList;
