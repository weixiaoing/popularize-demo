export const delayCode = (fn: Function, delay: number) => {
  let flag = 1
  let timeout: number
  return () => {
    if (flag == 1) {
      flag = 0
      fn()
    } else {
      if (timeout) {
        uni.showToast({
          title: `请${delay / 1000}s后再发送`,
          icon: 'none',
        })
      } else
        timeout = setTimeout(() => {
          flag = 1
        }, delay)
    }
  }
}
