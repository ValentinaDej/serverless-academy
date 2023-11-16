export type TokensType = {
  accessToken: string;
  refreshToken: string;
};

export type LinkType = {
  id?: string;
  email?: string;
  original?: string;
  short?: string;
  expiration_time?: string;
  stats?: number;
};
