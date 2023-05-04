export default function (users, loggedUser) {
  if (!users) return;

  if (users.length <= 1) return;

  if (!loggedUser) return;

  const filteredLoggedUser = users.filter(
    (user) => user.id !== loggedUser.id
  )[0];

  return filteredLoggedUser;
}
