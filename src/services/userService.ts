import { User, UserCreationAttibutes } from "./../models/User";

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },

  create: async (attributes: UserCreationAttibutes) => {
    const user = await User.create(attributes)
    return user
  },
};
