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
        <select class="form-control" v-model="filterState">
          <option :value="TodoItemState.ALL">请选择以过滤</option>
          <option :value="TodoItemState.OPEN">待办中</option>
          <option :value="TodoItemState.DONE">已完成</option>
          <option :value="TodoItemState.DELETE">已删除</option>
        </select>
      </div>
    </div>
  </div>
  <div class="list-group ">
    <li
      v-for="item in todolist"
      :key="'item' + item.id"
      class="list-group-item d-flex align-item-center justify-content-between"
      :class="[{'text-black-50 read-line': item.state === TodoItemState.DELETE},
      {'green-line': item.state === TodoItemState.DONE}]"
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
          :class="[{
            'text-black-50 line-through': item.state === TodoItemState.DONE
          }]"
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
  <div>
    <button  class="float-right btn btn btn-danger mt-4" @click="togger()">
      {{ filterState === TodoItemState.ALL ? '隐藏已完成' : '全部展示' }}
    </button>
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
    const filterState = ref(TodoItemState.ALL)

    const add = () => {
      console.log(todoStr.value)
      store.commit('add', todoStr.value)
      todoStr.value = ''
    }

    const filterItem = (value:TodoItemState) => {
      if (value === TodoItemState.ALL) {
        return store.state.todos
      }
      return store.state.todos.filter((item) => item.state === value)
    }

    const check = (item: todoItem) => {
      if (item.state === TodoItemState.OPEN || item.state === TodoItemState.DONE) {
        store.commit('check', item.id)
      }
    }
    const remove = (id: string) => {
      store.commit('remove', id)
    }

    const togger = () => {
      filterState.value === TodoItemState.ALL ? filterState.value = TodoItemState.OPEN : filterState.value = TodoItemState.ALL
    }
    return {
      add,
      todoStr,
      todolist: computed(() => filterItem(filterState.value)),
      TodoItemState,
      check,
      remove,
      filterState,
      togger
    }
  }
})
</script>

<style lang="scss" scoped>
.green-line{
  background-color: #20c997 ;
  opacity: 0,2;
}
.line-through {
  text-decoration: line-through;
}
.read-line{
  background-color: #dc3545 ;
  opacity: 0,2;
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
