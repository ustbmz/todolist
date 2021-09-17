import { TodoItemState } from '@/common/const'
import { todoItem } from '@/common/interface'
import { v4 as uuidv4 } from 'uuid'
import { createLogger, createStore } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    todos: [] as todoItem[]
  },
  mutations: {
    add (state, value) {
      state.todos.push({
        id: uuidv4(),
        text: value,
        state: TodoItemState.OPEN
      })
    },
    check (state, id) {
      const index = state.todos.findIndex((item) => item.id === id)
      state.todos[index].state = state.todos[index].state === TodoItemState.DONE ? TodoItemState.OPEN : TodoItemState.DONE
    },
    remove (state, id) {
      const index = state.todos.findIndex((item) => item.id === id)
      state.todos[index].state = TodoItemState.DELETE
    }

  },
  actions: {
  },
  modules: {
  },
  plugins: debug ? [createLogger()] : []
})
