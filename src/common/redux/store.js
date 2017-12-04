import { applyMiddleware, createStore } from 'redux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
};

const state = reducer(1, 
  {
  type: 'ADD',
  payload: 2
  }
);

const store = createStore(
  reducer,
  applyMiddleware()
)

export default store;