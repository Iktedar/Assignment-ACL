import { types } from "../constants";

const actionCreator = action => {
    const values = ['SUCCESS', 'FAILURE', 'REQUEST'];
    const types = values.reduce((acc, value) => {
      const type = `${action}_${value}`;
      acc[value] = type;
      acc[value.toLowerCase()] = data => ({
        type,
        data,
      });
      return acc;
    }, {});
    return types;
};

export const GetMovies = actionCreator(types.FETCH_MOVIES)
