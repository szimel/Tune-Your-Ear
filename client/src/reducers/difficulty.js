import { DIFFICULTY } from "../actions/types";


const quizReducer = function(state = [], action) {
  switch(action.type) {
    case DIFFICULTY: 
      return action.payload
    default: 
      return state;  
  };
};

export default quizReducer;