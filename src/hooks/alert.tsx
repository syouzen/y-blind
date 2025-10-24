import { useContext } from "react";

import { AlertContext } from "@/contexts/alert";

/**
 * @description alert 사용
 * @returns {object} alert 사용
 */
export default function useAlert() {
  const { show, hide } = useContext(AlertContext);
  return { show, hide };
}
