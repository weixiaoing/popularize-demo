import type {
  keyDeatils,
  keyEarnType,
  keyWord,
  notice,
  novelEaringType,
  novelPopularizeType,
} from '@/types'
import { http } from '../utils/http'
import keyWords from '@/pages/keyWords/keyWords.vue'
// 获取公告列表
export const getNoticeList = () => {
  return http<notice[]>({
    url: '/notice/list',
    method: 'GET',
  })
}
// 公告详情
export const getNotice = ({ id }: { id: number }) => {
  return http<{ content: string }>({
    url: `/notice/${id}`,
    method: 'GET',
  })
}
// 获取推广信息
export const getProjectList = (name: string) => {
  return http<novelPopularizeType[]>({
    url: '/project/list',
    method: 'POST',
    data: {
      name,
    },
  })
}

// 小说推广收益数据
export const novelEaringAPI = () => {
  return http<novelEaringType[]>({
    url: '/novel/list',
    method: 'GET',
  })
}
// 创建关键词
export const createKeyAPI = (keyWords: keyWord[]) => {
  return http<null>({
    url: '/keyword/application',
    method: 'POST',
    data: keyWords,
  })
}
// 关键词查询
export const searchKeyAPI = ({ keyName, keyStatus }: { keyName: string; keyStatus: number[] }) => {
  return http<keyDeatils[]>({
    url: '/keyword/list',
    method: 'POST',
    data: {
      name: keyName,
      status: keyStatus,
    },
  })
}
// 获取关键词详情
export const getKeyDeatils = (id: string) => {
  return http<keyDeatils>({
    url: `/keyword/${id}`,
    method: 'GET',
  })
}
// 发布回填
export const postBack = ({
  keywordId,
  name,
  promotionLink,
}: {
  keywordId: number
  name: string
  promotionLink: string
}) => {
  return http<null>({
    url: '/keyword/postBackfill',
    method: 'POST',
    data: {
      keywordId,
      name,
      promotionLink,
    },
  })
}
// 取消申请
export const postCancel = (id: string) => {
  return http<null>({
    url: `/keyword/${id}`,
    method: 'POST',
  })
}

// 获取关键词收益
export const keyEarnAPI = ({
  beginTime,
  endTime,
  id,
  name,
}: {
  beginTime: string
  endTime: string
  id: number
  name: string
}) => {
  return http<keyEarnType[]>({
    url: '/novel/earning',
    method: 'POST',
    data: {
      beginTime,
      endTime,
      id,
      name,
    },
  })
}
