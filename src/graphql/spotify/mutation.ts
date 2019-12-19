import { spotifyAuthorize, spotifyCacheAccessToken } from 'services/spotify';

const spotifyAuthorizeHandler = async (
  _parent: any,
  args: {
    authorizationCode: string;
    redirectUri: string;
  },
  context: { user?: { id: string } },
) => {
  const { user } = context;

  if (!user) {
    throw new Error('not authenticated');
  }

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
