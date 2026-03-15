import { useEffect, useState } from "react"
import { getProducts, updateProduct, getTranslations } from "../services/api"
import "../styles/pricelist.css"

function Pricelist() {

  const [products, setProducts] = useState([])
  const [lang, setLang] = useState("en")

  const [texts, setTexts] = useState({
    pricelist: "Pricelist",
    article_no: "Article No",
    product_service: "Product / Service",
    in_price: "In Price",
    price: "Price",
    unit: "Unit",
    in_stock: "In Stock",
    description: "Description"
  })

  const [searchArticle, setSearchArticle] = useState("")
  const [searchProduct, setSearchProduct] = useState("")

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

  const filteredProducts = products.filter((p) => {

    const articleMatch = p.article_no
      .toLowerCase()
      .includes(searchArticle.toLowerCase())

    const productMatch = p.product_service
      .toLowerCase()
      .includes(searchProduct.toLowerCase())

    return articleMatch && productMatch
  })

  const handleChange = async (index, field, value) => {

    const updated = [...products]
    updated[index][field] = value
    setProducts(updated)

    try {
      await updateProduct(updated[index].id, updated[index])
    } catch (err) {
      console.error("Auto save failed:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  return (

    <div className="page">

      {/* TOP BAR */}

      <div className="topbar">

        <div className="user-info">

          <img
            className="avatar"
            src="https://storage.123fakturera.se/public/icons/diamond.png"
          />

          <div className="user-text">
            <div className="user-name">John Andre</div>
            <div className="company-name">Storfjord AS</div>
          </div>

        </div>

        <div className="right-nav">

          <span className="language-text">
            {lang === "en" ? "English" : "Norsk Bokmål"}
          </span>

          <img
            src="https://storage.123fakturere.no/public/flags/GB.png"
            width="22"
            onClick={() => setLang("en")}
          />

          <img
            src="https://storage.123fakturere.no/public/flags/SE.png"
            width="22"
            onClick={() => setLang("sv")}
          />

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>

      {/* MAIN LAYOUT */}

      <div className="layout">

        {/* SIDEBAR */}

        <div className="sidebar">

          <div className="sidebar-title">Menu</div>

          <div className="sidebar-item">📄 Invoices</div>
          <div className="sidebar-item">👤 Customers</div>
          <div className="sidebar-item">⚙️ My Business</div>
          <div className="sidebar-item">📚 Invoice Journal</div>
          <div className="sidebar-item active">🏷 Price List</div>
          <div className="sidebar-item">📦 Import / Export</div>
          <div className="sidebar-item">🚪 Log out</div>

        </div>

        {/* MAIN CONTENT */}

        <div className="main">

          <div className="content">

            <h2>{texts.pricelist}</h2>

            <div className="toolbar">

              <div className="toolbar-left">

                <button className="action-btn">+ New Product</button>
                <button className="action-btn">🖨 Print List</button>
                <button className="action-btn">⚙ Advanced Mode</button>

              </div>

              <div className="toolbar-right">

                <input
                  placeholder="Search Article No"
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}
                />

                <input
                  placeholder="Search Product"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />

              </div>

            </div>

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
                  </tr>
                </thead>

                <tbody>

                  {filteredProducts.map((product, index) => (

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

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Pricelist