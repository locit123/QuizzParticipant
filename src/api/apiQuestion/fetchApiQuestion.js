import { toast } from "react-toastify";
import { fetchApiQuestion } from "../fetchApi";

const postQuestion = async (quiz_id, description, questionImage) => {
  const formData = new FormData();
  formData.append("quiz_id", quiz_id);
  formData.append("description", description);
  formData.append("questionImage", questionImage);

  const res = await fetchApiQuestion.postQ(formData);
  if (res && res?.EC === 0) {
    toast.success(res?.EM);
    return res?.DT?.id;
  } else {
    toast.error(res?.EM);
  }
};

export { postQuestion };
