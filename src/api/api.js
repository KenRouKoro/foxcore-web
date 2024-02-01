import axios from "axios";
import {useRouter} from "vue-router";

axios.defaults.timeout = 3000

const router = useRouter();

export let api_path = "/api"

export let hooks = []

export function setApiPath(newPath) {
    api_path = newPath;
    for (let index in hooks){
        hooks[index]()
    }
}

export function addApiPathHook(hook) {
    hooks.push(hook)
}

if (document.cookie.indexOf("api_path") > -1) {
    api_path = decodeURIComponent(document.cookie.split("api_path=")[1].split(";")[0])
}
export const getConfigsList = () => {
    return axios.get(api_path+'/list')
}

export const getIndexMarkdown = ()=>{
    return axios.get(api_path+'/index.md')
}

export const getMetaData = (id)=>{
    return axios.get(api_path+'/metadata?id='+id)
}
export const saveData = (configID, fieldID, data) => {
    return axios.post(api_path + '/save', {
        configID: configID,
        fieldID: fieldID,
        data: data // 确保这里发送的是一个对象
    },{

        headers: {
            'Content-Type': 'text/plain'
        }
    });
};