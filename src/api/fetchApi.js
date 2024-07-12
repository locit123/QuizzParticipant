import axiosInstance from "./axiosInstance";

const fetchApiParticipants = {
  postP: (data) => axiosInstance.post(`participant`, data),
  getP: (page, limit) =>
    axiosInstance.get(`participant?page=${page}&limit=${limit}`),
  deleteP: (id) => axiosInstance.delete(`participant`, { data: { id } }),
  putP: (data) => axiosInstance.put(`participant`, data),
};

const fetchApiAuth = {
  login: (data) => axiosInstance.post(`login`, data),
};

const fetchApiQuiz = {
  getQBP: () => axiosInstance.get(`quiz-by-participant`),
};

export { fetchApiParticipants, fetchApiAuth, fetchApiQuiz };
