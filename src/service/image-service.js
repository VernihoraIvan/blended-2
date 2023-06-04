import axios from 'axios';

const API_KEY = 'hP874SUqGGJFjfVNp11nH4noVRz7Xa9CYZprCLe5nR2votGc3og8ouPI';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
