<template>
  <div>
    <UpVideo v-if="query.type==='video'"/>
    <UpImage v-if="query.type==='img'"/>
  </div>
</template>

<script>
import UpVideo from '@/view/Upload/UpVideo'
import UpImage from '@/view/Upload/UpImage'
const typeEnum = {
  img: '图片上传',
  video: '视频上传',
}
export default {
  components: {
    UpVideo, UpImage
  },
  data () {
    return {
      query: {}
    }
  },
  mounted () {
    const { query } = this.$route
    const { type } = query
    document.title = typeEnum[type] || '上传'
    this.query = query
  },
}
</script>
