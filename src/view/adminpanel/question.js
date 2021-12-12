import {useEffect,useState,useRef} from 'react';
import HttpTransferService from '../../utils/httptransfer';
import {Modal, ModalHeader, ModalBody, ModalFooter,Label,Popover, PopoverHeader, PopoverBody,
  Collapse, Button, CardBody, Card
  } from 'reactstrap';
import './admin.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from "react-hook-form";
import Constants from '../../utils/constants';
const httptransfer = new HttpTransferService();


const constant = new Constants();


export function AddQuestion(props){

    const [isAddQuestionBlockEnable,showAddQuestionBlock] = useState(false);
    const [isAddOptionBlockEnable,showAddOptionBlock] = useState(false);
    const [optionList,setOptionList] = useState([]);
    const [currentOption,setCurrentoption] = useState("")
    const [currentQuestion,setCurrentQuestion] = useState("")
    const { register, handleSubmit } = useForm();
    const [quiz,setQuiz] = useState("");
    const [isQuizzStored,setQuizzFlag] = useState(false)
    const [submittedQuestion,setSubmittedQuestion] = useState(null)
    const [questionType,setQuestionType] = useState(null)
    const [imageData,setImage] = useState([])
  
    const simpleValidator = useRef(new SimpleReactValidator())
  
      useEffect(()=>{
      },[])

      const questionQuery = async()=>{

      }

      const saveQuestion = async()=>{
      let createQuizResponse = await httptransfer.createQuestion({
          quiz_id : props.quizId,
          question_type : questionType,
          question : currentQuestion
        });

        if(createQuizResponse.data.CodeStatus == 201){
          setSubmittedQuestion(createQuizResponse.data.Result)
          
        }
      }
  
  
  
      const saveOptions = ()=>{
        let tempList = optionList;
        tempList.push({
          'value' : currentOption,
          "isCorrect" : false
        });
        console.log("59")
        console.log(tempList)
        setOptionList([])
        setOptionList(tempList)
        setCurrentoption("")
        // if(questionType != "IMAGE_MCQ"){
        //   let tempList = optionList;
        //   tempList.push({
        //     'value' : currentOption,
        //     "isCorrect" : false
        //   });
  
        //   console.log(tempList)
        //   setOptionList(tempList)
        // } else {

        //   console.log(imageData)

        // }
      }

      const createOptionQuery = async() =>{
        let response = await httptransfer.createOption({
            quiz_id : props.quizId,
            option_type : "mcq",
            question_id : submittedQuestion.question_id,
            option : optionList
          });
      }


      const createQuestion = async() =>{
        let inputjson = {
            quiz_id : props.quizId,
            option : optionList,
            question_type : questionType,
            question : currentQuestion
        }

        inputjson['option'] = optionList
        let response = await httptransfer.createFullQuestion(inputjson);

        if(response.status == 200){
          props.toggle();
        }

        // if(questionType === constant.QUESTION_TYPE.IMAGE_MCQ){

        // } else {  
          
        // }


        // let response = await httptransfer.createFullQuestion(inputjson);
      }
  
      const submitQuestion = async() =>{
      let submitQuestion = await httptransfer.createQuestion({
        // quiz_id : ,
        // question_type : ,
        question : currentQuestion,
      });
      }

      const toggleSwitch = (index)=>{
        let tempOptionList = optionList;
        let tempElement = optionList[index];
        tempElement['isCorrect'] = !tempElement['isCorrect']
        tempOptionList[index] = tempElement;
        setOptionList([])
        setOptionList(tempOptionList)
        setQuizzFlag(!isQuizzStored)
      }

      const optionImageUpload = (file,fileName)=>{
        let fileArr =file[0].name.split(".")
        let fileFormat = fileArr[1]
        let formData = new FormData();
        formData.append("file",file[0])
        formData.append("filename", fileName)
        httptransfer.uploadImageToServerStorage(formData).then(res => {
          if(res.status == 200){
            console.log("149")
            console.log(res.data.result.option)
            setCurrentoption(res.data.result.option)           
          }
        })
      }

  
      return (
        <div>
          <Modal
            isOpen={props.isOpen}
            toggle={props.toggle}
            className="addquiz-modal"
            size = "xl"
            centered={false}
          >
            <ModalHeader toggle={props.toggle}>
              <div>
                <button className="add_button">
                  <i className="fa fa-plus plus_icon"></i>
                </button>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className>
                <input
                  className="form-control"
                  onChange={(e) => {
                    setCurrentQuestion(e.target.value);
                  }}
                />

                <select class="custom-select custom-select-lg mb-3" onChange={(e)=>{setQuestionType(e.target.value)}}>
                  <option value ={null} selected>Open this select menu</option>
                  <option value={constant.QUESTION_TYPE.MCQ}>{constant.QUESTION_TYPE.MCQ}</option>
                  <option value={constant.QUESTION_TYPE.IMAGE_MCQ}>{constant.QUESTION_TYPE.IMAGE_MCQ}</option>
                  <option value={constant.QUESTION_TYPE.SUBJECTIVE}>{constant.QUESTION_TYPE.SUBJECTIVE}</option>
                </select>
                <div className="m-2">
                  {/* {submittedQuestion != null ? (
                    ""
                  ) : (
                    <button
                      id="addQuestionPopover "
                      className="btn btn-sm bg-dark text-white"
                      onClick={() => {
                        saveQuestion();
                      }}
                    >
                      Add Question
                    </button>
                  )} */}
                </div>
              </div>
          
              <div>
                  <div className="px-4">
                    <Label>Options</Label>
                    <div>
                        {
                          questionType === "IMAGE_MCQ" ? 
                          <input type="file" onChange={(e)=>{

                            // optionImageUpload(e.target.files)
                            let fileArr =e.target.files[0].name.split(".")
                            let fileFormat = fileArr[1]
                            httptransfer.createImgeOptionName({
                              'quiz_id' : props.quizId,
                              'img_format': fileFormat,
                              'option_type' : questionType
                            }).then(res=>{
                              if(res.status == 200){
                                if(res.data.result.option){
                                  optionImageUpload(e.target.files,res.data.result.option)
                                }
                              }
                            }
                              )
                         
                          }}/> : 
                          <input
                          className="form-control form-control-sm"
                          placeholder="plz enter the options over here"
                          onChange={(e) => {
                            setCurrentoption(e.target.value);
                          }}
                          onKeyUp={(e) => {
                            console.log(e);
                            if (e.key === "Enter") {
                              saveOptions();
                            }
                          }}
                        />
                        }
                        <button className="" onClick={() => saveOptions()}>
                          Save
                        </button>
                      </div>
                    {optionList.length > 0 ? (
                      <div>
                        {optionList.map((e, index) => (
                          <div key={e + index}>

                            <input type="radio" onChange={(event)=>{toggleSwitch(index)}} checked={e.isCorrect}/>
                            <span>{index + 1}).{e.value}{e.isCorrect}</span>
                            <span>{e.isCorrect}</span>
                            {
                              questionType == constant.QUESTION_TYPE.IMAGE_MCQ ? 
                              <img className="option-image my-4" src={`http://localhost:8000/media/${e.value}`}/>
                              : ""
                            }
                            
                          </div>
                          
                        ))}
                       
                      </div>
                    ) : (
                      <div>NO options are added yet !</div>
                    )}
                    <div></div>
                    <div className="d-flex justify-content-center">
                      <button
                        className=""
                        onClick={() => {
                          showAddOptionBlock(!isAddOptionBlockEnable);
                        }}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>

                    <div className="d-flex justify-content-center mt-4 text-white">
                      <button
                        className="btn btn-lg bg-dark"
                        onClick={() => createQuestion()}
                      >
                        Submit Answer
                      </button>
                    </div>
                  </div>
                </div>

              {/* <Popover
                placement="top"
                isOpen={isAddQuestionBlockEnable}
                target="addQuestionPopover"
                toggle={() => {
                  showAddQuestionBlock(!isAddQuestionBlockEnable);
                }}
                className="question_popover"
              >
                <PopoverHeader>
                  <span>Add Question Panel</span>
                  <button
                    className="float-right"
                    onClick={() => submitQuestion()}
                  >
                    submit
                  </button>
                </PopoverHeader>
                <PopoverBody></PopoverBody>
              </Popover> */}
            </ModalBody>
            <ModalFooter>
              {/* <div className="d-flex justify-content-center w-100">
                <button id="addQuestionPopover">Add Question</button>
              </div> */}
            </ModalFooter>
          </Modal>
        </div>
      );
  }


