import axios from '@/utils/request'
const service = '/upload-file-service'
// 单个视频文件上传
export const videoUpload = (p, source, progressFn) =>
  axios.post(service + '/api/upload/file/single', p, { 'Content-Type': 'multipart/form-data', cancelToken: source.token, onUploadProgress: progressFn })
// 图片上传
export const imgUpload = (p, source, progressFn) =>
  axios.post(service + '/api/upload/file/img', p, { 'Content-Type': 'multipart/form-data', cancelToken: source.token, onUploadProgress: progressFn })
