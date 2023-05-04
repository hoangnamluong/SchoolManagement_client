export default function (arg) {
  if (!arg) return;

  if (arg.length === 0) return;

  const form = new FormData();

  for (const key in arg) {
    if (arg[key]) {
      form.append(key, arg[key]);
    }
  }

  return form;
}
