
export default function setTheme(elem:HTMLElement, classLight: string, classDark: string) {
    if (localStorage.theme == "dark") {
        elem.classList.remove(classLight)
        elem.classList.add(classDark)
    } else {
        elem.classList.remove(classDark)
        elem.classList.add(classLight)
    }
}