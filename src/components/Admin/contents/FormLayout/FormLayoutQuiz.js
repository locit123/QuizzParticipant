import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { FaUpload } from "react-icons/fa6";
import "./FormLayoutQuiz.scss";
import ConvertToBase from "../../../../utils/convertToBase64";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HERD", label: "HERD" },
];

const FormLayoutQuiz = ({
  setName,
  setDescription,
  setDifficulty,
  setQuizImage,
  name,
  description,
  difficulty,
}) => {
  const [image, setImage] = useState(null);

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setQuizImage(file);
      const base64 = await ConvertToBase.getBase64(file);
      setImage(base64);
    } else {
      setImage(null);
    }
  };
  return (
    <div className="form-quiz">
      <fieldset className="border rounded-3 p-3">
        <legend className="float-none w-auto px-3">Create Quiz:</legend>
        <FloatingLabel label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="description">
          <Form.Control
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FloatingLabel>
      </fieldset>
      <div className="my-3">
        <Select
          defaultValue={difficulty}
          onChange={setDifficulty}
          options={options}
          placeholder={"chose... "}
        />
      </div>
      <div className="file-img">
        <input type="file" id="file" hidden onChange={handleChangeFile} />
        <label htmlFor="file" className="label" style={{ cursor: "pointer" }}>
          <FaUpload />
          <span>UpLoad Image</span>
        </label>
      </div>
      <div className="img mt-3">
        {image ? (
          <div className="text-center">
            <img alt="hinh anh" src={image} />
          </div>
        ) : (
          <div className="span">
            <span>Preview</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormLayoutQuiz;
