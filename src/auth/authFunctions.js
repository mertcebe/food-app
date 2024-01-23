import React from "react";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig";

export const useAuthorized = async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      }
      else {
        resolve(false);
      }
    })
  })
}