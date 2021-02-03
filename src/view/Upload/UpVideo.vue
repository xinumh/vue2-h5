<template>
  <div class="upload">
    <van-form @submit="onSubmit" input-align="center">
      <div class="uploader">
        <van-field name="uploader">
          <template #input>
            <van-uploader v-show="!videoImgSrc" accept="video/*" :max-count="1" :before-read="beforeReadVideo" />
            <van-image v-show="videoImgSrc" class="videoBox" :src="videoImgSrc" />
            <span v-if="videoImgSrc && !btnDisabled" class="videoClose" @click="handleDelVideo">
              <van-icon name="cross" />
            </span>
          </template>
        </van-field>
      </div>
      <van-button class="btn" block type="primary" :disabled="btnDisabled" native-type="submit">上传至电脑</van-button>
      <XOverLay :show="show" @on-cancel="onCancel" :percentage="percentage"/>
    </van-form>
  </div>
</template>

<script>
import { Button, Uploader, Form, Field, Icon, Image as VanImage } from 'vant'
import * as API from '@/api/upload'
import axios from 'axios'
import XOverLay from '@/components/XOverLay'
export default {
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    XOverLay
  },
  data () {
    return {
      videoImgSrc: '',
      videoFile: null,
      show: false,
      percentage: 0,
      source: null,
      btnDisabled: false,
    }
  },
  methods: {
    // 取消上传
    onCancel () {
      this.source.cancel('上传已取消')
      this.show = false
    },
    // 重新上传
    handleDelVideo () {
      this.videoImgSrc = ''
      this.videoFile = null
    },
    // 上传视频
    async onSubmit () {
      const file = this.videoFile
      if (!file) {
        this.$toast('请选择视频')
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      this.show = true
      this.source = axios.CancelToken.source()
      const res = await API.videoUpload(formData, this.source, this.onUploadProgress)
        .finally(() => setTimeout(() => { this.show = false }, 1500))
      if (res) {
        this.btnDisabled = true
        this.$toast('上传成功')
      }
    },
    onUploadProgress (progressEvent) {
      const percentage = (progressEvent.loaded / progressEvent.total * 99 | 0)
      this.percentage = percentage
    },
    async beforeReadVideo (file) {
      console.log('file', file)
      try {
        if (file.size > 500 * 1024 * 1024) {
          this.$toast('请上传低于500M的视频')
          return
        }
        const { width, height, duration, videoImgSrc } = await this.getVideoPlayerInfo(file)
        console.log('width', width)
        console.log('height', height)
        console.log('duration', duration)
        if (width * height > 1920 * 1080) {
          this.$toast('请上传不超过1080P分辨率的视频')
          return
        }
        if (duration > 900) {
          this.$toast('请上传不超过15分钟的视频')
          return
        }
        this.videoFile = file
        this.videoImgSrc = videoImgSrc
      } catch (err) {
        console.log('err', err)
      }
    },
    getObjectURL (file) {
      const windowURL = window.URL || window.webkitURL
      return windowURL.createObjectURL(file)
    },

    async getVideoPlayerInfo (file) {
      return new Promise((resolve) => {
        const videoElement = document.createElement('video')
        videoElement.src = this.getObjectURL(file)
        videoElement.preload = 'auto'
        videoElement.currentTime = 1
        videoElement.controls = true
        videoElement.playsinline = false
        videoElement.setAttribute('x5-video-player-type', 'h5')
        videoElement.setAttribute('x5-video-player-fullscreen', true)
        videoElement.setAttribute('x5-video-orientation', 'h5')
        if (typeof WeixinJSBridge !== 'undefined') {
          window.WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            console.log('2', 2)
            // 利用该方法进行自动播放
            videoElement.play()
          })
        }
        videoElement.addEventListener('canplay', function () {
          const canvas = document.createElement('canvas')
          const { videoWidth, videoHeight, duration } = videoElement
          canvas.width = videoWidth
          canvas.height = videoHeight
          canvas.getContext('2d').drawImage(videoElement, 0, 0, videoWidth, videoHeight) // 绘制canvas
          const videoImgSrc = canvas.toDataURL('image/jpeg') // 转换为base64
          console.log('videoImgSrc', videoImgSrc)
          resolve({
            duration: duration,
            width: videoWidth,
            height: videoHeight,
            videoImgSrc
          })
        })
      }).catch(err => console.log('err', err))
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/style/mixin.less';
.upload {
  height: 100vh;
  background: #F3F3F3;
  .van-form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .van-cell {
    background-color: transparent;
    padding: 0;
  }
  .uploader {
    flex: 1;
    .flex-center-self ();
    .videoClose {
      .block (40px, 40px, inline-block);
      position: absolute;
      right: 0;
      top: 0;
      background: #000;
      font-size: 40px;
      line-height: 30px;
      text-align: center;
      border-bottom-left-radius: 40px;
      .van-icon-cross {
        color: #fff;
        font-size: 18px;
        float: right;
      }
    }
  }
  .btn {
    .block (648px, 72px);
    margin: 30px auto;
    border-radius: 16px;
  }
  .videoBox {
    width: 720px;
  }
}
</style>
