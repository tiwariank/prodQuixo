import { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Test from "../assets/background/test.jpg";
import "./dashboard.css";
import HttpTransferService from "../../utils/httptransfer";
import { Route } from "react-router-dom";
import Constants from "../../utils/constants";
import { Container, Col, Row } from "reactstrap";

const constant = new Constants();
const httptransfer = new HttpTransferService();

export default function Dashboard() {
  const [isAddQuizModalOpen, showAddQuizModal] = useState(false);
  const [isAddQuestionModalOpen, setAddQuestionModal] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const [selectedQuizId, selectQuizId] = useState("");

  useEffect(() => {
    queryQuiz();
  }, []);

  const queryQuiz = async () => {
    let quizQueryResponse = await httptransfer.quizQuery();
    if (quizQueryResponse && quizQueryResponse.status == 200) {
      setQuizList(quizQueryResponse.data.Result);
    } else {
      setQuizList([]);
    }
  };

  const card = (e, history) => {
    return (
      <div
        className="image_card mx-3"
        onClick={() => {
          history.push({
            pathname: `/quiz/${e.quiz_id}`,
          });
        }}
      >
        <div className="floated-text d-flex justify-content-center" fluid>
          <div className="d-inline quizz-tag">{e.quiz}</div>
        </div>
        <div className="hover-zoom" fluid>
          <img fluid
            src={`${constant.BASE_URL}/media/${e.imageUrl}`}
            className="quizz_image_css"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>

        <div style={{ position: "relative" }}>
          <div className="float-cover"></div>
          <div className="cover-css"></div>
        </div>
        <Route
          render={({ history }) => (
            <Container fluid>
              <Row className="text-center">
                {quizList && quizList.length > 0
                  ? quizList.map((e) => {
                      return (
                        <Col fluid md={3} sm={6} xs={6} xl={3}>
                          <p>{card(e, history)}</p>
                        </Col>
                      );
                    })
                  : ""}
              </Row>
            </Container>
          )}
        />

        <Footer />
      </div>
    </div>
  );
}
