import axios from 'axios';
const apiUrl = 'https://api.spreaker.com/v2/';

export const getShowInfo = (showId) => {
  return axios.get(`${apiUrl}/shows/${showId}`);
}

export const getEpisodeList = (showId) => {
  return axios.get(`${apiUrl}/shows/${showId}/episodes`);
}