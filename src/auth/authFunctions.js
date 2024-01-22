import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig";

export const useAuthorized = async () => {
  let isAuthorized = false;
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthorized = true;
    }
    else {
      isAuthorized = false;
    }
  });
  return isAuthorized
}