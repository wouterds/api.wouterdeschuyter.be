import User from 'models/user';

const me = async (
  _parent: any,
  _args: any,
  context: { user?: { id: string } }
) => {
  const { user } = context;

  if (!user) {
    throw new Error('unauthorized');
  }

  return User.findOne({ where: { id: user.id } });
};

export default {
  me,
};
