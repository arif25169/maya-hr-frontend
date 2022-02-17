import { post, get} from "../http";


export const fetchuserList = () => get("/user/list");
export const createUser = (payload) => post('/user/create',payload);
export const updateUser = (payload) => post('/user/update',payload);
export const deleteUser = (payload) => post('/user/delete?id='+payload);