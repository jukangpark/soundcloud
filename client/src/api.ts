export const fetchMusics = () => {
  return fetch("/api/view").then((response) => response.json());
};
