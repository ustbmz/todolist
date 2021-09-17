<template>
     <div class="list-group ">
    <li
      v-for="item in todolist"
      :key="'item' + item.id"
      class="list-group-item d-flex align-item-center justify-content-between"
    >
      <div class="form-check">
        <input
          type="checkbox"
          :id="item.id"
          class="form-checkinput"
          :checked="item.state === TodoItemState.DONE"
          :disabled="item.state === TodoItemState.DELETE"
        />

        <label
          :for="item.id"
        >
          {{ item.text }}
        </label>
      </div>
    </li>
  </div>
  <div>
    <button  class="float-right btn btn btn-danger mt-4" @click="clear()">
      全部清除
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { TodoItemState } from '@/common/const'
import store from '@/store'

export default defineComponent({
  setup () {
    const filterItem = (value:TodoItemState) => {
      if (value === TodoItemState.ALL) {
        return store.state.todos
      }
      return store.state.todos.filter((item) => item.state === value)
    }
    const clear = () => {
      console.log('clear')
    }

    return {
      TodoItemState,
      clear,
      todolist: computed(() => filterItem(TodoItemState.DONE))
    }
  }
})
</script>

<style scoped>
</style>
