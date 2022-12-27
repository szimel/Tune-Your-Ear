import { USER_PROFILE_CHORD } from "../actions/types";

const profileChordReducer = function(state = [], action) {
  switch(action.type) {
    case USER_PROFILE_CHORD: 
      return action.payload
    default: 
      return state;  
  }
}

export default profileChordReducer;