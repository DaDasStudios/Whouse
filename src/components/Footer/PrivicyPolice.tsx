import Toastify from 'toastify-js'
import { neutralToast, warningToast } from '../../util/toastClasses'

const PrivicyPolice = () => {
    return (
        <li 
            className="mb-4 cursor-pointer"
            onClick={() => {
                Toastify({
                    text: "🔍 Whouse solamente recopilará la información proporcionada por el usuario, de modo que autorizas de ante mano el tratamiento de datos personales solicitados para ciertas acciones como: registro, autenticación, ofertas, contacto.",
                    stopOnFocus: true,
                    duration: 10000,
                    gravity: "bottom",
                    className: neutralToast  
                }).showToast()
                Toastify({
                    text: "⚠️ Si deseas saber más sobre el tratamiento de tus datos, queja o reclamo, contáctanos vía WhatsApp o en la sección de contacto.",
                    stopOnFocus: true,
                    duration: 10000,
                    gravity: "bottom",
                    className: warningToast
                }).showToast()
            }}
        >
            <p
                className="hover:underline"
            >
                Política de privacidad
            </p>
        </li>
    )
}

export default PrivicyPolice