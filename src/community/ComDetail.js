import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navi from "../Navi";



const ComDetail = ({ match, history }) => {

    const { comId } = match.params;
    const [com, setCom] = useState([]);
    const [comTitle, setComTitle] = useState('');
    const [comContents, setComContents] = useState('');
    const [recommend, setRecommend] = useState('');
    const [checked, setChecked] = useState(false);
    const [idCheck, setIdCheck] = useState(false);

    const handlerChangeComTitle = e => setComTitle(e.target.value);
    const handlerChangeComContents = e => setComContents(e.target.value);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decoded_token = jwt_decode(token);
        console.log(decoded_token);

        axios.get(`http://192.168.0.53:8080/community/${comId}`,
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

    const UpdateButton = () => {
        return (
            <>
                <div>
                    {idCheck ? <WriterButton /> : <ReadOnlyButton />}
                </div>
            </>
        )
    };

    const WriterButton = () => {
        return (
            <>
                <input type="button" id="list" className="btn" value="목록으로" onClick={handlerClickList} />
                <input type="button" id="edit" className="btn" value="수정하기" onClick={handlerClickUpdate} />
                <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickDelete} />
            </>
        )
    };

    const ReadOnlyButton = () => {
        return (
            <>
                <input type="button" id="list" className="btn" value="목록으로" onClick={handlerClickList} />
            </>
        )
    };

    const handlerClickList = () => history.push('/community');
    const handlerClickUpdate = () => {
        axios.put(`http://192.168.0.53:8080/community/${com.comId}`,
            { "comTitle": comTitle, "comContents": comContents, "recommend": recommend }
            , { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response)
                if (response.data === 1) {
                    alert('정상적으로 수정되었습니다.');
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
        axios.delete(`http://192.168.0.53:8080/community/${com.comId}`,
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
            </div>
            <div className="community_detail_container">
                <h2>게시판 상세</h2>
                <form action="" method="POST" id="frm" name="frm">
                    <input type="hidden" name="comId" />
                    <table className="community_detail">
                        <colgroup>
                            <col width="15%" />
                            <col width="35%" />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">글번호</th>
                                <td>{com.comId}</td>
                                <th scope="row">조회수</th>
                                <td>{com.comHitCnt}</td>
                            </tr>
                            <tr>
                                <th scope="row">작성자</th>
                                <td>{com.comCreatedId}</td>
                                <th scope="row">작성일</th>
                                <td>{com.comCreatedDt}</td>
                            </tr>
                            <tr className="community_detail_title">
                                <th scope="row">제목</th>
                                <td colSpan="3">
                                    <input type="text" id="comTitle" name="comTitle" value={comTitle} onChange={handlerChangeComTitle} />
                                </td>
                            </tr>
                            <tr className="community_detail_contents">
                                <td colSpan="4" className="view_text">
                                    <textarea title="내용" id="comContents" name="comContents" value={comContents} onChange={handlerChangeComContents}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <UpdateButton />
            </div>
        </>
    );

};
export default ComDetail;