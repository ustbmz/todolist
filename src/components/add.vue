<template>
  <div class="form-group">
    <label>添加待办事项</label>
    <div class="row">
      <div class="col-8">
        <input
          type="text"
          class="form-control"
          v-model="todoStr"
          @keydown.enter="add()"
        />
      </div>
      <div class="col-4">
        <select class="form-control">
          <option value="">请选择以过滤</option>
          <option value="">已完成</option>
          <option value="">已删除</option>
        </select>
      </div>
    </div>
  </div>
  <div class="list-group ">
    <li
      v-for="item in todolist"
      :key="'item' + item.id"
      class="list-group-item d-flex align-item-center justify-content-between"
      @click.stop="check(item)"
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
          @click.stop.prevent="check(item)"
          :class="{
            'text-black-50 line-through': item.state === TodoItemState.DONE
          }"
        >
          {{ item }}
        </label>
      </div>
      <div
        class="float-right ctrls"
        :class="{ 'd-none': item.state !== TodoItemState.OPEN }"
      >
        <button class="btn btn-sm btn-warning mr-2">编辑</button>
        <button class="btn btn-sm btn-danger" @click.stop="remove(item.id)">
          删除
        </button>
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import { TodoItemState } from '@/common/const'
import { todoItem } from '@/common/interface'
import store from '@/store'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const todoStr = ref('')

    const add = () => {
      console.log(todoStr.value)
      store.commit('add', todoStr.value)
      todoStr.value = ''
    }

    const check = (item: todoItem) => {
      if (item.state === TodoItemState.OPEN || item.state === TodoItemState.DONE) {
        store.commit('check', item.id)
      }
    }
    const remove = (id: string) => {
      store.commit('remove', id)
    }

    return {
      add,
      todoStr,
      todolist: computed(() => store.state.todos),
      TodoItemState,
      check,
      remove
    }
  }
})
</script>

<style lang="scss" scoped>
.line-through {
  text-decoration: line-through;
}
.list-group-item {
  user-select: none;
  &:hover {
    .ctrls {
      display: block;
    }
  }
  .ctrls {
    display: none;
  }
}
</style>
