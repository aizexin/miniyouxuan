export function showToastText(title) {
  return wx.showToast({
    title: title,
    duration: 1500,
    icon: 'none'
  })
}

export function showLoadingText(title) {
  return wx.showLoading({
    title: title,
    mask:true
  })
}

export function hidenLoading() {
  return wx.hideLoading()
}
