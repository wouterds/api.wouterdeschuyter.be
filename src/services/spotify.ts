import axios from 'axios';
import { addSeconds } from 'date-fns';
import AccessToken from 'models/access-token';

export const spotifyAuthorize = async (
  authorizationCode: string,
  redirectUri: string,
) => {
  const { data: response } = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'authorization_code', // eslint-disable-line
      code: authorizationCode,
      redirect_uri: redirectUri, // eslint-disable-line
    },
  });

  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt: addSeconds(new Date(), response.expires_in),
  };
};

export const spotifyCacheAccessToken = async (
  accessToken: string,
  refreshToken: string,
  expiresAt: Date,
) => {
  const token = await AccessToken.findOne({
    where: {
      type: 'spotify',
      refreshToken,
    },
  });

  if (token) {
    token.accessToken = accessToken;
    token.expiresAt = expiresAt;
    await token.save();
    return;
  }

  await AccessToken.create({
    type: 'spotify',
    accessToken,
    refreshToken,
    expiresAt,
  });
};

export const spotifyRefreshAccessToken = async (refreshToken: string) => {
  const { data: response } = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'refresh_token', // eslint-disable-line
      refresh_token: refreshToken, // eslint-disable-line
    },
  });

  return {
    accessToken: response.access_token,
    expiresAt: addSeconds(new Date(), response.expires_in),
  };
};

export const spotifyGetAccessToken = async (): Promise<string | null> => {
  const token = await AccessToken.findOne({
    type: 'spotify',
    order: [['createdAt', 'desc']],
  });

  if (!token) {
    return null;
  }

  if (token.expiresAt < new Date()) {
    const { accessToken, expiresAt } = await spotifyRefreshAccessToken(
      token.refreshToken,
    );

    await spotifyCacheAccessToken(accessToken, token.refreshToken, expiresAt);

    return accessToken;
  }

  return token.accessToken;
};
