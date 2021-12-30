import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import HttpTransferService from "../../utils/httptransfer";
// import Btbutton from './styleTest/buttonstyle';
import $ from "jquery";
import { Modal, ModalHeader, ModalBody, Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./questionpanel.css";
import { Stepper } from "react-form-stepper";
import Constants from "../../utils/constants";
import TestImage from "../assets/background/Halo-5-Chief-Vs-Locke-Art.jpg";

const constants = new Constants();

const httptransfer = new HttpTransferService();

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden",
    display: "block",
    width: "100%",
  },
}));

export default function QuestionPanel(props) {
  const classNames = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptionId, setOptionId] = useState(null);
  const [selectedOption, setOption] = useState(null);
  const [userSelections, setUserSelections] = useState({});
  const [correctOptionArr, setCorrectOptions] = useState([]);
  const [isSubmitModalOpen, setModalState] = useState(false);
  const [scorePercentage, setResposneCount] = useState(0);
  const [copyIndicator, setCopiedIcon] = useState(false);
  const [maxSteps, setMaxSteps] = useState(0);
  const [headStepper, setHeadStepper] = useState([]);

  useEffect(() => {
    let url = window.location.href.split("/");
    let id = url[url.length - 1];
    console.log("loading question");
    questionQuery(id);
  }, []);

  const questionQuery = async (id) => {
    let questionList = [];
    let response = await httptransfer.questionQuery(id);
    questionList = response.data.Result;

    let optionQueryResponse = await httptransfer.optionQuery(id);
    let optionList = optionQueryResponse.data.Result;
    let tempOption = [];

    let tempQuestionList = [];

    questionList.map((e, index) => {
      tempOption = optionList.filter((a) => a.question_id == e.question_id);
      e["options"] = tempOption;
      e["label"] = "";
      tempQuestionList.push(e);
    });
    setQuestions(tempQuestionList);
    setMaxSteps(tempQuestionList.length);
  };

  const handleNext = () => {
    if (activeStep + 1 < maxSteps) {
      setActiveStep(activeStep + 1);
      setOptionId(null);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleLike = (props, e) => {
    if (e.target.id) {
      let tempUserSelections = userSelections;
      tempUserSelections[activeStep + 1] = props.option_id;
      setUserSelections(tempUserSelections);
      setOption(props.option_id);
      setOptionId(props.option_id);
    }
  };

  const onSubmit = () => {
    var correctCount = 0;
    questions.map((e, index) => {
      let temp = userSelections[index + 1];
      if (parseInt(e.ans) === temp) {
        correctCount++;
      }
    });

    let percentage = (correctCount / questions.length) * 100;
    setResposneCount(percentage);
    setModalState(true);
  };

  const toggleSubmitModal = () => {
    setModalState(false);
  };

  const reportCard = () => {
    return (
      <div>
        {activeStep == questions.length - 1 ? (
          <div>
            <div className="d-flex justify-content-center">
              <button className="submit_start my-5" onClick={() => onSubmit()}>
                SUBMIT
              </button>
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
                    <i
                      className="fas fa-times"
                      onClick={() => toggleSubmitModal()}
                    ></i>
                  </div>
                </ModalHeader>
                <ModalBody className="my-2 result-css">
                  <h1>Hii</h1>
                  <h3 className="score_str_css">
                    your have scored {scorePercentage + ""} %
                  </h3>
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
      </div>
    );
  };

  const StepperComponent = () => {
    console.log(questions);
    return (
      <div className="d-inline">
        {questions.map((e, index) => (
          <div
            className={index == activeStep ? "step_css_active" : "steps_css"}
            onClick={(e) => {
              console.log(e.target.innerText);
              setActiveStep(parseInt(e.target.innerText) - 1);
            }}
          >
            <div className="d-flex justify-content-center">
              <span className="step_counter_css">{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-100 playground-outerpanel">
      <div className="mobile-view-css">
        <div className="h-100 w-100 scroller-container">
          <div className="stepper-panel">
            <div className="d-flex justify-content-center ">
              <div className="stepper_outer_panel">
                {StepperComponent()}
                {/* <Stepper
            steps={questions}
            activeStep={activeStep}
            stepClassName="steps_css"
            nonLinear={true}
            size={1}
            borderRadius={5}
            onClick={(e) => {
              console.log(e.target.innerText);
              setActiveStep(parseInt(e.target.innerText) - 1);
            }}
          /> */}
              </div>
            </div>
          </div>
          <div className="question-section">
            {questions.length > 0 ? (
              <Paper square elevation={2} classNameName={classNames.header}>
                {/* <Typography>{questions[activeStep].question}</Typography> */}
                <p className="question_text">
                  {questions[activeStep].question}
                </p>
              </Paper>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-center">
              <img
                src={
                  questions[activeStep] && questions[activeStep].imageUrl
                    ? `${constants.BASE_URL}/media${questions[activeStep].imageUrl}`
                    : ""
                }
                className="d-flex justify-content-center"
              />
            </div>
          </div>
          <div className="option-section">
            <div className="d-flex position-relative">
              <div className="play-left-nav">
                <div className="d-inline arrow_btn">
                  <KeyboardArrowLeft onClick={handleBack} />
                </div>
              </div>
              <div className="play-center-container">
                <Container>
                  {questions.length > 0 && questions[activeStep].options ? (
                    <div className="mt-4">
                      {questions[activeStep].question_type ===
                      constants.QUESTION_TYPE.IMAGE_MCQ ? (
                        <div className="row">
                          {questions[activeStep].options.map((e) => {
                            return (
                              <Col md={3} sm={6} xs={6} xl={3}>
                                <div className="optionsrow">
                                  <figure class="txtover">
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
                                        onClick={(event) =>
                                          handleLike(e, event)
                                        }
                                      ></i>
                                    </div>
                                    <img
                                      src={`${constants.BASE_URL}media${e.imageUrl}`}
                                      className="w-100"
                                    />
                                    <figcaption className="textover_figcaption">
                                      {e.option}
                                    </figcaption>
                                  </figure>
                                </div>
                              </Col>
                            );
                          })}
                        </div>
                      ) : (
                        <div>
                          {questions[activeStep].options.map((e) => {
                            return (
                              <div className="d-flex justify-content-center">
                                <div className="optionsMCQrow inline-block">
                                  <div className="w-100"></div>
                                  <div
                                    className="row"
                                    onClick={(event) => handleLike(e, event)}
                                  >
                                    <div className="col-8">
                                      <div
                                        id={
                                          questions[activeStep].question_id +
                                          e.option_id
                                        }
                                      >
                                        <span className="option_text_css">
                                          {e.option}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <i
                                       onClick={(event) => handleLike(e, event)}
                                        className={
                                          selectedOptionId &&
                                          selectedOptionId == e.option_id
                                            ? "fas fa-heart heart-shape text-red float-right"
                                            : "fas fa-heart heart-shape float-right"
                                        }
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </Container>
              </div>
              <div className="play-right-nav">
                <div className="d-inline arrow_btn">
                  <KeyboardArrowRight onClick={() => handleNext()} />
                </div>
              </div>
            </div>
            {/* <MobileStepper
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
          /> */}
          </div>
        </div>
      </div>
      {reportCard()}
    </div>
  );
}
