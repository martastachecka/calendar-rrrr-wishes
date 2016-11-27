export const showNotification = content => {
  if (window.Notification && Notification.permission === "granted") {
    new Notification(content);
  }
}

window.addEventListener('load', function () {
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }
});