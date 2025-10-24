import { useContext } from "react";

import { ConfirmContext } from "@/contexts/confirm";

/**
 * @description confirm 사용
 * @returns {object} confirm 사용
 */
export default function useConfirm() {
  const { show, hide } = useContext(ConfirmContext);
  return { show, hide };
}
