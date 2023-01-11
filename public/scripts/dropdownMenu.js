setTimeout(() => {
    const menuTarget = document.getElementById("mega-menu-full")
    const megaMenuTrigger = document.getElementById("mega-menu-trigger")
    const servicesTrigger = document.getElementById("services-trigger")
    const servicesTarget = document.getElementById("services-target")

    const servicesCollapse = new Collapse(servicesTarget)
    const collapseMegaMenu = new Collapse(menuTarget, {
        onCollapse() {
            servicesCollapse.collapse()
        }
    })
    megaMenuTrigger.onclick = () => {
        collapseMegaMenu.toggle()
    }

    servicesTrigger.onclick = () => {
        servicesCollapse.toggle()
    }

}, 3000)