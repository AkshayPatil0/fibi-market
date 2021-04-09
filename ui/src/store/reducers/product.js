import {
  SET_CATEGORIES,
  SET_PRODUCT_DETAILS,
  SET_PRODUCT_IMAGES,
  SET_PRODUCTS,
  SET_LOCATIONS,
} from "../actions/product";

const initialProductState = {
  title: "",
  sku: "",
  description: "",
  price: { mrp: "", retail: "" },
  specs: [],
  variations: null,
  variants: [],
  stock: "",
  category: "",
  location: "",
  hasVariants: false,
  selectedVariant: null,
};
const initialState = {
  categories: [],
  locations: [],
  products: [],
  product: initialProductState,
  productImages: [],
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        product: action.payload || initialProductState,
      };

    case SET_PRODUCT_IMAGES:
      return {
        ...state,
        productImages: action.payload,
      };

    default:
      return state;
  }
}

// const resolvePath = (path, value, product) => {
//   const pathArr = path.split(".");

//   let newProduct = {...product};

//   // pathArr.map()
// }
