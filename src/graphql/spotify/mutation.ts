import { spotifyAuthorize, spotifyCacheAccessToken } from 'services/spotify';

const spotifyAuthorizeHandler = async (
  _parent: any,
  args: {
    authorizationCode: string;
    redirectUri: string;
  },
) => {
  const { authorizationCode, redirectUri } = args;

  const { accessToken, refreshToken, expiresAt } = await spotifyAuthorize(
    authorizationCode,
    redirectUri,
  );

  await spotifyCacheAccessToken(accessToken, refreshToken, expiresAt);

  return true;
};

export default {
  spotifyAuthorize: spotifyAuthorizeHandler,
};
