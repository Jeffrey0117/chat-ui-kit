// chat-ui-kit — shared prop types for the chat component set.
// All components are presentational: driven purely by these data objects + callbacks.
// No data fetching, no server/tenant coupling.

/** A single chat message. */
export interface ChatMessage {
  id: string;
  content: string;
  /** ISO date string (parsed with `new Date(...)`). */
  created_at: string;
  /** Author id; compared against `currentUserId` to decide bubble side. */
  sender_id: string;
  /** "text" = normal bubble; "system" = centered pill. */
  message_type: "text" | "system";
  sender?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

/** One row in the conversation list. */
export interface ConversationItem {
  id: string;
  status: "pending" | "active" | "blocked";
  pending_message_count: number;
  last_message_at: string | null;
  last_message_preview: string | null;
  student_unread_count: number;
  instructor_unread_count: number;
  student_profile?: {
    email?: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  instructor_profile?: {
    email?: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface MessageBubbleProps {
  content: string;
  createdAt: string;
  isOwn: boolean;
  senderName?: string;
  senderAvatar?: string;
  messageType?: "text" | "system";
}

export interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface PendingNoticeProps {
  /** Remaining messages before the user must wait. `-1` = unlimited (renders nothing). */
  remainingMessages: number;
}

export interface ChatWindowProps {
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  isPending?: boolean;
  /** `-1` = unlimited. */
  remainingMessages?: number;
  isLoading?: boolean;
  isSending?: boolean;
  isBlocked?: boolean;
}

export interface ConversationListProps {
  conversations: ConversationItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  role: "student" | "instructor";
}
