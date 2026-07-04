"use client";

import { Alert, AlertDescription } from "./primitives";
import { Clock } from "lucide-react";
import type { PendingNoticeProps } from "./types";

export function PendingNotice({ remainingMessages }: PendingNoticeProps) {
  if (remainingMessages < 0) {
    // -1 表示 active 狀態，無限制
    return null;
  }

  if (remainingMessages === 0) {
    return (
      <Alert variant="destructive" className="mx-4 mb-2">
        <Clock className="h-4 w-4" />
        <AlertDescription>
          已達訊息上限，請等待導師回覆後再發送更多訊息
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mx-4 mb-2 border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
      <Clock className="h-4 w-4" />
      <AlertDescription>
        等待導師回覆中，您還可以發送 {remainingMessages} 則訊息
      </AlertDescription>
    </Alert>
  );
}

export default PendingNotice;
