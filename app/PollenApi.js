import axios from 'axios'

const AUTH = 'Basic cmVhY3Q6bmF0aXZl';
const API_KEY = 'd3b74bd5-8fc5-4953-aa6a-1be333cd6e0b';

function createApi () {
    return axios.create({
      headers: {
        get: {      
            'Authorization': AUTH,
            'apikey' : API_KEY,
        }
        
      }
    })
  }

export function data (action) {
    let serverAxios = createApi()
    return serverAxios.get('https://community-staging.pollenstores.co/interview/api/communities/all')
}
