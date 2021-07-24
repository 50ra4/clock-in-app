import { config } from 'dotenv';
config();

// eslint-disable-next-line import/first
import { firestore } from '../src/services/firebase';

const healthCheckDocId = process.env.REACT_APP_HEALTH_CHECK_DOC_ID ?? '';

const test = async () => {
  try {
    const doc = await firestore.collection('health').doc(healthCheckDocId).get();
    // eslint-disable-next-line no-console
    console.log(`health-check is ${doc.get('success')}.`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
  process.exit(0);
};

test();
