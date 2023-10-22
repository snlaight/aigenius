import { currentUser } from '@clerk/nextjs';

// TODO: Implement logic to check if user is admin
// import PrismaInstance from '@/utils/helpers/clients/prisma.client';

const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return user;
};

export default getCurrentUser;
