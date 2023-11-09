import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const Vendor = ({ product }) => {
  const [vendorVariants, setVendorVariants] = useState([]);

  useEffect(() => {
    const formattedVariants = product.vendors.map((vendor) => {
      const variants = vendor.variants
        .map((variant) =>
          Object.entries(variant)
            .map(([key, value]) => `${value}`)
            .join(" : ")
        )
        .join(" , ");
      return { vendorName: vendor.nameV, variants, isMain: vendor.isMain };
    });
    setVendorVariants(formattedVariants);
  }, [product.vendors]);

  return (
    <div className="vendor-detail">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <h3>Vendor Name</h3>
            </TableCell>
            <TableCell>
              <h3>Variants</h3>
            </TableCell>
            <TableCell>
              <h3>isMain</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendorVariants.map((vendor, index) => (
            <TableRow key={index}>
              <TableCell>
                <h3 className="value">{vendor.vendorName}</h3>
              </TableCell>
              <TableCell>
                <h3 className="value">{vendor.variants}</h3>
              </TableCell>
              <TableCell>
                <h3 className="value">
                  {vendor.isMain === true ? "True" : "False"}
                </h3>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Vendor;
