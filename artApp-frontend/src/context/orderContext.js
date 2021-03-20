import createDataContext from './createDataContext';
import instance from '../Api/api';
import * as rootNavigation from '../rootNavigation';

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'add_cart':
      return { ...state, cartData: [...state.cartData, action.payload] };
    case 'add_order':
      return { ...state, orderData: [...state.orderData, action.payload] };
    case 'ordered_data':
      return { ...state, orderedData: action.payload };
    case 'ordered_Adata':
      return { ...state, orderedDataA: action.payload };
    default:
      return state;
  }
};

const postOrder = (dispatch) => async (order) => {
  try {
    const {
      buyer,
      product,
      artist,
      shippingAddress,
      city,
      zip,
      country,
      phone,
      email,
    } = order;
    console.log('here hihi');

    const response = await instance.post('/api/v1/order', {
      buyer,
      product,
      artist,
      shippingAddress,
      city,
      zip,
      country,
      phone,
      email,
    });
    console.log(response.data);
  } catch (error) {
    console.log('error happened');
  }
};
const setCart = (dispatch) => (name, image, price) => {
  const cart = { name, image, price };
  console.log(cart);
  dispatch({ type: 'add_cart', payload: cart });
};

const setOrder = (dispatch) => (
  buyer,
  product,
  artist,
  shippingAddress,
  city,
  zip,
  country,
  phone,
  email
) => {
  const order = {
    buyer,
    product,
    artist,
    shippingAddress,
    city,
    zip,
    country,
    phone,
    email,
  };
  //   console.log(order);

  dispatch({ type: 'add_order', payload: order });
};

const getOrder = (dispatch) => async (buyer) => {
  try {
    const id = buyer.toString();
    console.log(id);

    const response = await instance.get(`/api/v1/order/buyer/${id}`);
    console.log(response.data);
    dispatch({ type: 'ordered_data', payload: response.data });
  } catch (error) {
    console.log('error happened');
  }
};

const getOrderArtist = (dispatch) => async (artist) => {
  try {
    const id = artist.toString();
    console.log(id);

    const response = await instance.get(`/api/v1/order/artist/${id}`);
    console.log(response.data);
    dispatch({ type: 'ordered_Adata', payload: response.data });
  } catch (error) {
    console.log('error happened');
  }
};

export const { Provider, Context } = createDataContext(
  orderReducer,
  { postOrder, setCart, setOrder, getOrder, getOrderArtist },
  { cartData: [], orderData: [], orderedData: [], orderedDataA: [] }
);
