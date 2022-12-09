import { USER_PROFILE } from "../actions/types";

const profileReducer = function(state = [], action) {
  switch(action.type) {
    case USER_PROFILE: 
      return action.payload
    default: 
      return state;  
  }
}

export default profileReducer;