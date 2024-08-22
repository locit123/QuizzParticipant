import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import "./DashBoard.scss";
import { getDashBoard } from "../../api/apiAuth/fetchApiAuth";
const DashBoard = () => {
  const [dataDashBoard, setDataDashBoard] = useState({});
  const [dataChart, setDataChart] = useState([]);
  const data = useMemo(() => {
    return [
      {
        name: "Question",
        question: dataDashBoard?.others?.countQuestions,
      },
      {
        name: "Quizzes",
        quizzes: dataDashBoard?.others?.countQuiz,
      },
      {
        name: "Answers",
        answers: dataDashBoard?.others?.countAnswers,
      },
    ];
  }, [dataDashBoard]);

  useEffect(() => {
    getApiDoshBoard();
  }, []);

  const getApiDoshBoard = async () => {
    await getDashBoard(setDataDashBoard);
  };

  useEffect(() => {
    setDataChart(data);
  }, [data]);
  return (
    <div className="layout-dashBoard">
      <div className="box-left">
        <div className="left">
          <div className="total-users total">
            TOTAL USERS:<b>{dataDashBoard?.users?.total}</b>
          </div>
          <div className="total-quizzes total">
            TOTAL QUIZZES:<b>{dataDashBoard?.others?.countQuiz}</b>
          </div>
        </div>
        <div className="right">
          <div className="total-question total">
            TOTAL QUESTION:<b>{dataDashBoard?.others?.countQuestions}</b>
          </div>
          <div className="total-answers total">
            TOTAL ANSWERS:<b>{dataDashBoard?.others?.countAnswers}</b>
          </div>
        </div>
      </div>
      <div className="box-right">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={dataChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="question" fill="#82ca9d" />
            <Bar dataKey="quizzes" fill="#e80e0e" />
            <Bar dataKey="answers" fill="#ffc107" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashBoard;
