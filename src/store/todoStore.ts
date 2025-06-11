import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
    id: string
    title: string
    completed: boolean
    createdAt: Date
    priority: 'low' | 'medium' | 'high'
}

interface TodoStore {
    todos: Todo[]
    addTodo: (title: string, priority: Todo['priority']) => void
    toggleTodo: (id: string) => void
    deleteTodo: (id: string) => void
    updateTodoPriority: (id: string, priority: Todo['priority']) => void
}

export const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            todos: [],
            addTodo: (title, priority) =>
                set((state) => ({
                    todos: [
                        ...state.todos,
                        {
                            id: Math.random().toString(36).substr(2, 9),
                            title,
                            completed: false,
                            createdAt: new Date(),
                            priority,
                        },
                    ],
                })),
            toggleTodo: (id) =>
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, completed: !todo.completed } : todo
                    ),
                })),
            deleteTodo: (id) =>
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                })),
            updateTodoPriority: (id, priority) =>
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, priority } : todo
                    ),
                })),
        }),
        {
            name: 'todo-storage',
        }
    )
) 