import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Navi from "../main/Navi";
import "../css/Apply.css";

const Apply = ({ history }) => {

    const [userIdx, setUserIdx] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            alert('로그인 후 사용할 수 있습니다.');
            history.push('/login');
            return;
        }

        const decoded_token = jwt_decode(token);
        console.log(decoded_token);
        setUserIdx(decoded_token.userIdx);

        axios.get(`http://localhost:8080/classList`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                const data = response && response.data && response.data.map(d => ({ ...d, "selected": false }));
                setData(data);
            })
            .catch(error =>
                console.log(error));
    }, []);

    const handlerSelect = e => {
        const newData = data && data.map(d => ({ ...d, selected: d.classId == e.target.value }));
        setData(newData);
    };

    const handlerClick = e => {
        e.preventDefault();

        const selectedClassId = data && data.filter(d => d.selected)[0].classId;
        axios.put(`http://localhost:8080/apply/${userIdx}`, { userIdx, classId: selectedClassId },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                if (response.data) {
                    alert('정상적으로 등록 되었습니다. My Page로 이동합니다.')
                    history.push('/myPage');
                }
            })
            .catch(error => {
                console.log(error);
                alert('확인 후 다시 시도해주세요.')
            });
    };

    return (
        <div>
            <Navi />
            <div className="apply_container">
                <div className="apply_title">수강 신청</div>
                <div className="apply_all">
                    <div className="apply_button">
                        <p>현재 클래스 : {
                            data && data.filter(project => project.selected).map(project => project.className)
                        }</p>
                        <button type="submit" onClick={handlerClick}>수강신청</button><br /><br />
                    </div>
                    <div className="apply_box">
                        <ul>
                            {data && data.map(project => (
                                <li key={project.classId}>
                                    <input
                                        className={project.selected ? "apply_image_selected" : "apply_image"}
                                        type="image" name="classNumber"
                                        value={project.classId}
                                        onClick={handlerSelect}
                                        src={"http://localhost:8080" + project.classImage}></input>
                                    <p>{project.className}</p>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Apply;