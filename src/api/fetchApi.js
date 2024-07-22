import axiosInstance from "./axiosInstance";

const fetchApiParticipants = {
  postP: (data) => axiosInstance.post(`participant`, data),
  getP: (page, limit) =>
    axiosInstance.get(`participant?page=${page}&limit=${limit}`),
  deleteP: (id) => axiosInstance.delete(`participant`, { data: { id } }),
  putP: (data) => axiosInstance.put(`participant`, data),
  getPA: () => axiosInstance.get(`participant/all`),
};

const fetchApiAuth = {
  login: (data) => axiosInstance.post(`login`, data),
  register: (data) => axiosInstance.post(`register`, data),
};

const fetchApiQuiz = {
  getQBP: () => axiosInstance.get(`quiz-by-participant`),
  getQWQ: (id) => axiosInstance.get(`quiz-with-qa/${id}`),
  postQ: (data) => axiosInstance.post(`quiz`, data),
  getQA: (payload) => axiosInstance.get(`quiz/${payload}`),
  deleteQ: (id) => axiosInstance.delete(`quiz/${id}`),
  putQ: (data) => axiosInstance.put(`quiz`, data),
  postA_Q_T_U: (data) => axiosInstance.post(`quiz-assign-to-user`, data),
};

const fetchApiAnswer = {
  postFA: (data) => axiosInstance.post(`quiz-submit`, { ...data }),
  postA: (data) => axiosInstance.post(`answer`, data),
};
const fetchApiQuestion = {
  postQ: (data) => axiosInstance.post(`question`, data),
};
export {
  fetchApiParticipants,
  fetchApiAuth,
  fetchApiQuiz,
  fetchApiAnswer,
  fetchApiQuestion,
};
