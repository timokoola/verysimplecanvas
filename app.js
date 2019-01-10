(function() {
  const image_location = "canvas.jpg";
  let state = {};

  let isNil = item => {
    return item == null;
  };

  let drawImage = () => {
    let canvas = document.getElementById("docCanvas");
    let drawCanvas = document.getElementById("drawCanvas");
    let context = !isNil(canvas) ? canvas.getContext("2d") : null;
    let drawContext = !isNil(drawCanvas) ? drawCanvas.getContext("2d") : null;
    if (isNil(context) || isNil(drawContext)) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawContext.clearRect(0, 0, drawContext.width, drawContext.height);
    fix_dpi(canvas);
    fix_dpi(drawCanvas);

    let image = new Image();
    image.alt = "Blue canvas";
    image.onload = ev => {
      let dx = canvas.width / 2 - image.width / 2;
      let dy = canvas.height / 2 - image.height / 2;
      console.log(dx);
      console.log(dy);

      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        dx,
        dy,
        image.width,
        image.height
      );
    };
    image.src = image_location;
  };

  let fix_dpi = canvas => {
    let dpi = window.devicePixelRatio;
    let style = {
      height() {
        return +getComputedStyle(canvas)
          .getPropertyValue("height")
          .slice(0, -2);
      },
      width() {
        return +getComputedStyle(canvas)
          .getPropertyValue("width")
          .slice(0, -2);
      }
    };
    canvas.setAttribute("width", (style.width() * dpi).toString());
    canvas.setAttribute("height", (style.height() * dpi).toString());
  };

  let draw = () => {
    drawImage();
  };

  window.onload = draw;
})();
