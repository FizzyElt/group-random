export const shuffle = <T>(arr: Array<T>): Array<T> =>
  [...arr].sort(() => Math.random() - 0.5);

export const assignMemberToGroup = (
  members: string[],
  groups: string[],
): Array<{ name: string; members: string[] }> => {
  const groupList: Array<{ name: string; members: string[] }> = groups.map(
    (name) => ({ name, members: [] }),
  );

  for (let i = 0; i < members.length; i++) {
    const member = members[i];

    groupList[i % groups.length].members.push(member);
  }

  return groupList;
};
