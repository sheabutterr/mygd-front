import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navi from "../main/Navi";
import "../css/ComWrite.css";


const ComWrite = ({ history }) => {
    const [comTitle, setComTitle] = useState('');
    const [comContents, setComContents] = useState('');
    const [comCreatedId, setComCreatedId] = useState('');
    const [userName, setUserName] = useState('');
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const handlerChangeComTitle = e => setComTitle(e.target.value);
    const handlerChangeComContents = e => setComContents(e.target.value);
    const handlerChangeCategory = e => setCategoryId(e.target.value);
    const handlerClickList = () => history.push('/community');

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decoded_token = jwt_decode(token);

        setUserName(decoded_token.name);

        axios.get(`http://localhost:8080/category`)
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
        axios.post(`http://localhost:8080/community/write`,
            { comTitle, comContents, comCreatedId, categoryId },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log(response);
                if (response.data.count === 1) {
                    alert(`등록되었습니다`);
                    history.push('/community');
                } else {
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`카테고리를 지정해주세요`);
                return;
            });
    };


    return (
        <div>
            <Navi />
            <div className="community_write_container">
                <div className="com_wirte_title">커뮤니티</div>
                <form id="frm" name="frm">
                    <div className="com_name_box">
                        <div className="com_id">작성자 : {userName}</div>
                        <div className="com_category">
                            <div className="com_category_title">카테고리</div>
                            <select onChange={handlerChangeCategory}>
                                {category && category.map((category, index) => <option key={index} value={category.categoryId}>{category.categoryName}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="community_text_box">
                        <div className="community_text_title">
                            <input type="text" value={comTitle} placeholder="제목을 입력하세요"
                                maxLength={70} onChange={handlerChangeComTitle} />
                        </div>
                        <div className="community_write_contents">
                            <textarea value={comContents} placeholder="내용을 입력하세요" onChange={handlerChangeComContents} />
                        </div>
                    </div>
                </form>
                <div className="community_write_button">
                <input type="button" value="목록으로" onClick={handlerClickList} />
                    <input type="submit" value="저장" onClick={handlerSubmit} />
                </div>
            </div>
        </div>
    );
};

export default ComWrite;