export const fetchMusics = () => {
  return fetch("/api/musics").then((response) => response.json());
};

export const fetchLoggedinUser = () => {
  return fetch("/api/user/info").then((response) => response.json());
};
