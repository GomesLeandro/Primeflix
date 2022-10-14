import axios from 'axios';

//Base da url:  https://api.themoviedb.org/3/
//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=65acaff68f0de4fb74095acf48b99fb2&language=pt-BR


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;