import { createContext } from 'react';

// Mock data stored on device as json
import storageData from './storage_data';

export const StorageContext = createContext(storageData);
