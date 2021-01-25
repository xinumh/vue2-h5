import axios from '@/utils/request'

// 单个视频文件上传
export const videoUpload = (p, source, progressFn) =>
  axios.post('/api/upload/file/single', p, { 'Content-Type': 'multipart/form-data', cancelToken: source.token, onUploadProgress: progressFn })
// 图片上传
export const imgUpload = (p, source, progressFn) =>
  axios.post('/api/upload/file/img', p, { 'Content-Type': 'multipart/form-data', cancelToken: source.token, onUploadProgress: progressFn })
export const upload = (p, source, progressFn) =>
  axios.post('/demo/upload', p, { cancelToken: source.token, onUploadProgress: progressFn })
