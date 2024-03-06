import { http } from '../utils/http'
// 登录
export const loginAPI = (email: string, password: string) => {
  return http<String | null>({
    url: '/user/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  })
}
// 获取验证码
export const getCodeAPI = (email: string) => {
  return http<String | null>({
    url: '/user/sendEmail',
    method: 'POST',
    data: {
      email,
    },
  })
}
// 注册
export const registerAPI = (
  email: string,
  password: string,
  code: string,
  nickname: string,
  secoundPassword: string,
) => {
  return http<String | null>({
    url: '/user/register',
    method: 'POST',
    data: {
      email,
      password,
      code,
      nickname,
      secoundPassword,
    },
  })
}

export const updatePasswordAPI = ({
  code,
  email,
  password,
  secoundPassword,
}: {
  code: string
  email: string
  password: string
  secoundPassword: string
}) => {
  return http<null>({
    url: '/user/forget',
    method: 'POST',
    data: {
      code,
      email,
      password,
      secoundPassword,
    },
  })
}
