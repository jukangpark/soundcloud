export const fetchMusics = () => {
  return fetch("/api/view").then((response) => response.json());
};

export const fetchLoggedinUser = () => {
  return fetch("/api/user/info").then((response) => response.json());
};
