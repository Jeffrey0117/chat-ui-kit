"use client";

import { Avatar, AvatarFallback, AvatarImage, cn } from "./primitives";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import type { MessageBubbleProps } from "./types";

export function MessageBubble({
  content,
  createdAt,
  isOwn,
  senderName,
  senderAvatar,
  messageType = "text",
}: MessageBubbleProps) {
  // 系統訊息
  if (messageType === "system") {
    return (
      <div className="flex justify-center my-4">
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {content}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-2 mb-4",
        isOwn ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* 頭像（非自己的訊息才顯示） */}
      {!isOwn && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={senderAvatar} alt={senderName || "用戶"} />
          <AvatarFallback className="text-xs">
            {senderName?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
      )}

      {/* 訊息內容 */}
      <div
        className={cn(
          "max-w-[70%] space-y-1",
          isOwn ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "px-4 py-2 rounded-2xl whitespace-pre-wrap break-words",
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted rounded-bl-md"
          )}
        >
          {content}
        </div>
        <span
          className={cn(
            "text-xs text-muted-foreground block",
            isOwn ? "text-right" : "text-left"
          )}
        >
          {format(new Date(createdAt), "HH:mm", { locale: zhTW })}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;
