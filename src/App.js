import './App.css';
import { Route } from 'react-router-dom';
import Main from './Main';
import Join from "./user/Join";
import Login from "./user/Login";
import MyPage from "./user/MyPage";
import ComList from './community/ComList';
import ComDetail from './community/ComDetail';
import ComWrite from './community/ComWrite';
import QnaList from './qna/QnaList';
import QnaDetail from './qna/QnaDetail';
import QnaWrite from './qna/QnaWrite';
import ClassLow from './class/classlow/ClassLow';
import ClassMiddle from './class/classmiddle/ClassMiddle';
import ClassHigh from './class/classhigh/ClassHigh';
import LowA from './class/classlow/LowA';
import LowB from './class/classlow/LowB';
import LowC from './class/classlow/LowC';
import MiddleA from './class/classmiddle/MiddleA';
import MiddleB from './class/classmiddle/MiddleB';
import MiddleC from './class/classmiddle/MiddleC';
import HighA from './class/classhigh/HighA';
import HighB from './class/classhigh/HighB';
import HighC from './class/classhigh/HighC';
import ClassList from './class/ClassList';
import Question from './level/Question';
import Apply from './user/Apply';


function App() {


  return (
    <>
      <Route path="/main" component={Main} exact={true} />
      <Route path="/login" component={Login} exact={true} />
      <Route path="/join" component={Join} exact={true} />
      <Route path="/myPage" component={MyPage} exact={true} />
      <Route path="/community" component={ComList} exact={true} />
      <Route path="/community/detail/:comId" component={ComDetail} exact={true} />
      <Route path="/community/write" component={ComWrite} exact={true} />
      <Route path="/qna" component={QnaList} exact={true} />
      <Route path="/qna/detail/:qnaId" component={QnaDetail} exact={true} />
      <Route path="/qna/write" component={QnaWrite} exact={true} />
      <Route path="/classList" component={ClassList} />
      
      {/* 초급반 */}
      <Route path="/lowA" component={LowA} exact={true} />
      <Route path="/lowB" component={LowB} exact={true} />
      <Route path="/lowC" component={LowC} exact={true} />
      {/* 중급반 */}
      <Route path="/middleA" component={MiddleA} exact={true} />
      <Route path="/middleB" component={MiddleB} exact={true} />
      <Route path="/middleC" component={MiddleC} exact={true} />
      {/* 고급반 */}
      <Route path="/highA" component={HighA} exact={true} />
      <Route path="/highB" component={HighB} exact={true} />
      <Route path="/highC" component={HighC} exact={true} />

      <Route path="/level" component={Question} exact={true} />
      <Route path="/apply" component={Apply} exact={true} />      

    </>
  );
}

export default App;
