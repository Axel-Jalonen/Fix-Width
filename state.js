const widthSelector = document.getElementById("width-selector")

window.addEventListener("DOMContentLoaded", function () {
  const lsWidth = this.localStorage.getItem("width")

  if (lsWidth) {
    widthSelector.value = lsWidth
  }

  widthSelector.addEventListener("input", handleWidthChange)

  function handleWidthChange(e) {
    const newValue = e.target.value
    localStorage.setItem("width", newValue)
  }
})
