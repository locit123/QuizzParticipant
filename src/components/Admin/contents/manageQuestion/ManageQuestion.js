import Accordion from "react-bootstrap/Accordion";
import Question from "./Questions/Question";
const ManageQuestion = () => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          <Question />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ManageQuestion;
