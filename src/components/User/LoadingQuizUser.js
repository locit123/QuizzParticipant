import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const LoadingQuizUser = ({ item, index }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`data:image/png;base64,${item.image}`} />
      <Card.Body>
        <Card.Title>Quiz {index + 1}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Button variant="primary">Start Now</Button>
      </Card.Body>
    </Card>
  );
};

export default LoadingQuizUser;
