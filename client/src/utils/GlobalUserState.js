import React,{createContext, useReducer, useContext} from "react";

const UserContext = createContext({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    portrait: ""
});

const {Provider} = UserContext;

function reducer(state, action) {
    switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: action.id,
          firstName: action.firstName,
          lastName: action.lastName,
          email: action.email,
          portrait: action.portrait
        }
      ];
   
   
    default:
      return state;
    }
  }
  
  function UserProvider({ value = [], ...props }) {
    const [state, dispatch] = useReducer(reducer, {});
  
    return <Provider value={[state, dispatch]} {...props} />;
  }
  
  function useUserContext() {
    return useContext(UserContext);
  }
  
  export { UserProvider, useUserContext };
 



