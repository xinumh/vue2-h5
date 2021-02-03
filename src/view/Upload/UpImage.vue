<template>
  <div class="upload">
    <van-form @submit="onSubmit" input-align="center">
      <div class="uploader">
        <van-uploader accept=".png, .jpg, .jpeg" v-model="imgList" :max-count="1" :deletable="!btnDisabled"/>
      </div>
      <van-button class="btn" block type="primary" :disabled="btnDisabled" native-type="submit">上传至电脑</van-button>
    </van-form>
     <XOverLay :show="show" @on-cancel="onCancel" :percentage="percentage"/>
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
      imgList: [],
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
    // 上传图片
    async onSubmit () {
      const file = this.imgList[0] && this.imgList[0].file
      if (!file) {
        this.$toast('请选择图片')
        return
      }
      const formData = new FormData()
      formData.append('file', file)

      this.show = true
      this.source = axios.CancelToken.source()
      const res = await API.imgUpload(formData, this.source, this.onUploadProgress)
        .finally(() => setTimeout(() => {
          this.show = false
        }, 1500))
      if (res) {
        this.btnDisabled = true
        this.$toast('上传成功')
      }
    },
    onUploadProgress (progressEvent) {
      const percentage = (progressEvent.loaded / progressEvent.total * 99 | 0)
      this.percentage = percentage
    },
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
  }
  .btn {
    .block (648px, 72px);
    margin: 30px auto;
    border-radius: 16px;
  }
}
</style>
