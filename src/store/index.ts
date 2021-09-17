import { TodoItemState } from '@/common/const'
import { TodoItem } from '@/common/interface'
import { storage } from '@/common/utils'
import { v4 as uuidv4 } from 'uuid'
import { createLogger, createStore, Store } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

const savePlugin = (
  store: Store<{
    todos: TodoItem[]
    item: TodoItem
  }>
) => {
  store.state.todos = storage.get()
  store.subscribe((mutation, state) => {
    storage.set(state.todos)
  })
}

export default createStore({
  state: {
    todos: [] as TodoItem[],
    item: {} as TodoItem
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
      const index = state.todos.findIndex(item => item.id === id)
      state.todos[index].state =
        state.todos[index].state === TodoItemState.DONE
          ? TodoItemState.OPEN
          : TodoItemState.DONE
    },
    remove (state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos[index].state = TodoItemState.DELETE
    },
    clear (state, type: TodoItemState) {
      state.todos = state.todos.filter(item => item.state !== type)
    }
  },
  actions: {},
  modules: {},
  getters: {
    dones: state =>
      state.todos.filter(item => item.state === TodoItemState.DONE),
    deletes: state =>
      state.todos.filter(item => item.state === TodoItemState.DELETE),
    opens: state =>
      state.todos.filter(item => item.state === TodoItemState.OPEN)
  },
  plugins: debug ? [createLogger(), savePlugin] : [savePlugin]
})
