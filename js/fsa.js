/**
 * Created by arenduchintala on 7/9/15.
 */

var conll = ['1	Jetzt	jetzt	ADV	ADV	_	2	adv	_	_',
    '2	muss	müssen	V	VMFIN	1|Sg|Pres|Ind	0	root	_	_',
    '3	ich	ich	PRO	PPER	1|Sg|_|Nom	2	subj	_	_',
    '4	euch	ihr	PRO	PPER	2|Pl|_|_	9	obja	_	_',
    '5	aber	aber	ADV	ADV	_	9	adv	_	_',
    '6	wirklich	wirklich	ADV	ADV	_	9	adv	_	_',
    '7	wieder	wieder	ADV	ADV	_	9	adv	_	_',
    '8	einmal	einmal	ADV	ADV	_	9	adv	_	_',
    '9	schreiben	schreiben	V	VVINF	_	2	aux	_	_',
    '10	!	!	$.	$.	_	0	root	_	_']

function start() {

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 1600,
        height: 1000,
        model: graph,
        gridSize: 1,
        interactive: false,
        pointerEvents: false
    });

    var conllsplit = []
    var rects = []
    for (var i = 0; i < conll.length; i++) {
        var c = conll[i].split(/\s+/)
        var o = {word: c[1], from: c[6], label: c[7]}
        conllsplit.push(o)
        var rect = new ShapeWrapper(100 * i, 300, 50, 20, c[1])
        rects.push(rect)
    }

    var links = []
    for (var i = 0; i < conllsplit.length; i++) {
        console.log("making link form : " + conllsplit[i].from + " to " + (i + 1).toString())
        var fromid = parseInt(conllsplit[i].from) - 1
        if (fromid >= 0) {
            var target_obj = rects[i]
            var source_obj = rects[fromid]
            links.push(makelinkObj(source_obj, target_obj, conllsplit[i].label))
        }

    }


    /*var link = makelinkObj(rect, rect2)
     var link2 = makelinkObj(rect2, rect3)*/


    /*graph.addCells([rect, rect2, rect3, link, link2]);*/
    graph.addCells(rects)
    graph.addCells(links)

}

function makelinkObj(source_obj, target_obj, link_lable) {
    var left = (source_obj.getTopPoint().x < target_obj.getTopPoint().x ) ? source_obj.getTopPoint().x : target_obj.getTopPoint().x
    var right = (source_obj.getTopPoint().x > target_obj.getTopPoint().x ) ? source_obj.getTopPoint().x : target_obj.getTopPoint().x
    var gap = right - left
    var midpoint = left + (gap / 2)
    var onethirdpoint = left + (gap / 4)
    var twothirdpoint = left + (gap * 3 / 4)
    var uppoint = target_obj.get('position').y - (gap * 0.15)
    var vert = []
    if (source_obj.get('position').x > target_obj.get('position').x) {
        vert = [{x: twothirdpoint, y: uppoint}, {x: onethirdpoint, y: uppoint}]
    } else {
        vert = [{x: onethirdpoint, y: uppoint}, {x: twothirdpoint, y: uppoint}]
    }
    var _link = new joint.dia.Link({
        source: {x: source_obj.getTopPoint().x, y: source_obj.getTopPoint().y},
        target: {x: target_obj.getTopPoint().x, y: target_obj.getTopPoint().y},
        labels: [{position: .5, attrs: {text: {text: link_lable}}}],
        vertices: vert,
        smooth: true,
        attrs: {}
    });


    _link.attr({
        '.connection': {stroke: 'blue'},
        /*'.marker-source': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },*/
        '.marker-target': {fill: 'blue', d: 'M 10 0 L 0 5 L 10 10 z'},

    });

    _link.on('change:vertices', onChange)
    _link.on('cell:mouseover', onMouseOver)
    return _link
}


function onChange(element) {
    console.log(element.id, ':', element.get('vertices')[0]);
}
function onMouseOver(element) {
    console.log("on mouse over seen from link")
}

function ShapeWrapper(x, y, w, h, txt) {

    var self = new joint.shapes.basic.Rect({
        position: {x: x, y: y},
        size: {width: w, height: h},
        attrs: {rect: {fill: 'blue', 'fill-opacity': 0, 'stroke-width': 0}, text: {text: txt, fill: 'black'}}
    });
    self.getX = function () {
        self.get('position').x
    }
    self.getY = function () {
        self.get('position').y
    }
    self.getTopPoint = function () {
        var m = this.get('size').width / 2
        return {x: this.get('position').x + m, y: this.get('position').y}
    }
    return self


}