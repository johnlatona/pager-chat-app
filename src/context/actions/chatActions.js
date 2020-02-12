import { SET_TEXT_MESSAGE, SET_IMAGE_MESSAGE, ADD_PERSON_TYPING, REMOVE_PERSON_TYPING } from '../constants';

export const setMessage = (message, dispatch) => {
  const { type } = message;
  const actionType = type === 'text' ? SET_TEXT_MESSAGE : SET_IMAGE_MESSAGE;
  dispatch({
    type: actionType,
    message,
  });
};

export const addPersonTyping = (typer, dispatch) => {
  dispatch({
    type: ADD_PERSON_TYPING,
    typer,
  });
};

export const removePersonTyping = (typer, dispatch) => {
  dispatch({
    type: REMOVE_PERSON_TYPING,
    typer,
  });
};

export const fetchGif = async query => {
  const apiKey = process.env.APIKEY || require('../../secrets').apiKey;
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?&q=${query}&api_key=${apiKey}&limit=1`, {
      method: 'GET',
    });
    const gif = await response.json();
    return gif;
  } catch(err) {
    const message = err.message || "Invalid gif request";
    console.error(message, err, err.stack);
  }
}