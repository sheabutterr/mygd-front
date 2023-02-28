import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navi from '../Navi';
import "./Question.css";

const Question = ({ history }) => {

  
  const [userIdx, setUserIdx] = useState('');
  const [level, setLevel] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('로그인 후 사용할 수 있습니다.');
      history.push('/main');
      return;
    }

    const decoded_token = jwt_decode(token);
    console.log(decoded_token);
    setUserIdx(decoded_token.userIdx);    

    axios.get(`http://192.168.0.53:8080/level`)
      .then(response => {
        setLevel(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions = [
    {
      question: '해외 어학 연수 경험은 있으신가요?',
      answers: [
        { text: '6개월 미만', points: 10 },
        { text: '6개월 ~ 1년 미만', points: 15 },
        { text: '1년 ~ 3 년 미만', points: 22 },
        { text: '3년 이상', points: 25 },
      ],
    },
    {
      question: '여행, 경험 등 일상적인 주제에 관한 짧은 글이나 대화를 이해하고 자신의 의견과 감정을 표현할 수 있나요?',
      answers: [
        { text: '못함', points: 10 },
        { text: '잘 모르겠음', points: 15 },
        { text: '조금 할 수 있음', points: 22 },
        { text: '능숙하게 할 수 있음', points: 25 },
      ],
    },
    {
      question: '인문학, 예술 분야 등 전문 주제 또는 추상적 주제의 글이나 담화를 이해하고 표현할 수 있나요?',
      answers: [
        { text: '못함', points: 10 },
        { text: '잘 모르겠음', points: 15 },
        { text: '조금 할 수 있음', points: 22 },
        { text: '능숙하게 할 수 있음', points: 25 },
      ],
    },
    {
      question: '최근 2년 내에 응시한 토익 점수는 몇 점인가요?',
      answers: [
        { text: '응시한 적 없음', points: 10 },
        { text: '500점 미만', points: 15 },
        { text: '500점 이상 700점 미만', points: 22 },
        { text: '700점 이상', points: 25 },
      ],
    },
  ];


  const handlerChangeLevel = e => {
    e.preventDefault();   
    
    let levelId;

    if (newLevel == '고급') {      
      levelId = 3;
    } else if (newLevel = '중급') {
      levelId = 2;
    } else if (newLevel = '초급') {
      levelId = 1;
    }

    

    console.log(userIdx);
    console.log(levelId);

    axios.put(`http://192.168.0.53:8080/level/${userIdx}`, { userIdx, levelId },
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


  const handleAnswerClick = (points) => {
    setScore(score + points);
    setQuestionIndex(questionIndex + 1);
  };

  let newLevel = useRef('');
  if (questionIndex >= questions.length) {
    // let newLevel;
    if (score >= 80) {
      newLevel = '고급';
    } else if (score >= 60) {
      newLevel = '중급';
    } else {
      newLevel = '초급';
    }

    return (
      <>
        <div>
          <Navi />
        </div>
        <div className="level_com">
          <img className="quiz-img" src="image/quiz01.png" alt="quiz-img" />
          <h1 className='app-title'>★  퀴즈 완료!  ★</h1>
          <h2 className='question'>나의 영어 레벨은 '{newLevel}' 입니다.</h2>
          <button className="send-button" onClick={handlerChangeLevel}>제출하기</button>
        </div>
      </>
    );
  }

  const currentQuestion = questions[questionIndex];

  return (
    <>
      <div>
        <Navi />
      </div>
      <div className="level_box">
        <div className="level_inner">
          <div className="level_que">
            <h1 className="app-title">내가 들어야 할 강의 추천 테스트</h1>
            <img className="quiz-img" src="image/quiz01.png" alt="quiz-img" />
            <h2 className='question'>{currentQuestion.question}</h2>
          </div>
          <div className="level_ans" >
            {currentQuestion.answers.map((answer) => (
              <button className="normal-button" key={answer.text} onClick={() => handleAnswerClick(answer.points)}>
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;