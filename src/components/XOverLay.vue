<template>
  <van-overlay :show="show" @click="show = false" >
    <div class="wrapper">
      <div class="content">
        <p class="desc">正在上传 {{percentage}}%</p>
        <van-progress :percentage="percentage" :show-pivot="false" v-if="show" color="#7175D8"/>
        <p class="desc" @click="onCancel">取 消</p>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { Overlay, Progress } from 'vant'
export default {
  components: {
    [Overlay.name]: Overlay,
    [Progress.name]: Progress,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    percentage: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  methods: {
    // 取消上传
    onCancel () {
      this.$emit('on-cancel')
    },
  }
}
</script>

<style lang="less" scoped>
@import '@/style/mixin.less';
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
</style>
