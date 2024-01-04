export function capitaliseFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeDashes(str: string) {
  return str.replaceAll("-", " ");
}

export function formatHyphen(
  str: string,
  placement: "before" | "after"
): string {
  if (placement === "before") {
    return str.split("-")[1];
  }
  return str.split("-")[0];
}
