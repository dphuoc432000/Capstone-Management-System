function isEmptyKeys(obj) {
  for (var value in obj) if(obj[value]) return true;
  return false;
}

export default { isEmptyKeys };
