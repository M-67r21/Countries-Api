
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INPUT_FIELD':
        return{...state, inputField:action.payload, search:action.payload}
      
    case 'SET_SEARCH':
        return{...state, filterWord:action.payload, search:undefined, inputField:''}
      
    case 'SET_DATA':
        return{...state, data:action.payload}
      

    default:
        return(state)
      
  }
  
};

export default reducer;
