import { useContext } from "react";

import { GlobalContext } from "../GlobalState";

export function useGlobalFunctions() {
  const { globalFunctions } = useContext(GlobalContext);
  return globalFunctions;
}

export function useGlobalState() {
  const { globalState } = useContext(GlobalContext)
  return globalState;
}
