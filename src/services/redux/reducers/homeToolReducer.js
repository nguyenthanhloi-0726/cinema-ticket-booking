import * as ActionType from "./../constants/contants";

let initialState = {
  cinemas: [],
  // dates: [],
  // showtimes: [],
  showtimeInfo: {}
};

const homeToolReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_SHOWTIME_INFO:
      state.showtimeInfo = action.data;
      let nameCinemas = [];
      action.data.heThongRapChieu.forEach(item => {
        item.cumRapChieu.forEach(item => {
          nameCinemas.push(item.tenCumRap);
        });
      });
      state.cinemas = nameCinemas;
      return { ...state };
    default:
      return { ...state };
  }
};

export default homeToolReducer;
