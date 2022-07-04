import { post, get, patch, postFile, postAuth , removeToken} from "../http";

export interface AuthRequest {
  username: string;
  password: string;
}

export const login = (auth: AuthRequest) => {
  return postAuth("/oauth/token", auth);
};
export const logout = (payload: string) => {
  return removeToken("/user/oauth/revoke-token", payload);
};
export const postpasswordChange = (payload) => post(`/user/password/change`, payload);

export const fetchsendPasswordRecoveryToken = (payload: string) => {
  return get("/public/password/recovery/token/send?userName="+payload);
};
export const fetchresetPassword = (payload: any) => {
  return get("/public/reset?password="+payload?.password+"&token="+payload?.token+"&userName="+payload?.userName);
};

export const instituteInfo = () => get("/institute/view");
export const goToCompany = (payload) => get("/company/jump?companyId="+payload);