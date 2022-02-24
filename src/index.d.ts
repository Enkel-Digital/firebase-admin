import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";
import initializeApp = require("./initializeApp.js");

export const fs: Firestore;
export const auth: Auth;

export { initializeApp, getFirestore, getAuth };
