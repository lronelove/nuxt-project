<template>
  <div>
    <the-head></the-head>  
    <nuxt/>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHead from '@/components/TheHead.vue'
import TheFooter from '@/components/TheFooter.vue'

  export default {
    components: {
      TheHead,
      TheFooter
    }
  }  
</script>

<style lang="scss">
  @import url('@/assets/css/common/common.scss');
</style>
