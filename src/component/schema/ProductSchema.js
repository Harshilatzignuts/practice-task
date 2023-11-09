import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .required("Project Name is required")
    .matches(/[^\s*].*[^\s*]/g, "* This field cannot contain only blankspaces"),
  description: Yup.string(),
  vendors: Yup.array().of(
    Yup.object().shape({
      nameV: Yup.string().required("Vendor name is required"),
      isMain: Yup.boolean(),
      variants: Yup.array().of(
        Yup.object().shape({
          variant: Yup.string().required("Variant is required"),
          number: Yup.string().required("Number is required"),
        })
      ),
    })
  ),
});

export default ProductSchema;
