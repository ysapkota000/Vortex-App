const API_URL = "http://localhost:5000/api";

export const getStudents = async () => {
  const response = await fetch(`${API_URL}/students`);
  return response.json();
};