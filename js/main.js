document.addEventListener('deviceready', function () {
    var currentImg = 0;
    var nbImages = 0;

    $(document).on('pageinit', function(){
        nbImages = $("#photoList li").length;

        $('#photoList').css('width',(nbImages * 100)+'%');
        $('#photoList li').css('width', (100/nbImages)+'%');
    })

    $('#photoList li').css('swipeleft',move);
    $('#photoList li').css('swiperight',move);

    function move(e){
        switch (e.type){
            case 'swipeleft':
                if(currentImg < (nbImages-1)){
                currentImg++;
            }

                break;

            case 'swiperight':
                if(currentImg> 0){
                    currentImg--;
                }

                break;
        }
        $('#photoList').css('left',(currentImg * (-100)) +'%');
    }

    var drawZone = document.getElementById('drawZone'),
        ctx = drawZone.getContext('2d');


    $('btnAdd').on('tap' , function(){
        var imageData =canva.toDataUrl();
        $('#photoList').append('<li><img src="'+imageData+'" draggable="false"></li>');
    })

    $('btnPhoto').on('tap' , function(){
        navigator.camera.getPicture(function(imageData){
            var  myImg = new Image();
            myImg.src = "data:image/jpeg;base64,"+imageData;
            /*drawZone.width = myImg.width;
             drawZone.height = myImg.height;
             ctx.drawImage(myImg,0,0);
             $('drawZone') */
            myImg.onload = function(){
                ctx.drawImage(myImg,0,0);
            }
        },function(err){

        },{quality :  50,
            destinatinType :  Camera.DestinationType.DATA_URL
        });
    })

    $('btnDel').on('tap' , function(){

    })

}, false);