export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    priority: 'low' | 'medium' | 'high';
}
interface TodoStore {
    todos: Todo[];
    addTodo: (title: string, priority: Todo['priority']) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    updateTodoPriority: (id: string, priority: Todo['priority']) => void;
}
export declare const useTodoStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<TodoStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<TodoStore, TodoStore>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: TodoStore) => void) => () => void;
        onFinishHydration: (fn: (state: TodoStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<TodoStore, TodoStore>>;
    };
}>;
export {};
