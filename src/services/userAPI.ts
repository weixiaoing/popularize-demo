import { http } from '../utils/http'
import type { bankInfo, novelEaringType, userBankInfo, userType } from '@/types'
// 登录
export const loginAPI = (email: string, password: string) => {
  return http<{ token: string }>({
    url: '/user/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  })
}
// 获取验证码
export const getCodeAPI = (email: string, type: Number) => {
  return http<null>({
    url: '/user/sendEmail',
    method: 'POST',
    data: {
      email,
      type,
    },
  })
}
// 注册
export const registerAPI = (
  email: string,
  password: string,
  code: string,
  nickname: string,
  secondPassword: string,
) => {
  return http<{ token: String }>({
    url: '/user/register',
    method: 'POST',
    data: {
      email,
      password,
      code,
      nickname,
      secondPassword,
    },
  })
}
// 修改密码
export const updatePasswordAPI = ({
  code,
  email,
  password,
  secondPassword,
}: {
  code: string
  email: string
  password: string
  secondPassword: string
}) => {
  return http<null>({
    url: '/user/forget',
    method: 'POST',
    data: {
      code,
      email,
      password,
      secondPassword,
    },
  })
}
// 退出
export const quitAPI = () => {
  return http<null>({
    url: '/user/logout',
    method: 'POST',
  })
}

// 上传图片
export const uploadImagesAPI = (file: any) => {
  return http<{ url: string }>({
    url: '/user/upload',
    method: 'POST',
    data: file,
  })
}

export const getUserInfo = () => {
  return http<userType>({
    url: '/user/info',
    method: 'GET',
  })
}

// 获取银行卡信息
export const getBankAPI = () => {
  return http<userBankInfo>({
    url: '/user/bankInfo',
    method: 'GET',
  })
}
// 绑定银行卡
export const updateBankAPI = ({
  bankAddress,
  bankName,
  cardNumber,
  phoneNumber,
  province,
}: {
  bankAddress: string
  bankName: string
  cardNumber: string
  phoneNumber: string
  province: string
}) => {
  return http<null>({
    url: '/user/setBank',
    method: 'POST',
    data: {
      bankAddress,
      bankName,
      cardNumber,
      phoneNumber,
      province,
    },
  })
}
// 签约
export const getSigned = () => {
  return http<null>({
    url: '/user/sign',
    method: 'GET',
  })
}

// 更改邮箱
export const updateEmail = ({
  code,
  newEmail,
  oldEmail,
}: {
  code: string
  newEmail: string
  oldEmail: string
}) => {
  return http<null>({
    url: '/user/changeEmail',
    method: 'POST',
    data: {
      code,
      newEmail,
      oldEmail,
    },
  })
}

// 验证邮箱
export const testEmail = ({ email, code }: { email: string; code: string }) => {
  return http<null>({
    url: '/user/validation',
    method: 'POST',
    data: {
      email,
      code,
    },
  })
}
