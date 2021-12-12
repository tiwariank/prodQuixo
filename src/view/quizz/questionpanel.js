import React,{useEffect,useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import HttpTransferService from '../../utils/httptransfer';
// import Btbutton from './styleTest/buttonstyle';
import $ from 'jquery'
import { Modal,ModalHeader,ModalBody } from 'reactstrap';
import { Link } from "react-router-dom";
import './questionpanel.css';
import { Stepper } from 'react-form-stepper';
import Constants from '../../utils/constants';

const constants = new Constants()

const httptransfer = new HttpTransferService();

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

export default function QuestionPanel(props) {
  const classNamees = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [questions, setQuestions]=useState([])
  const [selectedOptionId,setOptionId]=useState(null)
  const [selectedOption,setOption] =useState(null)
  const [userSelections,setUserSelections]=useState({})
  const [correctOptionArr,setCorrectOptions]=useState([])
  const [isSubmitModalOpen,setModalState] = useState(false)
  const [scorePercentage,setResposneCount] = useState(0);
  const [copyIndicator,setCopiedIcon] = useState(false);
  const [maxSteps,setMaxSteps] = useState(0);
  const [headStepper,setHeadStepper] = useState([]);

  useEffect(
    () => {
      let url = window.location.href.split('/');
      let id = url[url.length - 1 ]
      questionQuery(id);
      // optionQuery(props.quizId);
    }, []
  )

  const questionQuery = async (id) => {
    let questionList = [];
    let response = await httptransfer.questionQuery(id);
    questionList = response.data.Result;

    let optionQueryResponse = await httptransfer.optionQuery(id);
    let optionList = optionQueryResponse.data.Result;
    let tempOption = [];

    let tempQuestionList = [];

    questionList.map((e,index) => {
      tempOption = optionList.filter((a) => a.question_id == e.question_id);
      e["options"] = tempOption;
      e['label'] = "";
      tempQuestionList.push(e);
    });
    setQuestions(tempQuestionList);
    setMaxSteps(tempQuestionList.length);
  };
 


  const handleNext = () => {

    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(activeStep + 1 < maxSteps){
      setActiveStep(activeStep +1)
      setOptionId(null);
    }
  };

  const handleBack = () => {
    if(activeStep > 0){
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleLike = (props,e) => {
    console.log("45")
    console.log(props)  
    console.log($('#submitModal'))
    console.log(Object.getPrototypeOf($('#submitModal')).show())
    // Object.getPrototypeOf($('#submitModal')).show()
    console.log(document.getElementById("submitModal"))
    if(e.target.id){
      let tempUserSelections = userSelections;
      // if(tempUserSelections[activeStep]){
      //   tempUserSelections[activeStep] = props.option_id;
      // } else {
      //   tempUserSelections.push(props.option_id)
      // }

      tempUserSelections[activeStep + 1] = props.option_id;
      console.log("submittd option")
      console.log(activeStep)
      setUserSelections(tempUserSelections)
      console.log("144")
      console.log(tempUserSelections)
      setOption(props.option_id)
      setOptionId(props.option_id)
    }
  }

  const onSubmit = () => {
    var correctCount = 0;
    questions.map((e,index)=>{
      let temp = userSelections[index+1];
      if(parseInt(e.ans) === temp){
        correctCount++;
      }
    })

    let percentage = (correctCount/questions.length) * 100;
    setResposneCount(percentage)
    console.log("158")
    console.log(correctCount)
    setModalState(true);
  }

 const toggleSubmitModal =()=>{
    setModalState(false);
  }


 const reportCard = () => {
   return (<div>
     {activeStep == questions.length - 1 ? (
          <div>
            <div className="d-flex justify-content-center">
            <button className="submit_start" onClick={() => onSubmit()}>Submit</button>
            </div>
            
            <div>
              <Modal
                isOpen={isSubmitModalOpen}
                toggle={() => toggleSubmitModal()}
                centered={true}
                contentClassName="result-css"
              >
                <ModalHeader className="w-100">
                  <div className="w-100">
                  <i className="fas fa-times" onClick={() => toggleSubmitModal()}></i>
                  </div>
                </ModalHeader>
                <ModalBody className="my-2 result-css">

                  <h1>Hii</h1>
                  <h3 className="score_str_css">your have scored {scorePercentage + ""} %</h3>
                  <div>
                    <h3 className="text-center">
                      <i className="fas fa-share mx-2"></i>
                      share to your friends
                    </h3>
                    <div
                      className="text-center sharelink"
                      onClick={() => {
                        setCopiedIcon(true);
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                      }}
                    >
                      {window.location.href}
                      <i
                        className={
                          copyIndicator ? "fas fa-copy float-right" : "d-none"
                        }
                      ></i>
                    </div>
                  </div>
                  <div>
                    <div className="d-inline float-right">
                      <i className="fab fa-instagram mx-2"></i>
                      <i className="fab fa-facebook mx-2 "></i>
                      <i className="bi bi-share"></i>
                      <i className="fas fa-whatsapp" aria-hidden="true"></i>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        ) : (
          ""
        )}
   </div>)
 }

  return (
    <div>
      <div classNameName="btn btn-lg">
        <Link to="/">Home</Link>
      </div>
      <div className="row">
        <div className="col-12">
          <Stepper
            steps={questions}
            activeStep={activeStep}
            stepClassName="steps_css"
            nonLinear={true}
            size={1}
            borderRadius={"0%"}
            onClick={(e) => {
              console.log(e.target.innerText);
              setActiveStep(parseInt(e.target.innerText) - 1);
            }}
          />
        </div>
      </div>
      <div className="playground_css">
        <div classNameName={classNamees.root}>
          {questions.length > 0 ? (
            <Paper square elevation={2} classNameName={classNamees.header}>
              {/* <Typography>{questions[activeStep].question}</Typography> */}
              <p className="question_text">{questions[activeStep].question}</p>
            </Paper>
          ) : (
            ""
          )}

          <div className="">
            <div className="row">
              <div className="col-1">
                <div className="d-inline arrow_btn">
                  <KeyboardArrowLeft onClick={handleBack} />
                </div>
              </div>
              <div className="col-10">
                {questions.length > 0 && questions[activeStep].options ? (
                  <div className="row">
                    {questions[activeStep].options.map((e) => {
                      return (
                        <div className="col-6 mt-5">
                          <div className="optionsrow">
                            {questions[activeStep].question_type ==
                            constants.QUESTION_TYPE.IMAGE_MCQ ? (
                              <img
                                className="option-image my-4"
                                src={`http://localhost:8000/media/${e.option}`}
                              />
                            ) : (
                              <span className="option_text_css">
                                {e.option}
                              </span>
                            )}

                            <div className="fix-heart">
                              <i
                                className={
                                  selectedOptionId &&
                                  selectedOptionId == e.option_id
                                    ? "fas fa-heart heart-shape text-red"
                                    : "fas fa-heart heart-shape"
                                }
                                id={
                                  questions[activeStep].question_id +
                                  e.option_id
                                }
                                onClick={(event) => handleLike(e, event)}
                              ></i>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-1">
                <div className="d-inline arrow_btn">
                  <KeyboardArrowRight onClick={() => handleNext()} />
                </div>
              </div>
            </div>
          </div>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={() => handleNext()}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </div>
        <div></div>
        <div></div>
      </div>
      {reportCard()}
    </div>
  );
}