
 // global variable
var getCanvas; // global variable
function share(filesArray) {
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator.share({
          files: filesArray,
          title: 'Your Menu',
          text: 'Your songs as a menu!',
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
      } else {
        console.log(`Your system doesn't support sharing files.`);
      }
}
var element = $("#bear");


$(".share-button").click(() => {
    html2canvas(element).then((canvas) {
        $("#previewImage").append(canvas);
        getCanvas = canvas;
    });
    var imageData = getCanvas.toDataURL("image/png");
    var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
    share([newData]);
})


function convertToPng() {
    var element = $("#imageDIV");
    var getCanvas; // global variable
    $('document').ready(function(){
        html2canvas(element, {
            onrendered: function (canvas) {
            $("#previewImage").append(canvas);
            getCanvas = canvas;
            }
        });
    });
    $("#download").on('click', function () {
    var imageData = getCanvas.toDataURL("image/png");
    // Now browser starts downloading it instead of just showing it
    var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
    $("#download").attr("download", "image.png").attr("href", newData);
    });
}