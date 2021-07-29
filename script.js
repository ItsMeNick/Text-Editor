
var colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];
var forePalette = $('.fore-palette');
var backPalette = $('.back-palette');

for (var i = 0; i < colorPalette.length; i++) {
  forePalette.append('<a href="#" data-command="forecolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
  backPalette.append('<a href="#" data-command="backcolor" data-value="' + '#' + colorPalette[i] + '" style="background-color:' + '#' + colorPalette[i] + ';" class="palette-item"></a>');
}

$('.toolbar a').click(function(e) {
  var command = $(this).data('command');
  if (command == 'h1' || command == 'h2' || command == 'p') {
    document.execCommand('formatBlock', false, command);
  }
  else if (command == 'forecolor' || command == 'backcolor') {
    document.execCommand($(this).data('command'), false, $(this).data('value'));
  }
  else if (command == 'createlink' || command == 'insertimage') {
    url = prompt('Enter the link here: ','http:\/\/');
    if(url === null || url.length == 0) return ;
    document.execCommand($(this).data('command'), false, url);
  }
  else if (command == 'insertgif') {
    let actualHTML = $('#editor').html();
    let replacedHTML = actualHTML.replace(/\{\{(.*?)\}\}/gi, function(x) {
      x = x.substring(2, x.length-2);
      return getGIFUrl(x);
    });
  }
  else document.execCommand($(this).data('command'), false, null);
});

function getGIFUrl(meme_key){
  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+meme_key+"&api_key=LjmWwxgivgcR88LqtYFSvPc5qWJ7u24P&limit=1");
  var url = null;
  var obj = xhr.done(function(data) {
     url = data.data[0].images.downsized_medium.url;
     img_obj = getImageElement(url);
     key = '{{'+meme_key+'}}';
     current = $('#editor').html().replace(new RegExp(key, "g"), img_obj);
     $('#editor').html(current);
    });
}

function getImageElement(url) {
  return ' <img src='+url+'> </img> ';
}

