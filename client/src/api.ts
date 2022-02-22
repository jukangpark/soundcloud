export const fetchMusics = () => {
  return fetch("/api/musics").then((response) => response.json());
};

export const fetchLoggedinUser = () => {
  return fetch("/api/user/info").then((response) => response.json());
};

export const fetchMusic = (id: string) => {
  return fetch(`/api/musics/${id}`).then((response) => response.json());
};

export const fetchComments = (id: string) => {
  return fetch(`/api/musics/${id}/comment`).then((response) => response.json());
};

export const fetchUser = (id: string) => {
  return fetch(`/api/profile/${id}`).then((response) => response.json());
};
