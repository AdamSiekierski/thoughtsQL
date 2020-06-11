<template>
  <h1>
    {{ hello }}
  </h1>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  asyncData() {
    return {
      hello: 'hello dupa!'
    }
  }
})
</script>
