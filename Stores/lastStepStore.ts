import { atom } from "jotai";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { NextRouter } from "next/router";

export const lastStepReachedAtom = atom<boolean>(false)
export const routerPushToMainPageAtom = atom<AppRouterInstance | null>(null)