import axios from 'axios';
const apiUrl = 'https://api.spreaker.com/v2/';

export const getShowInfo = () => {
  return axios.get(`${apiUrl}/shows/1530161`);
}

export const getEpisodeList = () => {
  return axios.get(`${apiUrl}/shows/1530161/episodes`);
}