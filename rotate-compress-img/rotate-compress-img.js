/**
 * 旋转并等比例压缩
 * @param img
 * @param canvas
 * @param orientation 引入exif.js，可以通过 orientation = EXIF.getTag(this, 'Orientation'); 获得，或者相似方法获得
 * @param maxWidth
 * @param maxHeight
 */
function rotateByOrientationAndCompressImg(img, canvas, orientation, maxWidth, maxHeight) {
    switch (orientation) {
        case 3:
            rotateByDegreeAndCompressImg(img, canvas, 180, maxWidth, maxHeight);
            break;
        case 6:
            rotateByDegreeAndCompressImg(img, canvas, 90, maxWidth, maxHeight);
            break;
        case 8:
            rotateByDegreeAndCompressImg(img, canvas, 270, maxWidth, maxHeight);
            break;
        default:
            rotateByDegreeAndCompressImg(img, canvas, 0, maxWidth, maxHeight);
    }
}

/**
 * 旋转并等比例压缩
 * @param img 是 new Image() 类型
 * @param canvas 画布
 * @param degree 顺时针旋转的度数，单位是°，允许为 0（不旋转），90，180，270 共4种值
 * @param maxWidth 压缩后最大宽度，为null则不压缩
 * @param maxHeight 压缩后最大高度，为null则不压缩
 */
function rotateByDegreeAndCompressImg(img, canvas, degree, maxWidth, maxHeight) {
    var ctx = canvas.getContext('2d');
    /* 原来的宽和高 */
    var width = img.width;
    var height = img.height;
    /* 压缩后的宽和高 */
    var cWidth = width;
    var cHeight = height;
    if (maxWidth != null) {
        if (cWidth > maxWidth) {
            cHeight = parseInt(cHeight * maxWidth / cWidth);
            cWidth = maxWidth;
        }
    }
    if (maxHeight != null) {
        if (cHeight > maxHeight) {
            cWidth = parseInt(cWidth * maxHeight / cHeight);
            cHeight = maxHeight;
        }
    }
    switch (degree) {
        default:
        case 0:
            canvas.width = cWidth;
            canvas.height = cHeight;
            ctx.drawImage(img, 0, 0, cWidth, cHeight);
            break;
        case 90:
            canvas.width = cHeight;
            canvas.height = cWidth;
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(img, 0, -cHeight, cWidth, cHeight);
            break;
        case 180:
            canvas.width = cWidth;
            canvas.height = cHeight;
            ctx.rotate(180 * Math.PI / 180);
            ctx.drawImage(img, -cWidth, -cHeight, cWidth, cHeight);
            break;
        case 270:
            canvas.width = cHeight;
            canvas.height = cWidth;
            ctx.rotate(270 * Math.PI / 180);
            ctx.drawImage(img, -cWidth, 0, cWidth, cHeight);
            break;
    }
}
