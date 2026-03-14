import { useEffect, useState } from "react"
import { getProducts, updateProduct, getTranslations } from "../services/api"
import "../styles/pricelist.css"

function Pricelist() {

  const [products, setProducts] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  const [lang, setLang] = useState("en")

  const [texts, setTexts] = useState({
    pricelist: "Pricelist",
    article_no: "Article No",
    product_service: "Product / Service",
    in_price: "In Price",
    price: "Price",
    unit: "Unit",
    in_stock: "In Stock",
    description: "Description",
    save: "Save"
  })

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    loadTranslations()
  }, [lang])

  const loadProducts = async () => {
    const data = await getProducts()

    if (Array.isArray(data)) {
      setProducts(data)
    } else {
      console.log("API error:", data)
      setProducts([])
    }
  }

  const loadTranslations = async () => {
    const data = await getTranslations(lang)

    const map = {}
    data.forEach(item => {
      map[item.key] = item.value
    })

    setTexts(prev => ({ ...prev, ...map }))
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

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  return (
    <div className="pricelist-page">

      <div className="topbar">

        <div className="left-nav" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className="right-nav">

          <span>{lang === "en" ? "English" : "Swedish"}</span>

          <img
            src="https://storage.123fakturere.no/public/flags/GB.png"
            width="24"
            onClick={() => setLang("en")}
          />

          <img
            src="https://storage.123fakturere.no/public/flags/SE.png"
            width="24"
            onClick={() => setLang("sv")}
          />

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>

      {menuOpen && (
        <div className="sidebar">
          <p>Invoices</p>
          <p>Customers</p>
          <p>My Business</p>
          <p>Invoice Journal</p>
          <p>Price List</p>
          <p>Import / Export</p>
        </div>
      )}

      <div className="content">

        <h2>{texts.pricelist}</h2>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>{texts.article_no}</th>
                <th>{texts.product_service}</th>
                <th>{texts.in_price}</th>
                <th>{texts.price}</th>
                <th>{texts.unit}</th>
                <th>{texts.in_stock}</th>
                <th>{texts.description}</th>
                <th>{texts.save}</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product, index) => (

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
                      {texts.save}
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Pricelist