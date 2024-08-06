import create from "zustand";

// 스토어 상태 타입 정의
interface StoreState {
  thread_id: string;
  result_string: string;
  bot_chat_list: string[];
  user_chat_list: string[];
  setThreadId: (id: string) => void;
  setResultString: (id: string) => void;
  addToBotChatList: (message: string) => void;
  addToUserChatList: (message: string) => void;
  // clearChatList: () => void;
}

// 스토어 정의
const useStore = create<StoreState>((set) => ({
  thread_id: "",
  result_string: "",
  bot_chat_list: [],
  user_chat_list: [],
  setThreadId: (id: string) => set({ thread_id: id }),
  setResultString: (id: string) => set({ result_string: id }),
  addToBotChatList: (message: string) =>
    set((state) => ({ bot_chat_list: [...state.bot_chat_list, message] })),
  addToUserChatList: (message: string) =>
    set((state) => ({ user_chat_list: [...state.user_chat_list, message] })),
  // clearChatList: () => {
  //   set({ bot_chat_list: [] }), set({ user_chat_list: [] });
  // },
}));

export default useStore;
