const text = document.querySelector("#text")
const upload = document.querySelector("#upload")
const voice = document.querySelector("#voice")
const listen = document.querySelector("#listen-bnt")
const dowloandBtn = document.querySelector("#dowloand")

const speak = new SpeechSynthesisUtterance()

let availableVoice = []

const attValue = () => {
  availableVoice = window.speechSynthesis.getVoices()

  speak.voice = availableVoice[0]

  console.log(availableVoice)

  availableVoice.forEach((voices, index) => {
    const option = document.createElement("option")
    option.value = index
    option.textContent = voices.name
    voice.appendChild(option)
  })
}

window.speechSynthesis.onvoiceschanged = attValue

voice.addEventListener("change", () => {
  speak.voice = availableVoice[voice.value]

  console.log(voice)
})

listen.addEventListener("click", () => {
  speak.text = text.value

  window.speechSynthesis.speak(speak)
})

dowloandBtn.addEventListener("click", () => {
  const downText = text.value

  const blob = new blob([downText], { type: "text/plain" })

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")

  a.href = url
  a.download = "converson.txt"
  a.click()

  URL.revokeObjectURL(url)
})

upload.addEventListener("change", (event) => {
  const archiv = event.target.files[0]

  if (archiv) {
    const reader = new FileReader()
    reader.onload = (e) => {
      text.value = e.target.result
    }

    reader.readAsText(archiv)
  }
})