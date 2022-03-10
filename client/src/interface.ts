export interface IOwner {
  comments: object;
  email: string;
  username: string;
  profileImageUrl: string;
  _id: string;
}

export interface IComment {
  _id: string;
  text: string;
  createdAt: string;
  owner: IOwner;
  music: string;
}

export interface IMusic {
  title: string;
  content: string;
  createdAt: number;
  meta: {
    views: number;
  };
  _id: string;
  thumbUrl: string;
  fileUrl: string;
  owner: { username: string; _id: string; profileImageUrl: string };
  comments: Array<IComment>;
}

export interface IData {
  username: string;
  musics: Array<IMusic>;
  profileImageUrl: string;
  _id: string;
}

export interface IParams {
  id: string;
}

export interface IUser {
  email: string;
  id: string;
  password: string;
  password2: string;
  username: string;
  location: string;
}
