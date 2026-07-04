"use client";

import { Avatar, AvatarFallback, AvatarImage, Badge, cn } from "./primitives";
import { formatDistanceToNow } from "date-fns";
import { zhTW } from "date-fns/locale";
import { Clock, MessageCircle } from "lucide-react";
import type { ConversationListProps } from "./types";

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  role,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">尚無訊息</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {conversations.map((conv) => {
        const otherProfile = role === "student"
          ? conv.instructor_profile
          : conv.student_profile;
        const unreadCount = role === "student"
          ? conv.student_unread_count
          : conv.instructor_unread_count;
        // 優先顯示名字，其次 email，最後才用預設值
        const name = otherProfile?.full_name || otherProfile?.email || (role === "student" ? "導師" : "學員");
        const avatar = otherProfile?.avatar_url;

        return (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
              selectedId === conv.id && "bg-muted"
            )}
          >
            {/* 頭像 */}
            <div className="relative">
              <Avatar>
                <AvatarImage src={avatar || undefined} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>

            {/* 內容 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={cn(
                  "font-medium truncate",
                  unreadCount > 0 && "font-bold"
                )}>
                  {name}
                </span>
                {conv.last_message_at && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatDistanceToNow(new Date(conv.last_message_at), {
                      addSuffix: true,
                      locale: zhTW,
                    })}
                  </span>
                )}
              </div>

              {/* 最後訊息預覽 */}
              <p className={cn(
                "text-sm truncate mt-1",
                unreadCount > 0 ? "text-foreground" : "text-muted-foreground"
              )}>
                {conv.last_message_preview || "開始對話..."}
              </p>

              {/* 狀態標籤 */}
              {conv.status === "pending" && role === "student" && (
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-3 w-3 text-amber-500" />
                  <span className="text-xs text-amber-600">
                    等待回覆中 ({conv.pending_message_count}/3)
                  </span>
                </div>
              )}

              {conv.status === "pending" && role === "instructor" && (
                <Badge variant="outline" className="mt-2 text-xs">
                  待回覆
                </Badge>
              )}

              {conv.status === "blocked" && (
                <Badge variant="destructive" className="mt-2 text-xs">
                  已封鎖
                </Badge>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ConversationList;
