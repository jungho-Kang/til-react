# useReducer & Context API

- useReducer는 state 업데이트 시 복잡한 과정을 처리하기 위해서 활용
- useReducer를 이용해서 Context에 보관한 state를 관리해보자
- Context API는 App 서비스 전체에 공용으로 사용하는 state이다
- RTK를 이애하기 위한 기초이다

## counter 테스트 폴더 생성

- `/src/contexts` 폴더

  - `counterContext.js` 파일 생성

  ```js
  import { createContext } from "react";

  // Context 생성
  export const CounterStateContext = createContext(null);
  // Dispatch용 Context 생성
  export const CounterDispatchContext = createContext(null);
  ```

  - `counterProvider.jsx` 파일 생성(Vite 용)

  ```jsx
  import { useReducer } from "react";
  import {
    CounterDispatchContext,
    CounterStateContext,
  } from "./counterContext";

  // 1. 기본값
  const initialState = { count: 0 };
  // 2. 리듀서 함수
  function reducer(state, action) {
    switch (action.type) {
      case "add":
        return { count: state.count + 1 };
      case "minus":
        return { count: state.count - 1 };
      case "reset":
        return { count: 0 };
      default:
        return state;
    }
  }

  // Context Provider 생성
  export function CounterProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <CounterStateContext.Provider value={state}>
        <CounterDispatchContext.Provider value={dispatch}>
          {children}
        </CounterDispatchContext.Provider>
      </CounterStateContext.Provider>
    );
  }
  ```

- `/src/App.jsx`

```jsx
import Counter from "./components/counter/Counter";
import { CounterProvider } from "./contexts/counterProvider";

// 아래 Provide 에 의해서 state, disaptch 접근가능
function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}
export default App;
```

- `/src/components` 폴더

  - Counter.jsx

  ```jsx
  import { useContext } from "react";
  import {
    CounterDispatchContext,
    CounterStateContext,
  } from "../../contexts/counterContext";

  function Counter() {
    // 앱 전체에 context state 용도
    const state = useContext(CounterStateContext);
    // 앱 전체에 context dispatch 용도
    const dispatch = useContext(CounterDispatchContext);
    return (
      <div>
        <h1>Counter : {state.count}</h1>
        <button onClick={() => dispatch({ type: "add" })}>증가</button>
        <button onClick={() => dispatch({ type: "minus" })}>감소</button>
        <button onClick={() => dispatch({ type: "reset" })}>초기화</button>
      </div>
    );
  }
  export default Counter;
  ```

## todo 테스트 폴더 생성

- `/src/contexts/` 폴더 컨텍스트 생성

  - `todoContext.js` (데이터용)

  ```js
  import { createContext } from "react";

  // 데이터용 state context
  export const TodoStateContext = createContext(null);
  // 데이터 업데이트용 dispatch context
  export const TodoDispatchContext = createContext(null);
  ```

  - `todoProvider.jsx` (context에 데이터와 dispatch 등록)

  ```jsx
  import { useReducer } from "react";
  import { TodoDispatchContext, TodoStateContext } from "./todoContext";

  // 1. 상태 생성
  const initialTodoState = [];
  // 2. 리듀서 함수
  function todoReducer(state, action) {
    switch (action.type) {
      case "add":
        return [
          ...state,
          { id: Date.now(), text: action.payload, completed: false },
        ];
      case "toggle":
        return state.map(item =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item,
        );
      case "delete":
        return state.filter(item => item.id !== action.payload);
      default:
        return state;
    }
  }

  // 3. context provider 세팅
  export function TodoProvider({ children }) {
    const [todos, dispatch] = useReducer(todoReducer, initialTodoState);
    return (
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={dispatch}>
          {children}
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    );
  }
  ```

### context 활용 컴포넌트들

- `/src/components/todo` 폴더 생성

  - TodoAdd.jsx 파일 생성

  ```jsx
  import { useContext, useState } from "react";
  import { TodoDispatchContext } from "../../contexts/todoContext";

  // dispatch를 이용해서 state를 업데이트함
  const TodoAdd = () => {
    const dispatch = useContext(TodoDispatchContext);
    const [text, setText] = useState("");
    return (
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch({ type: "add", payload: text });
            setText("");
          }}
        >
          추가
        </button>
      </div>
    );
  };
  export default TodoAdd;
  ```

  - TodoList.jsx 파일 생성

  ```jsx
  import { useContext } from "react";
  import { TodoStateContext } from "../../contexts/todoContext";
  import TodoItem from "./TodoItem";

  const TodoList = () => {
    const todos = useContext(TodoStateContext);
    return (
      <div>
        <h1>Todo List</h1>
        {todos.map(item => (
          <TodoItem key={item.id} todo={item} />
        ))}
      </div>
    );
  };
  export default TodoList;
  ```

  - TodoItem.jsx 파일 생성

  ```jsx
  import { useContext } from "react";
  import { TodoDispatchContext } from "../../contexts/todoContext";

  const TodoItem = ({ todo }) => {
    const dispatch = useContext(TodoDispatchContext);
    return (
      <div>
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          onClick={() => dispatch({ type: "toggle", payload: todo.id })}
        >
          {todo.text}
        </span>
        <button onClick={() => dispatch({ type: "delete", payload: todo.id })}>
          삭제
        </button>
      </div>
    );
  };
  export default TodoItem;
  ```

# 고민 해보세요

1. Context API를 사용할 지 말지 고민

- 사용자 로그인 정보
- 디자인 스킨 정보
- 장바구니 정보

2. Context API 사용을 결정했다면

- useReducer 도입하는 것을 고민해보자
