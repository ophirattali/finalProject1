export const saveOnLocalStoarge = userData => {
  localStorage.setItem('token', userData.token);
};

export const deleteFromLocalStoarge = () => {
  localStorage.removeItem('token');
};

export const getFromLocalStoarge = () => {
  return localStorage.getItem('token');
};
