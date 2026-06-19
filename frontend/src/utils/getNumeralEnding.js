export default function (number) {
  const last_sign = Number(number.toString().slice(-1));

  if (last_sign === 0 || (last_sign >= 5 && last_sign <= 9)) {
    return "ов";
  } else if (last_sign === 1) {
    return "";
  } else if (last_sign >= 2 && last_sign <= 4) {
    return "а";
  }
}
