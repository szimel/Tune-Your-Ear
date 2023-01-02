import { VALID_EMAIL } from "../actions/types";

const emailReducer = function(state = [], action) {
  switch(action.type) {
    case VALID_EMAIL: 
      return action.payload
    default: 
      return state;  
  }
}


export default emailReducer;