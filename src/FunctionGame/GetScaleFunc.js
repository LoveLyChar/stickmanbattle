/*
 * return:
 *      scalePrimary
 *      scaleX,
 *      scaleY
*/
export default function (widthNow, heightNow, oldWidth, oldHeight) {  
    var scaleX = widthNow / oldWidth;
    var scaleY = heightNow / oldHeight;
    var scalePrimary;

    if (widthNow == oldHeight || heightNow == oldWidth) {
        scalePrimary = 1;
    }
    var beforeWidth, afterWidth;
    if (oldWidth > oldHeight) {
        beforeWidth = oldHeight;
    } else {
        beforeWidth = oldWidth;
    }
    if (widthNow > heightNow) {
        afterWidth = heightNow;
    } else {
        afterWidth = widthNow;
    }
    scalePrimary = afterWidth / beforeWidth;
    var obj = {
        scalePrimary: scalePrimary,
        scaleX: scaleX,
        scaleY: scaleY
    }
    return obj;
};