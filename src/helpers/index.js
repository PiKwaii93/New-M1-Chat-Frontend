export function formatDate(dateToFormat) {
  const date = new Date(dateToFormat);

  const dateNow = new Date();

  const year = date.getFullYear();
  const mounth = date.getMonth() + 1;
  const day = date.getDay().toString().padStart(2, "0");

  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (year === dateNow.getFullYear()) {
    return `${mounth}/${day} ${hour}:${minutes}`;
  } else {
    return `${year}/${mounth}/${day} ${hour}:${minutes}`;
  }
}
