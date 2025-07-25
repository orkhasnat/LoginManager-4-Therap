chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "performLogin") {
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      args: [request.loginInfo],
      func: (loginInfo) => {
        // This code runs inside the target tab
        const setInputValue = (selector, value) => {
          const el = document.querySelector(selector)
          if (el) el.value = value
        }

        setInputValue('#loginName', loginInfo.loginName)
        setInputValue('#providerCode', loginInfo.code)

        const actionSubmit = document.querySelector('[name="_action_submit"]')
        if (actionSubmit) actionSubmit.click()

        setInputValue('#password', loginInfo.password)

        const submitButton = document.querySelector('#submitButton')
        if (submitButton) submitButton.click()
      }
    })
  }
})
