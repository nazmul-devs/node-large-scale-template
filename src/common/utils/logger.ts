export function logInfo(message: string, meta?: any) {
  console.log(message, meta || "");
}

export function logError(message: string, meta?: any) {
  console.error(message, meta || "");
}
