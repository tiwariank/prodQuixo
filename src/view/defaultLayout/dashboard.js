import { useEffect,useState } from 'react'
import Header from './header'
import Footer from './footer'
import Test from '../assets/background/test.jpg'
import './dashboard.css'
import HttpTransferService from '../../utils/httptransfer';
import { Route } from "react-router-dom";
const httptransfer = new HttpTransferService();



export default function Dashboard () {

  const [isAddQuizModalOpen,showAddQuizModal] = useState(false);
  const [isAddQuestionModalOpen,setAddQuestionModal] = useState(false);
  const [quizList,setQuizList] = useState([])
  const [selectedQuizId,selectQuizId] = useState("");


 useEffect(()=>{
    queryQuiz()
},[])


const queryQuiz=async()=>{
  let quizQueryResponse = await httptransfer.quizQuery();
  if(quizQueryResponse && quizQueryResponse.status == 200){
    setQuizList(quizQueryResponse.data.Result)
  } else {
    setQuizList([])
  }
  
}



  const card = (e,history) => {
    return (
      <div className="image_card mx-3" onClick={()=>{
        history.push({
          pathname : `/quiz/${e.quiz_id}`
        })
      }}>
          <div className="floated-text">
              {/* <span>hello checkout this question</span> */}
              <div className="d-inline quizz-tag">{e.quiz}</div>
              </div>
          <div 
          className="hover-zoom"
          >
            <img src={`http://localhost:8000/media/${e.imageUrl}`} className="quizz_image_css"/>
          </div>
          
      </div>
    )
  }

  return (
    <div>
      <div>
        <header>
          <Header />
        </header>

        <div style={{ position: "relative" }}>
          <div className="float-cover"></div>
          <div className="cover-css"></div>
        </div>

        <Route
          render={({ history }) => (
            <div className="w-100 d-flex flex-row flex-wrap mx-2">
              {quizList && quizList.length > 0 ?  quizList.map((e) => {
                return card(e,history);
              }) : ""
            }
            </div>
          )}
        />

        {/* <img className="hover-zoom" src={Test}/> */}

        <Footer />
      </div>
    </div>
  );
}
