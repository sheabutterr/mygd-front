import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navi from "../Navi";

const ComWrite = ({ match, history }) => {
    const [comTitle, setComTitle] = useState('');
    const [comContents, setComContents] = useState('');
    const [comCreatedId, setComCreatedId] = useState('');
    const { userIdx } = match.params;
    const [userName, setUserName] = useState('');
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const handlerChangeComTitle = e => setComTitle(e.target.value);
    const handlerChangeComContents = e => setComContents(e.target.value);
    const handlerChangeUserName = e => {
        setUserName(e.target.value);
        setComCreatedId(userName);
    };
    const handlerChangeCategory = e => setCategoryId(e.target.value);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decoded_token = jwt_decode(token);

        setUserName(decoded_token.name);

        axios.get(`http://192.168.0.53:8080/category`)
            .then(response => {
                console.log(response)
                setCategory(response.data);
                setCategoryId(response.data.categoryId);
                setCategoryName(response.data.categoryName);
            })
            .catch(error => console.log(error));
    }, [])


    const handlerSubmit = e => {
        e.preventDefault();

        console.log(">>>>>>>>>>>>>>");
        console.log(comCreatedId);

        axios.post(`http://192.168.0.53:8080/community/write`,
            { comTitle, comContents, comCreatedId, categoryId },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                if (response.data.count === 1) {
                    alert(`${response.data.message} (게시판 번호: ${response.data.comId})`);
                    history.push('/community');
                } else {
                    alert(response.data.message);
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`${error.response.data.message} (${error.message})`);
                return;
            });

    };


    return (
        <>
            <div>
                <Navi />
            </div>
            <div className="community_write_container">
                <h2>게시판 등록</h2>
                <form id="frm" name="frm">
                    <table className="community_write">
                        <tbody>
                            <tr className="community_write_title">
                                <td>제목</td>
                                <td><input type="text" id="comTitle" name="comTitle" value={comTitle} onChange={handlerChangeComTitle} /></td>
                            </tr>
                            <tr>
                                <td>작성자</td>
                                <td id="userName" name="userName" value={userName} onChange={handlerChangeUserName}>{userName}</td>
                            </tr>
                            <tr>
                                <td>카테고리</td>
                                <td>
                                    <select id="category" name="category" onChange={handlerChangeCategory}>
                                        {category && category.map((category, index) => <option key={index} value={category.categoryId}>{category.categoryName}</option>)}
                                    </select>
                                </td>
                            </tr>
                            <tr className="community_write_contents">
                                <td colSpan="2"><textarea id="comContents" name="comContents" value={comContents} onChange={handlerChangeComContents}></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="community_write_button">
                        <input type="submit" id="submit" value="저장" className="btn" onClick={handlerSubmit} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default ComWrite;