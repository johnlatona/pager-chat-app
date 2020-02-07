import axios from 'axios';
import { SET_MESSAGE, SET_TYPING } from '../constants';

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    message,
  };
};

export const setTyping = (isTyping) => {
  return {
    type: SET_TYPING,
    isTyping,
  };
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