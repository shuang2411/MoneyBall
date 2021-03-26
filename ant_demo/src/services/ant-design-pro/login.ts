// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { auth } from "@/services/ant-design-pro/firebase"

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(param: API.LoginParams, options?: { [key: string]: any }) {

  auth.signInWithEmailAndPassword(param.email, param.password)
  .catch((error) => {
    return error
  });

}
