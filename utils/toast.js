export function showToastText(title) {
  return wx.showToast({
    title: title,
    duration: 1500,
    icon: 'none'
  })
}