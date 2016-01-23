// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('homeCtrl',function($scope,$cordovaCamera,$cordovaFileTransfer){
  $scope.imgURI="";
  document.addEventListener("deviceready", function () {

    $scope.takePicture=function(){
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      // image.src = "data:image/jpeg;base64," + imageData;
      $scope.imgURI=imageData;
    }, function(err) {
      // error
    });
  };
  }, false);

  $scope.uploadPhoto=function(){
    var url='http://192.168.34.1/a/SERVER/upload.php'; //local server//
    var targetSimpan= $scope.imgURI;
    var filename= targetSimpan.split("/").pop();
    var formatFile = targetSimpan.split(".").pop();
    var options={
      fileKey:'file',
      fileName:filename,
      chunkedMode:false,
      mimeType:'image/'+formatFile,
      params:{
        'fileName':filename
      }
    };
    $cordovaFileTransfer.upload(url,targetSimpan,options).then(function(result) {
      console.log("SUCCESS: " + JSON.stringify(result.response));
      alert("success");
      alert(JSON.stringify(result.response));
    },function (err) {
      console.log("ERROR: " + JSON.stringify(err));
      alert(JSON.stringify(err));
    });

  }
})
