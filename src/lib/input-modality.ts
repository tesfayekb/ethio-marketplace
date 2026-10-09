let removeInstalled: (() => void) | undefined;

/** Capture the last input without changing the initial focus appearance. */
export function installInputModality(): () => void {
  if (removeInstalled) return removeInstalled;
  const pointer = () => {
    document.documentElement.dataset.input = "pointer";
  };
  const keyboard = () => {
    document.documentElement.dataset.input = "keyboard";
  };
  document.addEventListener("pointerdown", pointer, true);
  document.addEventListener("keydown", keyboard, true);
  const remove = () => {
    document.removeEventListener("pointerdown", pointer, true);
    document.removeEventListener("keydown", keyboard, true);
    if (removeInstalled === remove) removeInstalled = undefined;
  };
  removeInstalled = remove;
  return remove;
}
