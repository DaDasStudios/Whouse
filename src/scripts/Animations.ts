export class TypeAnimation {
    public trigger: HTMLElement
    public charsToRemove: number
    public text: string
    private idx: number
    private intervalId: any
    private charsArr: Array<string>

    constructor(trigger: HTMLElement, text: string) {
        this.idx = 0
        this.charsToRemove = 0
        this.trigger = trigger
        this.text = ""
        this.charsArr = []
        this.setText(text)
    }

    public setText(value: string) {
        this.text = value
        this.charsArr = this.text.split("")
    }

    private typeLetter(this: TypeAnimation) {
        if (this.charsArr[this.idx] === " ") {
            this.idx++;
            this.trigger.textContent += " " + this.charsArr[this.idx];
        } else {
            this.trigger.textContent += this.charsArr[this.idx];
        }
        if (this.idx === this.charsArr.length - 1) {
            return new Promise((resolve, reject) => {
                clearInterval(this.intervalId)
                resolve("Animation finished")
            })
        };
        this.idx++;
    }

    private removeLetter(this: TypeAnimation) {
        this.trigger.textContent = this.trigger.textContent?.substring(0, this.trigger.textContent.length - 1) as string
        if (this.idx === this.charsToRemove) {
            return new Promise((resolver, reject) => {
                clearInterval(this.intervalId)
                resolver("Animation finished")
            })
        }
        this.idx++;
    }

    start(options: {
        mode: "type" | "remove",
        speed?: number
    }) {
        this.idx = 0
        if (options.mode == "type") return new Promise((resolve, reject) => {
            this.intervalId = setInterval(() => {
                this.typeLetter()?.then(m => {
                    resolve(m)
                })
            }, options.speed ? options.speed : 100);
        })
        if (options.mode == "remove") {
            return new Promise((resolve, reject) => {
                this.intervalId = setInterval(() => {
                    this.removeLetter()?.then(m => {
                        resolve(m)
                    })
                }, options.speed ? options.speed : 100);
            })
        }
    }
};
