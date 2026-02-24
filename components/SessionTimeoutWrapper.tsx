"use client";

import { useSessionTimeout } from "@/hooks/useTimeout";

export default function SessionTimeoutWrapper() {
  useSessionTimeout();
  return null;
}
