import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Navi from "./Navi";
import "./Main.css";

const Main = ({ history }) => {

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
        <>
            <div >
                <div className="navi_bar">
                    <Navi />
                </div>
                <div>
                    <img className="main_image" src="image/main.png"></img>
                </div>
                <div className="latest">
                    <h2>&nbsp;&#124;&nbsp;커뮤니티 최신글&nbsp;&#124;&nbsp;</h2>
                </div>
                <div className="comC">
                    <div className="comA">
                        {latestList && latestList.map((n, index) => (
                            <div className="comB" key={index}>
                                <h3>{n.comTitle}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;