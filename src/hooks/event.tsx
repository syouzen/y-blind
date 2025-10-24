"use client";

import { useContext } from "react";

import { EventContext } from "@/contexts/event";

/**
 * @description event (alert, confirm) 사용
 * @returns {object} showAlert, hideAlert, showConfirm, hideConfirm
 */
export default function useEvent() {
  const { showAlert, hideAlert, showConfirm, hideConfirm } =
    useContext(EventContext);
  return { showAlert, hideAlert, showConfirm, hideConfirm };
}
