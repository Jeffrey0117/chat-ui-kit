"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { PendingNotice } from "./PendingNotice";
import { Alert, AlertDescription } from "./primitives";
import { Loader2, Ban } from "lucide-react";
import type { ChatWindowProps } from "./types";

export function ChatWindow({
  messages,
  currentUserId,
  onSendMessage,
  isPending = false,
  remainingMessages = -1,
  isLoading = false,
  isSending = false,
  isBlocked = false,
}: ChatWindowProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // 滾動到最新訊息
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const canSend = !isBlocked && (!isPending || remainingMessages > 0 || remainingMessages === -1);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* 訊息列表 */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 min-h-0">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            開始對話吧！
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              createdAt={msg.created_at}
              isOwn={msg.sender_id === currentUserId}
              senderName={msg.sender?.full_name || undefined}
              senderAvatar={msg.sender?.avatar_url || undefined}
              messageType={msg.message_type}
            />
          ))
        )}
      </div>

      {/* 封鎖提示 */}
      {isBlocked && (
        <div className="p-4 border-t flex-shrink-0">
          <Alert variant="destructive">
            <Ban className="h-4 w-4" />
            <AlertDescription>
              此對話已被封鎖，無法發送訊息
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Pending 提示 */}
      {!isBlocked && isPending && (
        <div className="flex-shrink-0">
          <PendingNotice remainingMessages={remainingMessages} />
        </div>
      )}

      {/* 輸入框 */}
      {!isBlocked && (
        <MessageInput
          onSend={onSendMessage}
          disabled={!canSend || isSending}
          placeholder={
            isSending
              ? "發送中..."
              : canSend
              ? "輸入訊息... (Enter 發送)"
              : "請等待導師回覆"
          }
        />
      )}
    </div>
  );
}

export default ChatWindow;
