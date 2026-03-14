import { useEffect, useState } from "react"
import "../styles/login.css"
import { getTranslations } from "../services/api"

function Login() {

  const [lang, setLang] = useState("en")
  const [texts, setTexts] = useState({})

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

  return (
    <div className="login-container">

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

        <input placeholder={texts.email} />

        <input type="password" placeholder={texts.password} />

        <button>{texts.login_button}</button>

      </div>

    </div>
  )
}

export default Login