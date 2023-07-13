import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navi from "../main/Navi";
import Pagination from "./Com_page";
import "../css/ComList.css";


const ComList = ({ history }) => {

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

        axios.get(`http://localhost:8080/community`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response)
                setDatas(response.data);
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 후 다시 접속해 주세요.')
                    history.push('/login');
                }
            });
    }, []);

    return (
        <div>
            <Navi />
            <div className="community_container">
                <div className="comunity_title">커뮤니티</div>
                <div className="community_list_container">
                    <div className="community_list_bar">
                        <div className="com_list_num">글번호</div>
                        <div className="com_list_category">카테고리</div>
                        <div className="com_list_title">제목</div>
                        <div className="com_list_view">조회수</div>
                        <div className="com_list_date">작성일</div>
                    </div>
                    <table className="community_content">
                        <tbody>
                            {datas.length === 0 && (
                                <tr>
                                    <td>등록된 글이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                        <tbody>
                            {currentPosts(datas) && currentPosts(datas).map(com => (
                                <tr key={com.comId}>
                                    <td className="com_list_num">{com.comId}</td>
                                    <td className="com_list_category">{com.categoryName}</td>
                                    <td className="com_list_title">
                                        <Link to={`/community/detail/${com.comId}`}>{com.comTitle}</Link>
                                    </td>
                                    <td className="com_list_view">{com.comHitCnt}</td>
                                    <td className="com_list_date">{com.comCreatedDt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="com_page_btn">
                    <div className="community_page">
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={datas.length}
                            paginate={setCurrentPage}
                        ></Pagination>
                    </div>
                    <div className="community_btn">
                        <Link to={`/community/write`}>글쓰기</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComList;