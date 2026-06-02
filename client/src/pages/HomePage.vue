<!-- ACTIVITY SOLUTION START -->
<script>
  import BannerComponent from '../components/BannerComponent.vue';

  export default {
    components: {
      BannerComponent
  },
  data() {
    return {
      bannerProps: {
        title: "CatFruit Blog",
        tagline: "Shenanigans Captured",
        destination: "Feed",
        buttonLabel: "Check our posts!"
      }
    }
  }

  }
</script>

<template>
  <div class="container-fluid">
    <BannerComponent :bannerProps="bannerProps" />
  </div>
</template>
