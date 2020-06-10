const BLUE_UMBRELLA_IMAGE_PATH = 'img/Blue_umbrella.png';
const PINK_UMBRELLA_IMAGE_PATH = 'img/Pink_umbrella.png';
const YELLOW_UMBRELLA_IMAGE_PATH = 'img/Yello_umbrella.png';
const LOADER_ICON_PATH = 'img/loader_icon.svg';
const UPLOAD_ICON_PATH = 'img/upload_icon.svg';
const IMAGE_SELECTOR = $('.dynamic-image');
const BODY_SELECTOR = $('body');
const LOGO = $('.logo');
const MAX_FILE_UPLOAD_SIZE = 5*1024*1024;

/**
 * input => image object (this)
 * @param input
 */
function uploadImage(input) {
  const label = $('[data-js-label]');
  if (input.files && input.files[0]) {
    console.log(input.files[0]);
    if (input.files[0].size < MAX_FILE_UPLOAD_SIZE) {
      if (input.files[0].type === 'image/jpeg' || input.files[0].type === 'image/png') {
        label.text(input.files[0].name)
        var reader = new FileReader();
        reader.onload = function (e) {
          // Show logo if all conditions are true
          LOGO.show();
          $('.logo').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
      } else {
        alert('We only support JPF/PNG images');
      }
    } else {
      alert('File size should be less than 5 MB')
    }
  }
}

/**
 * @param backgroundColor (hex value)
 * @param ImagePath
 */
function updateImageAndBackground(backgroundColor, ImagePath) {
  BODY_SELECTOR.css("background-color", backgroundColor);
  IMAGE_SELECTOR.attr('src', LOADER_ICON_PATH);
  IMAGE_SELECTOR.addClass('loader');
  const LOADER = $('.loader');
  LOADER.css('background-color', backgroundColor)
  LOGO.hide();
  setTimeout(function () {
    IMAGE_SELECTOR.removeClass('loader');
    IMAGE_SELECTOR.attr('src', ImagePath);
    if (LOGO.attr('src')) {
      LOGO.show();
    }
  }, 2000)
}

/**
 * Our Application Main logic (end to end)
 */
$(document).ready(function () {
  LOGO.hide();
  $('.btn').click(function () {
    var classes  = $(this).attr('class').split(' ');
    var colorClass = classes[2].toLocaleLowerCase();
    switch (colorClass) {
      case 'blue':
        updateImageAndBackground("#c1f0f5", BLUE_UMBRELLA_IMAGE_PATH)
        break;
      case 'pink':
        updateImageAndBackground("#fedeff", PINK_UMBRELLA_IMAGE_PATH)
        break;
      case 'yellow':
        updateImageAndBackground("#fffede", YELLOW_UMBRELLA_IMAGE_PATH)
        break;
    }
  })

  /**
   * If select logo images
   */
  $('input[type=file]').change(function () {
    uploadImage(this);
  });
})
