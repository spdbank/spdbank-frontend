<template>
  <div class="start">
    <div class="start__variant">
      <file-loader></file-loader>
    </div>
    <div class="start__variant">
      <button class="start__button">Создать</button>
    </div>
  </div>
</template>

<script>
import FileLoader from '@/components/FileLoader'

export default {
  name: 'StartPage',
  components: {
    FileLoader,
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped lang="scss" src="@/styles/StartPage.scss">

</style>
