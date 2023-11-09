import React from "react";

import Card from "@mui/material/Card";
import "./CreateProduct.css";

import { Formik, FieldArray, Form } from "formik";
import ProductSchema from "../../component/schema/ProductSchema";

import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../redux/action/ProductAction";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
const CreateProduct = () => {
  const allProduct = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="create-product">
      <Card className="varient-card">
        <Formik
          initialValues={{
            name: "",
            description: "",
            vendors: [
              {
                nameV: "",
                isMain: true,
                variants: [{ variant: "", number: "" }],
              },
            ],
          }}
          validationSchema={ProductSchema}
          onSubmit={(values, actions) => {
            const allReadyAxist = allProduct.some((product) => {
              return product.name === values.name;
            });

            if (!allReadyAxist) {
              dispatch(addProduct(values));
              toast("Product Created Successfully");
              navigate("/");
              actions.resetForm();
            } else {
              toast("Product Already Exist");
              return false;
            }
          }}
        >
          {({
            values,
            setFieldValue,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleReset,
          }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="description"
                    name="description"
                    label="description"
                    variant="outlined"
                    multiline
                    fullWidth
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
              </Grid>
              <FieldArray name="vendors">
                {({ push, remove }) => (
                  <div>
                    {values.vendors.map((vendor, vendorIndex) => (
                      <div key={vendorIndex} className="vendor-section">
                        <Grid container spacing={2}>
                          <Grid item xs={10}>
                            <TextField
                              label="Vendor Name"
                              name={`vendors.${vendorIndex}.nameV`}
                              variant="outlined"
                              fullWidth
                              value={values.vendors[vendorIndex].nameV}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.vendors &&
                                touched.vendors[vendorIndex] &&
                                Boolean(
                                  errors.vendors &&
                                    errors.vendors[vendorIndex] &&
                                    errors.vendors[vendorIndex].nameV
                                )
                              }
                              helperText={
                                touched.vendors &&
                                touched.vendors[vendorIndex] &&
                                errors.vendors &&
                                errors.vendors[vendorIndex] &&
                                errors.vendors[vendorIndex].nameV
                              }
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={vendor.isMain}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFieldValue(
                                        `vendors.${vendorIndex}.isMain`,
                                        true
                                      );
                                      values.vendors.forEach((v, index) => {
                                        if (index !== vendorIndex) {
                                          setFieldValue(
                                            `vendors.${index}.isMain`,
                                            false
                                          );
                                        }
                                      });
                                    } else {
                                      setFieldValue(
                                        `vendors.${vendorIndex}.isMain`,
                                        false
                                      );
                                    }
                                  }}
                                />
                              }
                              label="Is Main"
                            />
                          </Grid>
                        </Grid>
                        <FieldArray name={`vendors.${vendorIndex}.variants`}>
                          {({ push: pushVariant, remove: removeVariant }) => (
                            <div>
                              {vendor.variants.map((variant, variantIndex) => (
                                <div
                                  key={variantIndex}
                                  className="variant-section"
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                      <FormControl fullWidth variant="outlined">
                                        <InputLabel
                                          id={`vendors.${vendorIndex}.variants.${variantIndex}.variant`}
                                        >
                                          Variant
                                        </InputLabel>
                                        <Select
                                          labelId={`vendors.${vendorIndex}.variants.${variantIndex}.variant`}
                                          label="Variant"
                                          name={`vendors.${vendorIndex}.variants.${variantIndex}.variant`}
                                          value={
                                            values.vendors[vendorIndex]
                                              .variants[variantIndex].variant
                                          }
                                          error={
                                            errors.vendors &&
                                            errors.vendors[vendorIndex] &&
                                            errors.vendors[vendorIndex]
                                              .variants &&
                                            errors.vendors[vendorIndex]
                                              .variants[variantIndex] &&
                                            errors.vendors[vendorIndex]
                                              .variants[variantIndex].variant
                                          }
                                          helperText={
                                            touched.vendors &&
                                            touched.vendors[vendorIndex] &&
                                            touched.vendors[vendorIndex]
                                              .variants &&
                                            touched.vendors[vendorIndex]
                                              .variants[variantIndex]
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        >
                                          <MenuItem value="">
                                            Select Variant
                                          </MenuItem>
                                          <MenuItem value="xs">xs</MenuItem>
                                          <MenuItem value="sm">sm</MenuItem>
                                          <MenuItem value="l">l</MenuItem>
                                          <MenuItem value="xl">xl</MenuItem>
                                        </Select>
                                      </FormControl>
                                      {touched.vendors &&
                                        touched.vendors[vendorIndex] &&
                                        touched.vendors[vendorIndex].variants &&
                                        touched.vendors[vendorIndex].variants[
                                          variantIndex
                                        ] &&
                                        errors.vendors &&
                                        errors.vendors[vendorIndex] &&
                                        errors.vendors[vendorIndex].variants &&
                                        errors.vendors[vendorIndex].variants[
                                          variantIndex
                                        ] &&
                                        errors.vendors[vendorIndex].variants[
                                          variantIndex
                                        ].variant && (
                                          <div className="error">
                                            {
                                              errors.vendors[vendorIndex]
                                                .variants[variantIndex].variant
                                            }
                                          </div>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                      <div className="form-group">
                                        <FormControl
                                          fullWidth
                                          variant="outlined"
                                        >
                                          <InputLabel
                                            id={`vendors.${vendorIndex}.variants.${variantIndex}.number`}
                                          >
                                            Number
                                          </InputLabel>
                                          <Select
                                            labelId={`vendors.${vendorIndex}.variants.${variantIndex}.number`}
                                            label="Number"
                                            name={`vendors.${vendorIndex}.variants.${variantIndex}.number`}
                                            value={
                                              values.vendors[vendorIndex]
                                                .variants[variantIndex].number
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                              errors.vendors &&
                                              errors.vendors[vendorIndex] &&
                                              errors.vendors[vendorIndex]
                                                .variants &&
                                              errors.vendors[vendorIndex]
                                                .variants[variantIndex] &&
                                              errors.vendors[vendorIndex]
                                                .variants[variantIndex].number
                                            }
                                            helperText={
                                              touched.vendors &&
                                              touched.vendors[vendorIndex] &&
                                              touched.vendors[vendorIndex]
                                                .variants &&
                                              touched.vendors[vendorIndex]
                                                .variants[variantIndex]
                                            }
                                          >
                                            <MenuItem value="">
                                              Select Number
                                            </MenuItem>
                                            <MenuItem value="20">20</MenuItem>
                                            <MenuItem value="30">30</MenuItem>
                                            <MenuItem value="25">25</MenuItem>
                                            <MenuItem value="35">35</MenuItem>
                                            {/* Add your number options here */}
                                          </Select>
                                        </FormControl>
                                        {touched.vendors &&
                                          touched.vendors[vendorIndex] &&
                                          touched.vendors[vendorIndex]
                                            .variants &&
                                          touched.vendors[vendorIndex].variants[
                                            variantIndex
                                          ] &&
                                          errors.vendors &&
                                          errors.vendors[vendorIndex] &&
                                          errors.vendors[vendorIndex]
                                            .variants &&
                                          errors.vendors[vendorIndex].variants[
                                            variantIndex
                                          ] &&
                                          errors.vendors[vendorIndex].variants[
                                            variantIndex
                                          ].number && (
                                            <div className="error">
                                              {
                                                errors.vendors[vendorIndex]
                                                  .variants[variantIndex].number
                                              }
                                            </div>
                                          )}
                                      </div>
                                    </Grid>
                                  </Grid>
                                  {variantIndex > 0 && (
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      onClick={() =>
                                        removeVariant(variantIndex)
                                      }
                                      className="remove-button"
                                    >
                                      Remove Variant
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button
                                variant="contained"
                                onClick={() =>
                                  pushVariant({ variant: "", number: "" })
                                }
                                className="add-button"
                              >
                                Add Variant
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                        {vendorIndex > 0 && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => remove(vendorIndex)}
                            className="remove-button"
                          >
                            Remove Vendor
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      onClick={() =>
                        push({
                          vendorName: "",
                          isMain: false,
                          variants: [{ variant: "", number: "" }],
                        })
                      }
                      className="add-button"
                    >
                      Add Vendor
                    </Button>
                  </div>
                )}
              </FieldArray>

              <Grid container spacing={2}>
                <Grid item xs={6} className="text-right">
                  <Button
                    variant="contained"
                    className="submit-button"
                    onClick={() => {
                      handleReset();
                      navigate("/");
                    }}
                  >
                    Cancle
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    className="submit-button"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default CreateProduct;
