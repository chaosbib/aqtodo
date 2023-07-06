import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '../model/Todo';

const baseUrl = process.env.REACT_APP_API ?? "http://localhost:8181/api";

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, mode: "cors" }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "/todo",
        method: "GET"
      }),
      providesTags: ['Todos']
    }),
    createTodo: builder.mutation<Todo, Todo>({
      query: (todo: Todo) => ({
        url: "/todo",
        method: "POST",
        body:  todo
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo: Todo) => ({
        url: "/todo",
        method: "PATCH",
        body:  todo
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation<Todo, string>({
      query: (id: string) => ({
        url: "/todo/" + id,
        method: "DELETE"
      }),
      invalidatesTags: ['Todos']
    })
  })
})


export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi