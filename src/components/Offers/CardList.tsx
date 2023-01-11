import Card from "./Card";

const CardList = () => {
    return (
        <ul className="max-w-screen-xl h-full mx-auto py-48 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-10 ">
            <Card
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}

                discount={50}
                description="Obten un maravillo descuento al registrarte por primera vez."
                offertName="Regístrate"
                warning="Solo aplica una vez"
                btnUrl="https://wa.me/message/6JVWCHU4HSP2B1"
                content={[
                    "En cualquier servicio",
                    "Disponible en servicios especiales",
                    "Vigente solamente en enero del 2023"
                ]}
            />
            <Card
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}

                discount={20}
                description="Solo por recomendarnos, puedes accerder a un descuento especial."
                offertName="Recomienda"
                warning="Hazlo cuantas veces quieras"
                btnUrl="https://wa.me/message/6JVWCHU4HSP2B1"
                content={[
                    "En cualquier servicio",
                    "Aplica para nuevos usuarios",
                    "Disponible en servicios especiales",
                    "Vigente permanentemente"
                ]}
            />
            <Card 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}

                discount={35}
                description="Compra fundas para tus muebles y obten un descuento."
                offertName="Protege"
                warning="Por cada compra y servicio"
                btnUrl="https://wa.me/message/6JVWCHU4HSP2B1"
                content={[
                    "En cualquier servicio",
                    "Disponible en servicios especiales",
                    "Vigente permanentemente"
                ]}
            />
        </ul>
    )
}

export default CardList