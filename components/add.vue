<template>
  <div class="add-modal__overlay">
    <div class="add-modal">
      add new note.
      <input
        v-model="note"
        type="text"
        placeholder="note contents"
        class="add-modal__input"
      />
      <button @click="$emit('add', { note })">add</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      note: ''
    }
  }
}
</script>
<style lang="scss">
.add-modal__overlay {
  position: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.add-modal {
  background-color: white;
  width: 100%;
  max-width: 500px;
  margin: 0 10px;
  padding: 20px;
  color: black;

  &__input {
    display: block;
    margin: 1em 0;
    width: 100%;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ddd;
    outline: none;
  }
}
</style>
