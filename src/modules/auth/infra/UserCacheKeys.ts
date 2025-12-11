export const UserCacheKeys = {
  byId: (id: string) => `user:id:${id}`,
  byEmail: (email: string) => `user:email:${email}`,
};
