<template>
  <div class="upload">
    <van-form @submit="onSubmit" input-align="center">
      <div class="uploader">
        <van-field name="uploader">
          <template #input>
            <template  v-if="query.type==='video'">
              <van-uploader v-show="!videoSrc" accept="video/*" :max-count="1" :before-read="beforeReadVideo" />
              <video v-show="videoSrc" controls class="videoBox" :src="videoSrc"></video>
              <span v-if="videoSrc" class="videoClose" @click="handleDelVideo">x</span>
            </template>
            <template v-else-if="query.type==='img'">
              <van-uploader v-model="imgList" :max-count="1"/>
            </template>
          </template>
        </van-field>
      </div>
      <van-button class="btn" block type="primary" native-type="submit">上传至电脑</van-button>
    </van-form>
    <van-overlay :show="show" @click="show = false" @click.stop="handleOverLyClick">
      <div class="wrapper">
        <div class="content">
          <p class="desc">正在上传 {{percentage}}%</p>
          <van-progress :percentage="percentage" :show-pivot="false" v-if="show" color="#7175D8"/>
          <p class="desc" @click="onCancel">取 消</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Button, Uploader, Form, Field, Overlay, Progress } from 'vant'
import * as API from '@/api/upload'
import axios from 'axios'
export default {
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Form.name]: Form,
    [Field.name]: Field,
    [Overlay.name]: Overlay,
    [Progress.name]: Progress,
  },
  data () {
    return {
      uploader: [],
      videoSrc: '',
      videoFile: '',
      imgList: [],
      type: '',
      query: {},
      show: false,
      percentage: 0,
      timer: null,
      source: null
    }
  },
  mounted () {
    const { query } = this.$route
    const { type } = query
    document.title = type === 'img' ? '图片上传' : '视频上传'
    this.query = query
  },
  methods: {
    onSubmit () {
      const { type } = this.query
      switch (type) {
        case 'img':
          this.handleSubmitImg()
          break
        case 'video':
          this.handleSubmitVideo()
          break
        default:
          break
      }
    },
    // 取消上传
    onCancel () {
      this.source.cancel('上传已取消')
      this.show = false
    },
    handleOverLyClick () {

    },
    handleDelVideo () {
      this.videoSrc = ''
      this.videoFile = ''
    },
    // 上传视频
    async handleSubmitVideo () {
      const that = this
      const file = that.videoFile
      if (!file) {
        this.$toast('请选择视频')
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      this.show = true
      that.source = axios.CancelToken.source()
      function onUploadProgress (progressEvent) {
        const percentage = (progressEvent.loaded / progressEvent.total * 100 | 0)
        that.percentage = percentage
      }
      const res = await API.upload(formData, that.source, onUploadProgress).finally(() => { that.show = false })
      if (res) {
        that.$toast('上传成功')
      }
    },
    // 上传图片
    async handleSubmitImg () {
      const file = this.imgList[0] && this.imgList[0].file
      if (!file) {
        this.$toast('请选择图片')
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      const res = await API.imgUpload(formData)
      if (res) {
        this.$toast('上传成功')
      }
    },
    beforeReadVideo (file) {
      this.videoFile = file
      this.videoSrc = this.getObjectURL(file)
    },
    getObjectURL (file) {
      var url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
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
      background: #fff;
      font-size: 40px;
      line-height: 30px;
      text-align: center;
      border-bottom-left-radius: 40px;
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
  .wrapper {
    .flex-center();
    height: 100%;
    .content {
      .block(274px, 200px);
      .desc {
        text-align: center;
        font-size: 24px;
        color: #fff;
      }
      .van-progress {
        height: 16px;
        border-radius: 16px;
      }
    }
  }
}
</style>
