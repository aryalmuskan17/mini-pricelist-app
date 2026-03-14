import { useEffect, useState } from "react"
import { getProducts, updateProduct } from "../services/api"

function Pricelist() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
  const data = await getProducts()

  if (Array.isArray(data)) {
    setProducts(data)
  } else {
    console.log("API error:", data)
    setProducts([])
  }
}

  const handleChange = (index, field, value) => {
    const updated = [...products]
    updated[index][field] = value
    setProducts(updated)
  }

  const saveProduct = async (product) => {
    await updateProduct(product.id, product)
    alert("Saved")
  }

  return (
    <div style={{ padding: "20px" }}>

      <h2>Pricelist</h2>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>Article No</th>
            <th>Product / Service</th>
            <th>In Price</th>
            <th>Price</th>
            <th>Unit</th>
            <th>In Stock</th>
            <th>Description</th>
            <th>Save</th>
          </tr>
        </thead>

        <tbody>

          {Array.isArray(products) && products.map((product, index) => (

            <tr key={product.id}>

              <td>
                <input
                  value={product.article_no}
                  onChange={(e) =>
                    handleChange(index, "article_no", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={product.product_service}
                  onChange={(e) =>
                    handleChange(index, "product_service", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={product.in_price}
                  onChange={(e) =>
                    handleChange(index, "in_price", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={product.price}
                  onChange={(e) =>
                    handleChange(index, "price", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={product.unit}
                  onChange={(e) =>
                    handleChange(index, "unit", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={product.in_stock}
                  onChange={(e) =>
                    handleChange(index, "in_stock", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={product.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>

              <td>
                <button onClick={() => saveProduct(product)}>
                  Save
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default Pricelist