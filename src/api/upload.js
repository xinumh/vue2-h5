import axios from '@/utils/request'

// 单个视频文件上传
export const videoUpload = p => axios.post('/api/upload/file/single', p, { 'Content-Type': 'multipart/form-data', cancelToken: new axios.CancelToken(c => console.log('C', c)) })
// 图片上传
export const imgUpload = p => axios.post('/api/upload/file/img', p, { 'Content-Type': 'multipart/form-data' })
