
 // global variable
var getCanvas; // global variable
function share(filesArray) {
    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator.share({
          files: filesArray
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
      } else {
        console.log(`Your system doesn't support sharing files.`);
      }
}
var element = $("#bear");


export function convertAndShare() {
    console.log('test');
    html2canvas(element, {scale: 2}).then((canvas) => {
        var imageData = canvas.toDataURL("image/png");
        const blob = dataURItoBlob(imageData);
        const imageFile = new File([blob], "bearify.png");
        // var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
        // console.log(imageFile);
        console.log(imageFile);
        share([imageFile]);
    });
    
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

$("#share-button").on("click", () => {convertAndShare()});