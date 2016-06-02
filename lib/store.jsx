let state = null

export const getState = () => state

export const setState = (newState) => state = { ...state, ...newState }
