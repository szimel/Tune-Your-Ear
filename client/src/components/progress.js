import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../actions";
import Header from "./headers/header-reg";


const Progress = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(currentUser());
  }, []);

  const progress = useSelector(state => state.user);
  console.log(progress);
  return (
    <div>
      <Header />
      <div className="mx-auto" style={{width: '500px'}}>
        advertising doesn't work? JUST DID LMAO fat fat fat fat fat fat fat fat fat fat fat 
        
      </div>
    </div>
  );
};

export default Progress;