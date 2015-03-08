export default function keyMirror(obj, namespace) {
  namespace = namespace || [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === null) {
      obj[key] = namespace.concat([key]).join(":");
    } else if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
      obj[key] = keyMirror(obj[key], namespace.concat([key]));
    }
  }

  return obj;
}
