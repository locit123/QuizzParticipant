import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const LoadingQuizUser = ({ item, index }) => {
  const navigate = useNavigate();
  const handleClickStartNow = () => {
    navigate(`/quiz-question/${item.id}`, {
      state: { title: item.description },
    });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`data:image/png;base64,${item.image}`} />
      <Card.Body>
        <Card.Title>Quiz {index + 1}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Button variant="primary" onClick={handleClickStartNow}>
          Start Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LoadingQuizUser;
