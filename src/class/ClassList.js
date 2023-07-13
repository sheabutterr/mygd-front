import { Link, Route } from "react-router-dom";
import Navi from "../main/Navi";
import ClassHigh from "./classhigh/ClassHigh";
import "../css/ClassList.css";
import ClassLow from "./classlow/ClassLow";
import ClassMiddle from "./classmiddle/ClassMiddle";

const ClassList = () => {

    return (
        <div>
            <Navi />
            <div className="class_intro_container">
                <div className="class_intro_title">강의 소개</div>
                <div className="class_sidebar">
                    <div className="class_menu"><Link to="/classList/classLow">초급반</Link></div>
                    <div className="class_menu"><Link to="/classList/classMiddle">중급반</Link></div>
                    <div className="class_menu"><Link to="/classList/classHigh">고급반</Link></div>
                </div>
                <div>
                    <Route path="/classList/classLow" component={ClassLow} exact={true} />
                    <Route path="/classList/classMiddle" component={ClassMiddle} exact={true} />
                    <Route path="/classList/classHigh" component={ClassHigh} exact={true} />
                </div>
            </div>
        </div>
    );
}

export default ClassList;