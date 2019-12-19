import { spotifyAuthorize } from 'services/spotify';

const spotifyAuthorizeHandler = async (
  _parent: any,
  args: {
    authorizationCode: string;
    redirectUri: string;
  },
) => {
  const { authorizationCode, redirectUri } = args;

  await spotifyAuthorize(authorizationCode, redirectUri);

  return true;
};

export default {
  spotifyAuthorize: spotifyAuthorizeHandler,
};
