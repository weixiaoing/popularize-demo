export const wait = (fn: any, delay: number) => {
  let flag = 0
  let timeout: number | undefined = undefined
  if (flag == 0) {
    fn()
    flag = 1
  } else {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      flag = 0
    }, delay)
  }
}
