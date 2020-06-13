<template>
  <div class="wrapper">
    <div v-for="note of notes" :key="note.id" class="note">
      <h1>{{ note.content }}</h1>
    </div>
    <transition name="fade">
      <add v-if="showModal" @add="add($event)" />
    </transition>
    <div
      class="modal-button"
      :class="showModal && 'modal-button--open'"
      @click="showModal = !showModal"
    ></div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import add from '@/components/add.vue'

const NOTES_QUERY = gql`
  query {
    notes {
      content
      id
    }
  }
`

export default {
  components: {
    add
  },
  apollo: {
    notes: NOTES_QUERY
  },

  data() {
    return {
      notes: [],
      showModal: false
    }
  },
  methods: {
    add({ note }) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($content: String!) {
            addNote(content: $content) {
              content
              id
            }
          }
        `,
        variables: {
          content: note
        },
        update: (store, { data: { addNote } }) => {
          const data = store.readQuery({ query: NOTES_QUERY })
          data.notes.push(addNote)
          store.writeQuery({ query: NOTES_QUERY, data })

          this.showModal = false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: coral;
  color: white;
}

.modal-button {
  position: fixed;
  top: 25px;
  right: 25px;
  height: 30px;
  width: 30px;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    border: 2.5px solid white;
    transition: transform 0.5s ease-in-out;
  }

  &::before {
    transform: translateY(-50%) rotate(0deg);
  }

  &::after {
    transform: translateY(-50%) rotate(90deg);
  }

  &--open {
    &::before {
      transform: rotate(135deg);
    }

    &::after {
      transform: rotate(225deg);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
