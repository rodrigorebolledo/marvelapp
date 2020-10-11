import axios from 'axios';
import md5 from 'md5';

const initialData = {
    publicKey: '562f07df5d9c09b175e9e9948e694bb7',
    privateKey: 'd43f100ee1030280f88719dd1598eab289b1c7fd',
}

const getTimeStamp = () => {
    let dateNow = Date.now();
    let ts = Math.floor(dateNow/1000);
    return ts;
}

const hasher = () => {
    let concat = getTimeStamp() + initialData.privateKey + initialData.publicKey
    return md5(concat);
}

const api = axios.create({
    baseURL: 'http://gateway.marvel.com/',
    params: {
        apikey: initialData.publicKey,
        hash: hasher(),
        ts: getTimeStamp()
    }
});


const getApiCharacters = (setApiData, setIsLoading, setErrorCharacters) => {
    api.get('/v1/public/characters')
    .then((res) => {
        setApiData(res.data.data.results);
        setIsLoading(false);
    })
    .catch((err) => {
        setErrorCharacters(err);
    })
}

export {getApiCharacters, api};