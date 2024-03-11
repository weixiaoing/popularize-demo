export type notice = {
  id: number
  userId: number
  title: string
  createTime: string
  updateTime: string
  content: string
}

export type novelPopularizeType = {
  coverImage: string
  id: number
  intro: number
  name: string
}

export type novelEaringType = {
  bookId: number
  bookName: string
  coverImage: string

  latestEarnings: number

  latestEarningsDate: string

  totalEarnings: number
}

export type userType = {
  bankCard: null
  /**
   * 签约状态，0未签约、1已签约
   */
  contractStatus: number
  email: string
  avatar: string
  /**
   * 操作用户信息都是通过这个id
   */
  id: number
  idCard: null
  nickname: string
  realName: null
  role: string
  /**
   * 达人id
   */
  userId: string
  avatarUrl: string
}

export type bankType = {
  /**
   * 银行详细地址
   */
  bankAddress: string
  bankName: string
  cardNumber: string
  phoneNumber: string
  /**
   * 银行省份地址
   */
  province: string
}

export type keyWord = {
  bookId: number
  bookName: string
  keyWord: string
}

export interface keyDeatils {
  id: number
  applicationTime: string
  bookName: string
  keyword: string
  keywordStatus: number
  operation: string
  workInfoVOS: WorkInfoVO[]
}

export interface WorkInfoVO {
  name: string
  promotionLink: string
  uploadTime: string
}

export interface keyEarnType {
  date: string
  earning: number
  keyword: string
  pullNewSum: number
  id: number
}

export interface bankInfo {
  bankAddress: string
  bankName: string
  cardNumber: string
  phoneNumber: string
  province: string
}

export interface userBankInfo {
  bankAddress: string
  bankName: string
  cardNumber: string
  id: number
  phoneNumber: string
  province: string
  userId: number
}
