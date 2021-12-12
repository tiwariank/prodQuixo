import { useState,useEffect,useRef} from 'react';
import Header from '../defaultLayout/header';
import {Modal, ModalHeader, ModalBody, ModalFooter,Label,Popover, PopoverHeader, PopoverBody,
    Collapse, Button, CardBody, Card
    } from 'reactstrap';
import './admin.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from "react-hook-form";
import AddQuiz from './addQuiz';
import {AddQuestion,Question} from './question';
import HttpTransferService from '../../utils/httptransfer';
const httptransfer = new HttpTransferService();


export default function AdminHome(props){

    const [isAddQuizModalOpen,showAddQuizModal] = useState(false);
    const [isAddQuestionModalOpen,setAddQuestionModal] = useState(false);
    const [quizList,setQuizList] = useState([])
    const [selectedQuizId,selectQuizId] = useState("");
    const [isViewModalOpen,setViewModal] = useState(false);
 
    const toggleQuizModal = ()=>{
        showAddQuizModal(!isAddQuizModalOpen);
    }

    
    useEffect(()=>{
      if(window.localStorage.getItem('isAllowed')){
        queryQuiz()
      } else {
        props.history.push('/login')
      }
  },[])


  const queryQuiz=async()=>{
    let quizQueryResponse = await httptransfer.quizQuery();
    if(quizQueryResponse.status == 200){
      setQuizList(quizQueryResponse.data.Result)
    }
  }

  const toggleAddQuestionPanel = (id)=>{
    setAddQuestionModal(!isAddQuestionModalOpen)
    if(!isAddQuestionModalOpen){
      selectQuizId(id)
    } 
  } 

  const toggleViewQuestionModal = (id)=>{
    setViewModal(!isViewModalOpen)
    if(!isViewModalOpen){
      selectQuizId(id)
    }
  }




    
    return (
      <div>
        <Header />
        <div>
          <Button
            classNameName="add_button"
            title="add_button"
            aria-label="add-button"
            type="button"
            onClick={() => toggleQuizModal()}
          >
            <i classNameName="fa fa-plus plus_icon"></i>
            Add
          </Button>
        </div>
        <div>{quizList.length}</div>
        <div>
          {quizList.map((e, index) => {
            return (
              <div className="card m-5">
                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    {e.quiz}
                  </p>
                  <a href="#" className="btn btn-primary btn-sm"
                  onClick={()=>{toggleAddQuestionPanel(e.quiz_id)}}
                  >
                    Add Question
                  </a>
                  <a href="#" className="btn btn-primary btn-sm mx-2">
                    Edit Question
                  </a>
                  <a  className="btn btn-primary btn-sm mx-2"
                  onClick={()=>toggleViewQuestionModal(e.quiz_id)}
                  >
                    View Question
                  </a>
                  
                  <a  className="btn btn-primary btn-sm mx-2 float-right" 
                  onClick={
                    ()=>httptransfer.deleteQuiz(e.quiz_id)}
                  >
                    <i class="fa fa-trash" aria-hidden="true" ></i>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {
          isAddQuestionModalOpen ? 
          <AddQuestion
          isOpen={isAddQuestionModalOpen}
          toggle={toggleAddQuestionPanel.bind()}
          quizId={selectedQuizId}

          /> : ''
        }
        {isAddQuizModalOpen ? (
          <AddQuiz
            isOpen={isAddQuizModalOpen}
            toggle={toggleQuizModal.bind()}
            refresh={queryQuiz.bind()}
          />
        ) : (
          ""
        )}
        {
          isViewModalOpen ? 
          <Question
          quiz_id = {selectedQuizId}
          isOpen={isViewModalOpen}
          toggle = {toggleViewQuestionModal.bind()}
          />
          : ""
        }
      </div>
    );
}