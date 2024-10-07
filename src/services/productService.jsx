import axiosInstance from '../utils/axiosInstance';

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/getCollection');
  return response; 
};
