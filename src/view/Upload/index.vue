<template>
  <div class="upload">
    <van-form @submit="onSubmit" input-align="center">
      <div class="uploader">
        <van-field name="uploader">
          <template #input>
            <template  v-if="query.type==='video'">
              <van-uploader v-show="!videoSrc" accept="video/*" :max-count="1" :before-read="beforeReadVideo" />
              <video v-show="videoSrc" controls class="videoBox" :src="videoSrc"></video>
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
    }
  },
  mounted () {
    console.log('this.route', this.$route)
    const { query } = this.$route
    const { type } = query
    document.title = type === 'img' ? '图片上传' : '视频上传'
    this.query = query
    console.log('API', API)
  },
  methods: {
    onSubmit () {
      // this.show = true
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
      this.show = false
    },
    handleOverLyClick () {

    },
    // 上传视频
    async handleSubmitVideo () {
      const file = this.videoFile
      if (!file) {
        this.$toast('请选择视频')
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 3000)
      // const res = await API.videoUpload(formData).finally(() => { this.show = false })
      // if (res) {
      //   this.$toast('上传成功')
      // }
    },
    // 上传图片
    async handleSubmitImg () {
      console.log('this.imgList', this.imgList)
      const file = this.imgList[0] && this.imgList[0].file
      console.log('file', file)
      if (!file) {
        console.log('2', 2)
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
    display: flex;
    align-content: center;
    align-items: center;
  }
  .btn {
    width: 648px;
    height: 72px;
    margin: 30px auto;
    border-radius: 16px;
  }
  .videoBox {
    width: 700px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .content {
      width: 274px;
      height: 200px;
      // background: #fff;
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
