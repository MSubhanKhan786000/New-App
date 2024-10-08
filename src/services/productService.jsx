import axiosInstance from '../utils/axiosInstance';

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/getCollection');
  return response; 
};

export const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/getCollection/${id}`)
   return response.data;
}
