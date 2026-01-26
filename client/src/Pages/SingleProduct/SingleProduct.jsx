import { useParams } from "react-router-dom";
import Single from "../../Components/Single/Single";
import "./singleProduct.scss";
import {
  productActivities,
  productsRow,
  singleProductData,
} from "../../data/data";

const SingleProduct = () => {
  const productId = useParams().id;
  const product = productsRow.find((item) => item.id === Number(productId));
  const info = {
    ...product,
    inStock: product.inStock === true ? "True" : "False",
  };
  const { avatar, id, ...others } = info;

  return (
    <div className="singleProduct">
      <Single
        info={others}
        avatar={product.avatar}
        chartData={singleProductData}
        activities={productActivities}
      />
    </div>
  );
};

export default SingleProduct;
