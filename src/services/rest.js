import axios from 'axios';

const axiosInst = axios.create({
    baseURL: 'http://www.omdbapi.com',
    headers: {'Content-Type': 'application/json'}
});

const apiCall = (forApi, data={}, dynamicEndpoint="") => {
    
    let config = configApi(forApi,data,dynamicEndpoint)
    return new Promise((resolve, reject) =>{
        axiosInst.request(config)
        .then((res)=>{
            if (res.status === 200 && res.statusText === 'OK') {
                console.log("RES", res)
                const data = res.data.Search ? res.data.Search : res.data;
                resolve(data)
            } 
        })
        .catch((error)=>{
            reject(error.response)
        })
    })
}

const configApi = (forApi,data,dynamicEndpoint) => {
    const apikey = 'aa2cc9bf';
    let config = {};
    const searchKey = data.value;
    switch(forApi){
        case "MoviesListById":
            config.method = 'get';
            config.url = `?apikey=${apikey}&i=${searchKey}`;
        break;

        case "MoviesListByTitle":
            config.method = 'get';
            config.url = `?apikey=${apikey}&s=${searchKey}`;
        break;
        default:
    }

    return config;
}

export default apiCall;