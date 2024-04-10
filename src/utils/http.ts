import { useMemberStore } from '@/stores'

const baseUrl = `http://lackofcsy.cn:9000`

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非http开头拼接地址
    if (!options.url.startsWith('http://')) {
      options.url = baseUrl + options.url
    }
    // 请求超时.默认60s
    options.timeout = 10000
    // 添加请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加token
    const meberStore = useMemberStore()
    const token = meberStore.profile?.token
    if (token) {
      options.header.token = 'Bearer ' + token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 数据泛型
interface Data<T> {
  code: Number
  msg: string
  data: T
}
// 添加类型支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300 && (res.data as Data<T>).code == 200) {
          resolve(res.data as Data<T>)
        } else if ((res.data as Data<T>).code === 401) {
          // 401清理用户信息,跳转登录页
          const meberStore = useMemberStore()
          meberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail(error) {
        uni.showToast({
          icon: 'none',
          title: '网络错误,换个网络试试',
        })
        reject(error)
      },
    })
  })
}
