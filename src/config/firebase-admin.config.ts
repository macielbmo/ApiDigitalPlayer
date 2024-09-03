import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const envFilePath = `.env.${process.env.NODE_ENV || 'dev'}`;
dotenv.config({ path: envFilePath });

export const initializeFirebaseAdmin = () => {
  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};