export function Question(props){
    const [isAddQuestionBlockEnable,showAddQuestionBlock] = useState(false);
    const [isAddOptionBlockEnable,showAddOptionBlock] = useState(false);
    const [optionList,setOptionList] = useState([]);
    const [currentOption,setCurrentoption] = useState("")
    const [currentQuestion,setCurrentQuestion] = useState("")
    const { register, handleSubmit } = useForm();
    const [quiz,setQuiz] = useState("");
    const [isQuizzStored,setQuizzFlag] = useState(false)
    const [questionList,setQuestionList] = useState([])
  
    const simpleValidator = useRef(new SimpleReactValidator())
  
      useEffect(()=>{
          questionQuery();
      },[])


      const questionQuery=async()=>{
        //   var params = {}
          let response = await httptransfer.questionQuery(props.quiz_id);
          let questionList = response.data.Result;

          let optionQueryResponse = await httptransfer.optionQuery(props.quiz_id);
          let optionList = optionQueryResponse.data.Result
          let tempOption = []

          let tempQuestionList = []

          questionList.map(e =>{
            tempOption = optionList.filter(a => a.question_id == e.question_id)
            e['options'] = tempOption
            tempQuestionList.push(e);
          })
          console.log(tempQuestionList)
          setQuestionList(tempQuestionList)
      }

      const optionQuery=async()=>{
          
      }

    
      return (
        <div>
          <Modal
            isOpen={props.isOpen}
            toggle={props.toggle}
            className="addquiz-modal"
          >
            <ModalHeader toggle={props.toggle}>
              <div>
                <button className="add_button">
                  <i className="fa fa-plus plus_icon"></i>
                </button>
              </div>
            </ModalHeader>
            <ModalBody>
              {questionList.map((e) => {
                return (
                  <div className="card my-3">
                    <div>{e.question}</div>
                    <div>{
                        e.options.map(optionsObj=>{
                            return(
                                <div className="bg-success my-2">{optionsObj.option}</div>
                            )
                        })
                        }</div>
                  </div>
                );
              })}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
        </div>
      );
  }

