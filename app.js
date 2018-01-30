let width = 500;
let height = 0;
let filter =  'none';
let streaming = false;

const video = document.getElementById('video');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const canvas  = document.getElementById('canvas');
const photos = document.getElementById('photos');

//Get media stream
navigator.mediaDevices.getUserMedia({video:true, audio:false})
.then((stream)=>{
    //Link to the video source
    video.srcObject = stream;

    //Play video
    video.play();
})
.catch((err)=>{
    console.log(`Error:  ${err}`);
});

video.addEventListener('canplay',(e)=>{
    if(!streaming)
    {
        height = video.videoHeight / (video.videoWidth / width);
        
        video.setAttribute('width',width);
        video.setAttribute('height',height);
        canvas.setAttribute('width',width);
        canvas.setAttribute('hegiht',height);
        streaming:true;
    }
},false);


photoButton.addEventListener('click',(e)=>{
    takepicture();
    e.preventDefault();

},false);

function takepicture()
{
    const context = canvas.getContext('2d');
    if(width && height)
    {
        canvas.width = width ;
        canvas.height = height;

        //Draw image in canvas
        context.drawImage(video,0,0,width,height);

        //Create image from canvas
        const imgurl = canvas.toDataURL('image/png');
        //console.log(imgurl);
        //console.log(imgurl);

        const img = document.getElementById('photos');
        img.setAttribute('src',imgurl);
        

    }
}

