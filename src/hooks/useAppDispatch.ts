import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/root';

export const useAppDispatch = () => useDispatch<AppDispatch>();
