import { Link, Route } from "react-router-dom";
import Navi from "../Navi";
import ClassHigh from "./classhigh/ClassHigh";
import "./ClassList.css";
import ClassLow from "./classlow/ClassLow";
import ClassMiddle from "./classmiddle/ClassMiddle";

const ClassList = ({ history }) => {    

    return (
        <>           
            <div>
                <Navi />
            </div>
            <div className="class_main">   
                <div className="class_menu"><Link to="/classList/classLow">&nbsp;&nbsp;초급반</Link></div>
                <div className="class_menu"><Link to="/classList/classMiddle">&nbsp;&nbsp;중급반</Link></div>
                <div className="class_menu"><Link to="/classList/classHigh">&nbsp;&nbsp;고급반</Link></div>   
            </div>            
            <div>
                <Route path="/classList/classLow" component={ClassLow} exact={true} />
                <Route path="/classList/classMiddle" component={ClassMiddle} exact={true} />
                <Route path="/classList/classHigh" component={ClassHigh} exact={true} />
            </div>   
        </>
    );
}

export default ClassList;