<template>
  <h1>{{ hello }}</h1>
</template>
<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    hello: gql`
      query {
        hello
      }
    `
  },
  data() {
    return {
      hello: ''
    }
  }
}
</script>
