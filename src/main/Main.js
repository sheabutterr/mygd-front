import axios from "axios";
import { useEffect, useState } from "react";
import Navi from "./Navi";
import "../css/Main.css";
import mainimage from "../image/main.png"

const Main = () => {

    const [latestList, setLatestList] = useState('');

    useEffect(() => {
        axios.get(`http://192.168.0.53:8080/latestList`)
            .then(response => {
                console.log(response);
                setLatestList(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div className="main_container">
            <Navi />
            <div className="main_image"><img src={mainimage} /></div>
            <div className="latest">커뮤니티 최신글</div>
            <div className="main_com_container">
                {latestList && latestList.map((n, index) => (
                    <div className="main_com_list" key={index}>
                        <h3>{n.comTitle}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;