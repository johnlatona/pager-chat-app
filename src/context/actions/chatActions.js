import axios from 'axios';
import { SET_MESSAGE } from '../constants';

export const setMessage = (message, dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    message,
  });
};

export const fetchGif = async query => {
  const apiKey = process.env.APIKEY || require('../../secrets').apiKey;
  try {
    const gif = await axios.get(`https://api.giphy.com/v1/gifs/search?&q=${query}&api_key=${apiKey}&limit=1`);
    return gif;
  } catch(err) {
    const message = err.message || "Invalid gif request";
    console.error(message, err, err.stack);
  }
}