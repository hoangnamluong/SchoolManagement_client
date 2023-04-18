export default function (firstname, lastname) {
  if (!firstname || !lastname) return;

  let nameProcessed = [];

  const nameSplit = firstname.split(" ");

  nameSplit.forEach((i) => {
    nameProcessed.push(i.substring(0, 1).concat(". "));
  });

  return nameProcessed.join("").concat(lastname);
}
