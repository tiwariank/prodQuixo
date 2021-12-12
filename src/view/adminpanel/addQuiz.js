import {useEffect,useState,useRef} from 'react';
import HttpTransferService from '../../utils/httptransfer';
import {Modal, ModalHeader, ModalBody, ModalFooter,Label,Popover, PopoverHeader, PopoverBody,
  Collapse, Button, CardBody, Card
  } from 'reactstrap';
import './admin.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from "react-hook-form";
const httptransfer = new HttpTransferService();


function AddQuiz(props){

    const [isAddQuestionBlockEnable,showAddQuestionBlock] = useState(false);
    const [isAddOptionBlockEnable,showAddOptionBlock] = useState(false);
    const [optionList,setOptionList] = useState([]);
    const [currentOption,setCurrentoption] = useState("")
    const [currentQuestion,setCurrentQuestion] = useState("")
    const { register, handleSubmit } = useForm();
    const [quiz,setQuiz] = useState("");
    const [quizList,setQuizList] = useState([])
    const [isQuizzStored,setQuizzFlag] = useState(false)
    const [imageUrl,setImageUrl] = useState(null)
  
    const simpleValidator = useRef(new SimpleReactValidator())
  
      useEffect(()=>{
          console.log(" i am here at add quiz")
          console.log(props)
          queryQuiz()
      },[])
  
  
      const queryQuiz=async()=>{
        let quizQueryResponse = await httptransfer.quizQuery();
        let tempList = []
        setQuizList(quizQueryResponse.Result)
      }
  
      const saveQuiz = async()=>{
        let createQuizResponse = await httptransfer.createQuiz({
          quiz : quiz,
          quiz_type : "mcq",
          'imageUrl' : imageUrl
        });
        props.toggle();
        props.refresh();
      }

      const optionImageUpload = (file,fileName,fileType)=>{
        console.log(file)
        console.log(fileName)
        console.log(fileType)
        let fileArr =file[0].name.split(".")
        let fileFormat = fileArr[1]
        let formData = new FormData();
        formData.append("file",file[0])
        formData.append("filename", fileName)
        httptransfer.uploadImageToServerStorage(formData).then(res => {
          if(res.status == 200){
            // setCurrentoption(res.data.result.option)
            setImageUrl(res.data.result.option)           
          }
        })
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
                <button
                  className="add_button"
                  // onClick={()=>toggleQuizModal()}
                >
                  <i className="fa fa-plus plus_icon"></i>
                </button>
              </div>
            </ModalHeader>
            <ModalBody>
            <div>
                <Label>Quiz</Label>
                <input placeholder="add quiz over here"
                className="form-control"
                 onChange={(e)=>{
                  // console.log(e.target.value)
                  setQuiz(e.target.value)
                  
                }}/>

<input type="file" onChange={(e)=>{

// optionImageUpload(e.target.files)
let fileArr =e.target.files[0].name.split(".")
let fileFormat = fileArr[1]

optionImageUpload(e.target.files,e.target.files[0].name,fileFormat)


// httptransfer.createImgeOptionName({
//   'quiz_id' : props.quizId,
//   'img_format': fileFormat,
//   'option_type' : questionType
// }).then(res=>{
//   if(res.status == 200){
//     if(res.data.result.option){
//       optionImageUpload(e.target.files,res.data.result.option)
//     }
//   }
// }
//   )

}}/> 
                <button 
                className="float-right m-2 bg-dark text-white"
                onClick={()=>{
                  saveQuiz()
                }}>save</button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      );
  }

  export default AddQuiz;