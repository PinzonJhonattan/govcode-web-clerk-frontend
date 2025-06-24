/**
 * Get main role of user
 * @param {string[]} roles - roles of user
 * @returns {string[]} - main roles of user
 */
export const getUserRole = (roles :  any = []) => {
  return roles.filter(
    (role) => role != "default-roles-bpmidentity" && role != "user"
  );
};
