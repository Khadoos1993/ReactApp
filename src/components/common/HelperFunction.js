export function compare(a, b) {
  const titleA = a.title;
  const titleB = b.title;
  let comparison = 0;
  if (titleA > titleB) comparison = 1;
  else if (titleA < titleB) comparison = -1;
  return comparison;
}
