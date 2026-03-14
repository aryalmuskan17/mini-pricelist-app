import { useEffect, useState } from "react"
import "../styles/login.css"
import { getTranslations, login } from "../services/api"

function Login() {

  const [menuOpen, setMenuOpen] = useState(false)

  const [lang, setLang] = useState("en")
  const [texts, setTexts] = useState({})

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    loadTranslations()
  }, [lang])

  const loadTranslations = async () => {
    const data = await getTranslations(lang)

    const map = {}
    data.forEach(item => {
      map[item.key] = item.value
    })

    setTexts(map)
  }

  const handleLogin = async () => {
    const result = await login(email, password)

    if (result.token) {
      localStorage.setItem("token", result.token)
      window.location.href = "/pricelist"
    } else {
      alert("Login failed")
    }
  }

  return (
    <div className="login-container">

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {menuOpen && (
        <div className="menu">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      )}

      <div className="login-box">

        <div className="language-switch">
          <img
            src="https://storage.123fakturere.no/public/flags/GB.png"
            onClick={() => setLang("en")}
          />

          <img
            src="https://storage.123fakturere.no/public/flags/SE.png"
            onClick={() => setLang("sv")}
          />
        </div>

        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          className="logo"
        />

        <h2>{texts.login_title}</h2>

        <input
          placeholder={texts.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder={texts.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          {texts.login_button}
        </button>

      </div>

    </div>
  )
}

export default Login