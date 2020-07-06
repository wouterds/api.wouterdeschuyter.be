import AuthenticationRequest from 'models/authentication-request';
import { GraphqlContext } from 'server';

const authenticationRequests = async (
  _parent: any,
  _args: any,
  context: GraphqlContext,
) => {
  const { user } = context;

  if (!user) {
    throw new Error('not authenticated');
  }

  return AuthenticationRequest.findAll({
    include: [{ all: true, nested: true }],
    order: [['createdAt', 'desc']],
  });
};

export default {
  authenticationRequests,
};
