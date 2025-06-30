class musicplayer {
  constructor() {
    this.currentSong = null
    this.isPlaying = false
    this.audioElements = {}
    this.updateTimeInterval = null
    this.init()
  }

  init() {
    const cards = document.querySelectorAll(".song-card")

    cards.forEach((card) => {
      const songId = card.dataset.songId
      const audioElement = card.querySelector(".audio-element")
      const playButton = card.querySelector(".play-button")

      this.audioElements[songId] = audioElement

      playButton.addEventListener("click", () => this.togglePlay(songId))

      audioElement.addEventListener("ended", () => this.handleAudioEnd())
    })
  }

  togglePlay(songId) {
    if (this.currentSong === songId && this.isPlaying) {
      this.pauseSong(songId)
    } else {
      this.stopAllSongs()
      this.playSong(songId)
    }
  }

  playSong(songId) {
    const card = document.querySelector(`[data-song-id="${songId}"]`)
    const audioElement = this.audioElements[songId]
    const playButton = card.querySelector(".play-button")
    const playText = playButton.querySelector(".play-text")
    const playingIndicator = card.querySelector(".playing-indicator")

    card.classList.add("playing")
    playButton.classList.add("playing")
    playText.textContent = "STOP!"
    playingIndicator.style.display = "block"

    this.currentSong = songId
    this.isPlaying = true
    audioElement.play()

    this.updateTimeInterval = setInterval(() => {
      this.updateCurrentTime(audioElement, songId)
    }, 500)
  }

  pauseSong(songId) {
    const card = document.querySelector(`[data-song-id="${songId}"]`)
    const audioElement = this.audioElements[songId]
    const playButton = card.querySelector(".play-button")
    const playText = playButton.querySelector(".play-text")
    const playingIndicator = card.querySelector(".playing-indicator")

    card.classList.remove("playing")
    playButton.classList.remove("playing")
    playText.textContent = "GO!"
    playingIndicator.style.display = "none"

    audioElement.pause()
    this.isPlaying = false
    this.currentSong = null

    clearInterval(this.updateTimeInterval)
  }

  stopAllSongs() {
    clearInterval(this.updateTimeInterval)
    Object.keys(this.audioElements).forEach((songId) => {
      this.pauseSong(songId)
    })
  }

  handleAudioEnd() {
    if (this.currentSong) {
      this.pauseSong(this.currentSong)
    }
  }

  updateCurrentTime(audio, songId) {
    const card = document.querySelector(`[data-song-id="${songId}"]`)
    const currentTimeEl = card.querySelector(".current-time")

    const minutes = Math.floor(audio.currentTime / 60).toString().padStart(2, "0")
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0")

    currentTimeEl.textContent = `${minutes}:${seconds}`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.musicPlayer = new musicplayer()
})

document.addEventListener("keydown", (e) => {
  const mp = window.musicPlayer
  if (!mp) return

  if (e.code === "Digit1") {
    mp.togglePlay("1")
  }

  if (e.code === "Digit2") {
    mp.togglePlay("2")
  }

  if (e.code === "Digit3") {
    mp.togglePlay("3") 
  }

  if (e.code === "Space") {
    e.preventDefault()
    if (mp.currentSong) {
      mp.togglePlay(mp.currentSong)
    } else {
      mp.togglePlay("1")
    }
  }
})
