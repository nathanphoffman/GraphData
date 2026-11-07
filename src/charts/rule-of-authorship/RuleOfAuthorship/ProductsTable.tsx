import type { Product } from "../types";
import { Inline } from "./TextPieces";

/** One row of the products table. */
function ProductRow({ product }: { product: Product }) {
  return (
    <tr>
      <td>
        {product.title} <span>({product.year})</span>
      </td>
      <td>
        <Inline parts={product.credits} />
      </td>
      <td>{product.added}</td>
    </tr>
  );
}

/** The OD&D-era products, with who is credited on each. */
export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="auth-table-wrap">
      <table className="auth-summary">
        <thead>
          <tr>
            <th>Product</th>
            <th>Credited to</th>
            <th>What it added</th>
          </tr>
        </thead>
        <tbody>
          {/* One row per product that was checked against the rules. */}
          {products.map((product) => (
            <ProductRow key={product.title} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
