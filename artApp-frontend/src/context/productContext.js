import createDataContex from './createDataContext';
import instance from '../Api/api';
import * as rootNavigation from '../rootNavigation';

const productReducer = (state, action) => {
  switch (action.type) {
    case 'insert_products':
      return { ...state, productsData: action.payload };
    case 'get_product':
      return { ...state, productData: action.payload };
    default:
      return state;
  }
};

const getProducts = (dispatch) => async () => {
  try {
    const response = await instance.get('/api/v1/product');

    dispatch({ type: 'insert_products', payload: response.data });
  } catch (error) {
    console.log('main error');
    console.log(error.message);
  }
};

const uploadProduct = (dispatch) => async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await instance.post('/api/v1/product', formData, config);
    console.log('product uploaded');
    console.log(response.data);
    rootNavigation.navigate('Upload', {});
  } catch (error) {
    console.log('error happened');
  }
};

const getProduct = (dispatch) => async (artist) => {
  try {
    const id = artist.toString();
    const response = await instance.get(`/api/v1/product/${id}`);
    console.log(response.data);
    dispatch({ type: 'get_product', payload: response.data });
  } catch (error) {
    console.log('error happened');
  }
};

const deleteProduct = (dispatch) => async (product) => {
  try {
    const id = product.toString();
    await instance
      .delete(`/api/v1/product/${id}`)
      .then((res) => {
        console.log('item deleted successfully');
      })
      .catch((err) => console.log('errorHappened'));
  } catch (error) {
    console.log('big error ');
  }
};

export const { Provider, Context } = createDataContex(
  productReducer,
  { getProducts, uploadProduct, getProduct, deleteProduct },
  { productsData: [], productData: [] }
);
