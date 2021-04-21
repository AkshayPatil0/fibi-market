import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Switch,
} from "@material-ui/core";
import { fetchProduct, fetchCategory, fetchLocation } from "../../../api";
import ProductGridItem from "../products/product-grid-item";
import CategoryItem from "../home/categories/category-item";
import HorizontalList from "../../common/horizontalList";

export default function Relevances({ relevances }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const getProductCard = (product) => (
    <Box minWidth={"12em"}>
      <ProductGridItem product={product} />
    </Box>
  );
  const getCategoryCard = (category) => <CategoryItem category={category} />;

  useEffect(() => {
    const run = async (ids, setItems, getItem, getCard) => {
      setItems(
        await Promise.all(
          ids.map(async (id) => {
            const res = await getItem(id);
            return getCard(res.data);
          })
        )
      );
    };

    run(relevances.products || [], setProducts, fetchProduct, getProductCard);
    run(
      relevances.categories || [],
      setCategories,
      fetchCategory,
      getCategoryCard
    );
    run(
      relevances.locations || [],
      setLocations,
      fetchLocation,
      getCategoryCard
    );
  }, [relevances]);

  return (
    <>
      <Box pb={1}>
        {products.length > 0 && (
          <Card>
            <CardHeader title="Related products" />
            <HorizontalList list={products} />
          </Card>
        )}
      </Box>
      <Box pb={1}>
        {categories.length > 0 && (
          <Card>
            <CardHeader title="Related categories" />
            <HorizontalList list={categories} />
          </Card>
        )}
      </Box>
      <Box pb={1}>
        {locations.length > 0 && (
          <Card>
            <CardHeader title="Related location" />
            <HorizontalList list={locations} />
          </Card>
        )}
      </Box>
    </>
  );
}
