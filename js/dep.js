/**
 * Created by arenduchintala on 7/10/15.
 */


function deptest() {
    console.log("helo from dep:" + conll.length)

    var conllsplit = []
    var spans = []
    for (var i = 0; i < conll.length; i++) {
        var c = conll[i].split(/\s+/)
        var o = {word: c[1], from: c[6], label: c[7]}
        conllsplit.push(o)
        var previewSpan = spanWrapper(o.word)
        spans.push(previewSpan)
        $('#myholder').append(previewSpan);
    }

    for (var i = 0; i < spans.length; i++) {
        console.log("position of span:" + $(spans[i]).offset().left + " " + $(spans[i]).offset().top)
    }

    for (var i = 0; i < spans.length; i++) {
        console.log("making link form : " + conllsplit[i].from + " to " + (i + 1).toString())
        var fromid = parseInt(conllsplit[i].from) - 1
        if (fromid >= 0) {
            var target_obj = spans[i]
            var source_obj = spans[fromid]
            console.log("position of target span:" + $(target_obj).offset().left + " " + $(target_obj).offset().top)
            console.log("position of source span:" + $(source_obj).offset().left + " " + $(source_obj).offset().top)
            var a = makeArrow(source_obj, target_obj)

            $('#arrowdiv').append(a.arrow)
            $('#arrowdiv').append(a.label)
        }
    }
}


function makeArrow(source_obj, target_obj) {
    $(source_obj).offset().left
    var midpoint = Math.abs($(source_obj).offset().left - $(target_obj).offset().left) / 2
    var uppoint = $(target_obj).offset().top - (midpoint * 1)

    if ($(source_obj).offset().left > $(target_obj).offset().left) {
        midpoint = midpoint * -1
    }

    var p = $(source_obj).width() / 2 + midpoint + $(source_obj).offset().left
    console.log("arrow from : " + source_obj.innerHTML + "  to " + target_obj.innerHTML)
    console.log("source x:" + source_obj.getTopPoint().x + " source y:" + source_obj.getTopPoint().y)
    console.log("midpoint x: " + p + " width:" + $(source_obj).width())
    console.log("uppoint y:" + uppoint)
    console.log("target x:" + target_obj.getTopPoint().x + " target y:" + target_obj.getTopPoint().y)

    var arrow = $('#arrowdiv').curvedArrow({
        p0x: source_obj.getTopPoint().x,
        p0y: source_obj.getTopPoint().y,
        p1x: $(source_obj).width() / 2 + midpoint + $(source_obj).offset().left,
        p1y: uppoint,
        p2x: target_obj.getTopPoint().x,
        p2y: target_obj.getTopPoint().y
    })


    var label = document.createElement("span")
    label.innerHTML = 'label'
    $(label).addClass('my_label')
    var elem = $(label)
    elem.css({
        left: $(source_obj).width() / 2 + midpoint + $(source_obj).offset().left,
        top: uppoint
    })


    return {arrow: arrow, label: label}
}

function spanWrapper(txt) {
    var self = document.createElement("span")
    self.innerHTML = txt
    $(self).addClass("my_word")
    Element.prototype.getX = function () {
        return $(this).offset().left
    }
    Element.prototype.getY = function () {
        return $(this).offset().top
    }
    Element.prototype.getTopPoint = function () {
        var m = $(this).width() / 2
        return {x: $(this).offset().left + m, y: $(this).offset().top}
    }
    return self
}


