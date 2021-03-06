const offline = {
  serviceWorker:
    `"serviceWorker" in window.navigator && window.addEventListener("load", function() {
      window.navigator.serviceWorker.register("/glints-project-service-worker.js")
        .then(function(r) {
          console.log("ServiceWorker registration successful with scope: ", r.scope)
        }).catch(function(e) {
          console.error("ServiceWorker registration failed: ", e)
        })
    });`,
  swGlints:
    `"serviceWorker" in window.navigator && window.addEventListener("load", function() {
      window.navigator.serviceWorker.register("/sw-glints.js")
        .then(function(r) {
          console.log("sw-glints registration successful with scope: ", r.scope)
        }).catch(function(e) {
          console.error("sw-glints registration failed: ", e)
        })
    });`,
};

export default offline;