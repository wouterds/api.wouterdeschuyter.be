import User from 'models/user';

const me = async (
  _parent: any,
  _args: any,
  context: { user?: { id: string } },
) => {
  const { user } = context;

  if (!user) {
    throw new Error('not authenticated');
  }

  return User.findOne({ where: { id: user.id } });
};

const users = async (
  _parent: any,
  _args: any,
  context: { user?: { id: string } },
) => {
  const { user } = context;

  if (!user) {
    throw new Error('not authenticated');
  }

  return User.findAll({ order: [['createdAt', 'desc']] });
};

export default {
  me,
  users,
};
