<script setup lang="ts">
import { ref, onMounted } from 'vue'

const forgeViewer = ref<HTMLDivElement | null>();

onMounted(async () => {
  if (window.Autodesk) {
    const Client_ID = 'Oi3IShZaVoKkchPwEvLsN1t2ygS5dNR3Qgim1XjGlGhdTQqV'
    const Client_Secret = '3AJ7VcMZFPsncRqI3pZNdFbaRsU1JszhjuUkLFzlLiCUFHbzTQMPRGHVdhYyiMJo'

    var viewer: Autodesk.Viewing.GuiViewer3D | null;
    var options = {
      env: 'AutodeskProduction2', // Use 'AutodeskProduction' for SVF
      api: 'streamingV2', // Use 'derivativeV2' for SVF
      getAccessToken: function (onTokenReady: any) {
        var token = 'YOUR_ACCESS_TOKEN'
        var timeInSeconds = 3600 // Use value provided by APS Authentication (OAuth) API

        fetch('https://developer.api.autodesk.com/authentication/v2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + btoa(Client_ID + ':' + Client_Secret),
          },
          body: 'grant_type=client_credentials&scope=data:read',
        })
          .then((res) => res.json())
          .then((data) => {
            token = data.access_token
            timeInSeconds = data.expires_in

            console.log(token)
            onTokenReady(token, timeInSeconds)
          })
      }
    };

    Autodesk.Viewing.Initializer(options, function () {
      if (forgeViewer.value === undefined || forgeViewer.value === null) {
        console.error('no forgeViewer')
        return
      }

      viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer.value)
      var startedCode = viewer.start()
      if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.')
        return;
      }

      console.log('Initialization complete, loading a model next...')

      var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cm9uX2NoZW4vdGVzdA'
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure)
    });

  }

  var onDocumentLoadSuccess = (viewerDocument: any) => {
    if (viewer) {
      var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
      viewer.loadDocumentNode(viewerDocument, defaultModel);
    }
  }
  var onDocumentLoadFailure = () => { }
})
</script>

<template>
  <div class="container">
    <div id='forgeViewer' ref="forgeViewer"></div>
  </div>
</template>

<style scoped>
.container {
  width: 80vw;
  height: 100vh;
  position: relative
}

#forgeViewer {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #F0F8FF;
  position: absolute
}
</style>
