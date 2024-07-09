window.addEventListener("DOMContentLoaded", function () {
  const fixWidthBtn = document.getElementById("fix-width-btn")
  fixWidthBtn.addEventListener("click", async () => {
    await triggerContentFunction()
  })
})

async function triggerContentFunction() {
  const tab = await getCurrentTab()

  if (!tab) {
    console.error("TAB NOT FOUND")
    return
  }

  try {
    let sizePreference = this.localStorage.getItem("width")
    let sizePreferenceMap = 0
    switch (sizePreference) {
      case "small":
        sizePreferenceMap = "calc(100vw / 3)"
        break
      case "medium":
        sizePreferenceMap = "calc(100vw / 2)"
        break
      case "large":
        sizePreferenceMap = "calc(200vw / 3)"
        break
      default:
        sizePreferenceMap = "calc(100vw / 2)"
        break
    }

    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: `html{display:flex;justify-content:center}
        body{max-width:${sizePreferenceMap};margin:auto;}`,
    })
  } catch (error) {
    console.error("Error inserting CSS:", error)
  }
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}
