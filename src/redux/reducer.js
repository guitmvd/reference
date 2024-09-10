// const initialState = {
//   userss: JSON.parse(localStorage.getItem("userss")) || [],
//   people: []
// };

// export const Reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_USERSS":
//       return {
//         ...state,
//         userss: [...state.userss, action.payload],
//       };
//     case "UPDATE_USERSS":
//       return {
//         ...state,
//         userss: action.payload,
//       };
//     case "DELETE":
//       let del = state.userss.filter((el) => el.id !== action.payload);
//       localStorage.setItem("userss", JSON.stringify(del));
//       return {
//         ...state,
//         userss: del,
//       };
//     case "GET":
//       return { ...state, people: action.payload };
//     default:
//       return state;
//   }
// };

const initialState = {
  userss: JSON.parse(localStorage.getItem("userss")) || [],
  people: JSON.parse(localStorage.getItem("people")) || [], // Загружаем из localStorage
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERSS":
      const updatedUsers = [...state.userss, action.payload];
      localStorage.setItem("userss", JSON.stringify(updatedUsers));
      return {
        ...state,
        userss: updatedUsers,
      };
    case "UPDATE_USERSS":
      localStorage.setItem("userss", JSON.stringify(action.payload));
      return {
        ...state,
        userss: action.payload,
      };
    case "DELETE":
      let del = state.userss.filter((el) => el.id !== action.payload);
      localStorage.setItem("userss", JSON.stringify(del));
      return {
        ...state,
        userss: del,
      };
    case "GET":
      localStorage.setItem("people", JSON.stringify(action.payload)); // Сохраняем в localStorage
      return { ...state, people: action.payload };
    default:
      return state;
  }
};
