import axios from 'axios';

export const api = axios.create({
  baseURL: "https://rcktmovies-api.onrender.com"
});