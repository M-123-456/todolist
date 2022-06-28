# Todo App

- App.js
    - Router
        - Home
            - Nav
            - TodoListOverview            
                - ListModal                  
                - (Link (todoList.id))
                - TodoList
                    - TodoListSetting
                    - TodoForm!
                    - Todos
                        - Todo
                            -TodoForm!
                               

- App.js
    - Router
        - Home
            - Nav
            - TodoListOverview
                [todoLists, setTodoLists]
                [listName, setListName]
                [isModal, setIsModal]
                E (getLocalTodoLists, [])
                E (saveLocalTodoLists, [todoLists])

                - ListModal
                    (addTodoList, handleChangeName, listName, setIsModal)

                - (Link (todoList.id))

                - TodoList
                    (todoLists, setTodoLists, listId, listName)
                    [todos, setTodos]
                    [input, setInput]
                    [filteredTodos, setFilteredTodos]
                    E (handleFilter, [todos])
                    E (getLocalTodos, [])
                    E (updateTodoList, [todos])

                    - TodoListSetting
                        (listId, setTodoLists)
                    
                    - TodoForm!
                        (input, setInput, setTodos, addTodo, listId)

                    - Todos
                        (completeTodo, removeTodo, todos, setTodos, listId)
                        
                        - Todo
                        (id, todo, isDone, completeTodo, removeTodo, todos, setTodos)
                        [isEdit, setIsEdit]
                        [editInput, setEditInput]

                            -TodoForm!
                                (id, isEdit, setIsEdit, editInput, setEditInput, updateTodo)


