(function (window) {
    var documentReference = document, mraid = window.mraid,
        querySelector = function (parentNode, selector) {
            if (!parentNode) {
                parentNode = documentReference
            }
            return parentNode.querySelector(selector)
        },
        setStyle = function (node, styleAttribute, styleValue) {
            node.style[styleAttribute] = styleValue;
        }, showNode = function (node) {
            setStyle(node, DISPLAY, BLOCK);
        }, setTransform = function (node, styleValue) {
            setStyle(node, WEB_KIT_TRANSFORM, styleValue);
        }, getElementById = function (id) {
            return documentReference.getElementById.call(documentReference, id);
        }, createElement = function (tagName) {
            return documentReference.createElement.call(documentReference, tagName);
        }, getInteger = function (value) {
            return parseInt(value, 10);
        }, getFloat = function (value) {
            return parseFloat(value);
        }, getAttribute = function (node, attributeName) {
            return node.getAttribute(attributeName);
        }, getCardIndex = function (node) {
            return getInteger(getAttribute(node, INDEX));
        }, setAttributes = function (node, attributesMap) {
            for (var attribute in attributesMap) {
                node.setAttribute(attribute, attributesMap[attribute]);
            }
        };
    var parent = document.querySelector('#innerContainer');
    var lock = false;
    var cardWidth = 296;
    var currentCardIndex = 0;
    var total = 5;
    var leftDistance = -(cardWidth * currentCardIndex)-6 ;
    var touchIdentifierDistance = 30;
    var counrGeneration = document.querySelector('.countGenerator').children;
    function init(){
        parent.style.webkitTransform = 'translate3d(' + leftDistance + 'px, 0, 0)';
        registerForTouch(parent);
    }
    var linkArr= ['http://store.nike.com/us/en_us/pd/dunk-ultra-modern-shoe/pid-10200745/pgid-10096687','http://store.nike.com/us/en_us/pd/burnout-t-shirt/pid-10203986/pgid-1608117','http://store.nike.com/us/en_us/pd/flyknit-lunar-3-running-shoe/pid-10201852/pgid-10101301','http://store.nike.com/us/en_us/outfit/24091',' http://store.nike.com/us/en_us/pd/nikelab-x-jfs-crop-long-sleeve-training-top/pid-10291445/pgid-10326928']

    function deckOnTouchStart(e, cardObj) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        console.log("start");
        var ele = document.createElement('div');
        ele.id =  'start';
        document.body.appendChild(ele);
        return;
//            e.preventDefault();
        if (lock) {
            return;
        }
        lock = false;
        touchobj = e.changedTouches[0];
        cardObj.clientY = getInteger(touchobj.clientY);
        cardObj.clientX = getInteger(touchobj.clientX);
    };

    function deckOnTouchMove(e, cardObj) {
//            e.preventDefault();
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        touchobj = e.changedTouches[0];
        var distH = getInteger(touchobj.clientX) - cardObj.clientX;
        if(lock){
            return;
        }

        if (distH > touchIdentifierDistance) {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            lock = true;
            if(currentCardIndex >0){
                counrGeneration[currentCardIndex].classList.remove('redRound');
                counrGeneration[currentCardIndex].classList.add('blackRound');
                currentCardIndex--;
                leftDistance = leftDistance + cardWidth;
                parent.style.webkitTransform = 'translate3d(' + leftDistance + 'px, 0, 0)';
                counrGeneration[currentCardIndex].classList.remove('blackRound');
                counrGeneration[currentCardIndex].classList.add('redRound');


                return;

            }


        }
        else if (distH < -touchIdentifierDistance) {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            lock = true;
            if(currentCardIndex < total-1){
                counrGeneration[currentCardIndex].classList.remove('redRound');
                counrGeneration[currentCardIndex].classList.add('blackRound');
                currentCardIndex++;
                leftDistance = leftDistance - cardWidth;
                parent.style.webkitTransform = 'translate3d(' + leftDistance + 'px, 0, 0)';
                counrGeneration[currentCardIndex].classList.remove('blackRound');
                counrGeneration[currentCardIndex].classList.add('redRound');
                return;
            }

        }
    };
    function deckOnTouchEnd(e, cardObj) {

        console.log(cardObj);
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        var touchendobj = e.changedTouches[0];
        var xDelta = Math.abs(touchendobj.clientY - cardObj.clientY);
        var yDelta = Math.abs(touchendobj.clientX - cardObj.clientX);
        if((xDelta <= 10 && yDelta <= 10)){
            if(e.target.classList.contains('meep')){
                var parent = e.target.parentElement;
                var meep = parent.querySelector('.meep');
                var unmeep = parent.querySelector('.umMeeped');
                meep.classList.add('hideMeep');
                unmeep.classList.add('showMeeped');
                unmeep.classList.remove('hideMeeped');
                return;
            }
            if(e.target.classList.contains('umMeeped')){
                var parent = e.target.parentElement;
                var meep = parent.querySelector('.meep');
                var unmeep = parent.querySelector('.umMeeped');
                meep.classList.remove('hideMeep');
                unmeep.classList.remove('showMeeped');
                unmeep.classList.add('hideMeeped');
                return;
            }
            if(e.target.classList.contains('whatsapp')){
                var productUrl = 'imsdk://share?image='+linkArr[currentCardIndex];
                var theLink = document.createElement('a');
                theLink.setAttribute('href',productUrl);
                theLink.setAttribute('target','_blank');
                var dispatch = document.createEvent("HTMLEvents");
                dispatch.initEvent("click", true, true);
                theLink.dispatchEvent(dispatch);
                return;
            }
            if(e.target.classList.contains('shareIcon')){
                var element = e.target.parentElement;
                var shareContainer = element.querySelector('.shareContainer');
                shareContainer.classList.toggle('hideCont');
                return;
            }
            var productUrl = 'imsdk://open?image='+linkArr[currentCardIndex];
            var theLink = document.createElement('a');
            theLink.setAttribute('href',productUrl);
            theLink.setAttribute('target','_blank');
            var dispatch = document.createEvent("HTMLEvents");
            dispatch.initEvent("click", true, true);
            theLink.dispatchEvent(dispatch);
            return;
        }
        lock = false;

    }
    function registerForTouch(card) {
        card.onmousedown = function(){
            alert('called');
            var ele = document.createElement('div');
            ele.id =  'hello';
            document.body.appendChild(ele);
        };
//        setAttributes(card, {
//            ontouchstart: 'deckOnTouchStart(event,this)',
//            ontouchend: 'deckOnTouchEnd(event,this)',
//            ontouchmove: 'deckOnTouchMove(event,this)'
//        })
    };
    init();
//    window.deckOnTouchStart = deckOnTouchStart;
//    window.deckOnTouchMove = deckOnTouchMove;
//    window.deckOnTouchEnd = deckOnTouchEnd;
}(window));
//
//var element = document.querySelector('#innerContainer');
//element.onmousedown = function(){
//    var ele = document.createElement('div');
//    ele.id =  'start';
//    document.body.appendChild(ele);
//}