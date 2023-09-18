function minutesToHours(minutes) {

  function calcMinutes() {
    const remainder = minutes % 60;
    if (remainder>0) { return `${remainder}м` }
    return '';
  }

  function calcHours() {
    const hours = Math.floor(minutes / 60);
    if (hours>0) { return `${hours}ч` }
    return '';
  }

  return calcHours()+calcMinutes()
}

export default minutesToHours;
