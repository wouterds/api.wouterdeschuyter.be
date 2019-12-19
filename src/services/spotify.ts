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
  await AccessToken.create({
    type: 'spotify',
    accessToken,
    refreshToken,
    expiresAt,
  });
};
