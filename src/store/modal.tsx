import {create} from "zustand";
import {Post} from "@/model/Post";

// TypeScript 을 위한 interface
interface ModalState {
    // 'new': 새글, 'comment': 답글
    mode: 'new' | 'comment',
    data: Post | null,
    setMode: (mode: 'new' | 'comment') => void;
    setData: (data: Post) => void;
    reset: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    mode: 'new',
    data: null,
    setMode: (mode) =>{
        set({ mode });
    },
    setData: (data) => {
        set({ data });
    },
    reset: () => {
        set({
            mode: 'new',
            data: null,
        })
    }
}));


interface UseNumberShallowStore {
    numberA: number;
    numberB: number;
    numberC: number;
    increaseNumberA: () => void;
    increaseNumberB: (value: number) => void;
    increaseNumberC: () => void;
}

export const useNumberShallowStore = create<UseNumberShallowStore>()((set, get) => ({
    numberA: 1,
    numberB: 2,
    numberC: 3,
    // numberA 증가 함수
    increaseNumberA: () =>
        set((state) => ({
            numberA: state.numberA + 1, // state 를 이용하여 state 값 변경
        })),
    // numberB 증가 함수
    increaseNumberB: (value: number) =>
        set({
            numberB: get().numberB + value, // get 을 이용하여 state 값 변경
        }),
    // numberC 증가 함수
    increaseNumberC: () =>
        set((state) => ({
            numberC: state.numberC + 2, // state 를 이용하여 state 값 변경
        })),
}));

