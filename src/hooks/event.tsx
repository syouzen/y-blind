"use client";

import { useContext } from "react";

import { EventContext } from "@/contexts/event";

/**
 * @description event (alert, confirm, loading) 사용
 * @returns {object} showAlert, hideAlert, showConfirm, hideConfirm, showLoading, hideLoading
 */
export default function useEvent() {
  const {
    showAlert,
    hideAlert,
    showConfirm,
    hideConfirm,
    showLoading,
    hideLoading,
  } = useContext(EventContext);
  return {
    showAlert,
    hideAlert,
    showConfirm,
    hideConfirm,
    showLoading,
    hideLoading,
  };
}
