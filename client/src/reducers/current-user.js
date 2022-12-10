import { CURRENT_USER } from "../actions/types";

const currentUserReducer = function(state = [], action) {
  switch(action.type) {
    case CURRENT_USER: 
      return action.payload
    default: 
      return state;  
  }
}

export default currentUserReducer;