# chat-ui-kit

**純展示聊天 UI 元件組** — 訊息泡泡、輸入框、對話列表、pending / 封鎖提示，全部只吃 props。

一組 **TypeScript + React** 元件，走 **shadcn 式** 分發：不發 npm 套件、不做 build，**直接把 `src/` 複製進你的專案**，之後想改就改，程式碼是你的。

從 [CourseBloom](https://github.com/Jeffrey0117) 的師生訊息系統抽出去耦而成 —— 拿掉了所有 Supabase / Next server / 多租戶耦合，元件**不做任何資料抓取**，資料與行為全部由 props（陣列 + callback）驅動。

## 元件

| 元件 | 用途 |
|------|------|
| `ChatWindow` | 完整聊天視窗：訊息列表 + 自動捲到底 + pending/封鎖提示 + 輸入框 |
| `MessageBubble` | 單則訊息泡泡（自己/對方分左右、頭像、時間；system 置中膠囊） |
| `MessageInput` | 輸入框（Enter 送出、Shift+Enter 換行、送出後重新聚焦） |
| `PendingNotice` | 「等待回覆 / 已達上限」提示（`remainingMessages` 控制） |
| `ConversationList` | 對話列表（頭像、未讀角標、最後訊息預覽、狀態標籤、student/instructor 雙視角） |

## Peer deps

- **react** `>=18`
- **date-fns** `>=2` — 時間格式化（`format` / `formatDistanceToNow`，含 `zhTW` locale）
- **lucide-react** `>=0.300.0` — icon（`Send` / `Clock` / `Loader2` / `Ban` / `MessageCircle`）
- **Tailwind CSS** — 這些元件用 Tailwind utility class 排版（`bg-primary`、`rounded-2xl`、`text-muted-foreground`…）。你的專案需要有 Tailwind，且建議套用 shadcn/ui 的設計 token（`primary` / `muted` / `destructive` / `foreground` / `background` / `input` / `ring` 等 CSS 變數），顏色才會正確。

> **shadcn/ui：不需要另外安裝。** 原始碼用到的 shadcn primitive（`Avatar` / `Alert` / `Badge` / `Button` / `Textarea`）與 `cn` 已經在 `src/primitives.tsx` 內建了一份極簡版，複製即用。
>
> 若你的專案**已經有** shadcn/ui，可以刪掉 `src/primitives.tsx`，把各元件 `import { ... } from "./primitives"` 改回你自己的 `@/components/ui/*` 與 `@/lib/utils` 的 `cn` —— prop API 完全對得上。

## shadcn 式用法（複製貼上）

1. 把 `src/` 底下的 `.tsx`、`types.ts`、`primitives.tsx` 複製進你的專案（例如 `components/chat/`）。
2. 確認上面的 peer deps 有裝、Tailwind + shadcn token 有設定好。
3. 直接 import 使用：

```tsx
import { ChatWindow, type ChatMessage } from "@/components/chat";

const messages: ChatMessage[] = [
  {
    id: "1",
    content: "老師好，我想請教一個問題",
    created_at: "2026-07-04T09:00:00Z",
    sender_id: "student-123",
    message_type: "text",
    sender: { full_name: "小明", avatar_url: null },
  },
  {
    id: "2",
    content: "沒問題，你說說看！",
    created_at: "2026-07-04T09:01:00Z",
    sender_id: "instructor-456",
    message_type: "text",
    sender: { full_name: "王老師", avatar_url: "https://.../avatar.png" },
  },
];

export function ChatPage() {
  return (
    <div className="flex h-[600px] flex-col rounded-lg border">
      <ChatWindow
        messages={messages}
        currentUserId="student-123"
        onSendMessage={(content) => console.log("送出：", content)}
        isPending
        remainingMessages={2}
        isSending={false}
        isBlocked={false}
      />
    </div>
  );
}
```

### `ChatWindow` props

| prop | 型別 | 預設 | 說明 |
|------|------|------|------|
| `messages` | `ChatMessage[]` | — | 訊息陣列（依序渲染，`created_at` 決定顯示時間） |
| `currentUserId` | `string` | — | 目前使用者 id；`sender_id === currentUserId` 的訊息靠右 |
| `onSendMessage` | `(content: string) => void` | — | 送出訊息 callback（已 trim） |
| `isPending` | `boolean` | `false` | 是否為待回覆狀態（顯示 `PendingNotice`） |
| `remainingMessages` | `number` | `-1` | 剩餘可送訊息數；`-1` = 無限制 |
| `isLoading` | `boolean` | `false` | 載入中（顯示 spinner） |
| `isSending` | `boolean` | `false` | 送出中（鎖住輸入框） |
| `isBlocked` | `boolean` | `false` | 對話已封鎖（隱藏輸入框、顯示封鎖提示） |

其餘元件的 props 型別都在 `src/types.ts`，可直接 import（`ChatMessage`、`ConversationItem`、`ConversationListProps`…）。

## 授權

MIT © Jeffrey0117
