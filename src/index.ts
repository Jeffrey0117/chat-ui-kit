// chat-ui-kit — 純展示聊天 UI React 元件組。
// Copy-paste (shadcn style): drop `src/` into your project and import from here.

export { ChatWindow } from "./ChatWindow";
export { MessageBubble } from "./MessageBubble";
export { MessageInput } from "./MessageInput";
export { PendingNotice } from "./PendingNotice";
export { ConversationList } from "./ConversationList";

// Inlined UI primitives (delete + swap for your own shadcn/ui if you have it).
export {
  cn,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Alert,
  AlertDescription,
  Badge,
  Button,
  Textarea,
} from "./primitives";

export type {
  ChatMessage,
  ConversationItem,
  MessageBubbleProps,
  MessageInputProps,
  PendingNoticeProps,
  ChatWindowProps,
  ConversationListProps,
} from "./types";
