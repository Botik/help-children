$(document).ready(function(){
    if ($(window).width() > 768) {
        var animFlag = false;
        
        var $window = $(window);
        var scrollTop = $window.scrollTop();
        // const diagonalGroup = $("#Layer_1-2");
        var lastScrollTop = 0;
        var scrollDir;
        
        var obj1 = {value:83000},
            element1 = document.getElementById('animnumber');
        var obj2 = {value:30},
        element2 = document.getElementById('animdays');
        var obj3 = {value:23},
        element3 = document.getElementById('animhours');
        var obj4 = {value:59},
        element4 = document.getElementById('animmin');
        var obj5 = {value:59},
        element5 = document.getElementById('animsec');
        var obj6 = {value:10};
        var obj7 = {value:8};
        var obj8= {value:83000},
            element8 = document.getElementById('animnumber');
        var obj8= {value:83000},
            element8 = document.getElementById('animnumber');
        var obj9= {value:83000},
            element9 = document.getElementById('animnumber');
        var obj10= {value:83000},
            element10 = document.getElementById('animnumber');
        var obj11= {value:83000},
            element11 = document.getElementById('animnumber');
            

        // var tl = new TimelineMax();
        // tl.addLabel('firstStage')
        // .to('.fixed-animation-block .right-half .empty-cart.first',{
        //     y:'55rem',
        //     opacity:0,
        //     duration: 1.5
        // },'firstStage')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.second img, .fixed-animation-block .right-half .empty-cart.second .cart-text',{
        //     opacity:0,
        // },{
        //     opacity:1,
        //     duration:1.5
        // },'firstStage+=1.5')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.second',{x:'-30px',y:'-30px'},{x:'0',y:'0',duration:0.5},'firstStage+=3')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.third',{x:'-60px',y:'-60px'},{x:'-30px',y:'-30px',opacity:1,duration:0.5},'firstStage+=3.1')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.fourth',{x:'-90px',y:'-90px'},{x:'-60px',y:'-60px',opacity:0.78,duration:0.5},'firstStage+=3.2')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.fiveth',{opacity:0},{opacity:0.7,duration:0.5},'firstStage+=3.3')
        // .call(function(){
        //     if (st.progress.toFixed(3)<=0.08) {
        //         tl.tweenFromTo('firstStage','thirdStage');
        //     } 
        // })

        // .addLabel('thirdStage')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.second',{rotationY:'0'},{rotationY:'90deg',duration:0.5},'thirdStage')
        // .call(function(){
        //     $('.fixed-animation-block .right-half .empty-cart.with-cont').addClass('show');
        // })
        // .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont',{rotationY:'270deg'},{rotateY:'360deg',duration:0.5},'thirdStage+=0.5')
        // .addLabel('fivethStage')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont .img-block',{height:'44rem'},{height:'30rem',duration:1},'fivethStage+=4')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont .kid-name',{fontSize:'2rem'},{fontSize:'1.8rem',duration:1},'fivethStage+=4')
        // .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont .diagnos',{fontSize:'1.4rem'},{fontSize:'1.2rem',duration:1},'fivethStage+=4')
        // .fromTo('.empty-cart.with-cont .needed-block',{opacity:0},{opacity:1,duration:0.5},'fivethStage+=4.5')
        // .call(function(){
        //     if (st2.direction == 1) {
        //         $('.empty-cart.with-cont .progress-list .progress-bar.bar1').addClass('animated');
        //     } else {
        //         $('.empty-cart.with-cont .progress-list .progress-bar.bar1').removeClass('animated');
        //     }
        // })
        // .fromTo('.empty-cart.with-cont .progress-list',{opacity:0},{opacity:1,duration:0.5},'fivethStage+=5')
        // .fromTo('.empty-cart.with-cont .amount-block',{opacity:0},{opacity:1,duration:0.5},'fivethStage+=5')
        // .fromTo('.empty-cart.with-cont .want-help-button',{opacity:0},{opacity:1,duration:0.01},'fivethStage+=5.5')
        // .fromTo('.empty-cart.with-cont .want-help-button',{scale:1},{scale:0.8,duration:0.2},'fivethStage+=5.5')
        // .fromTo('.empty-cart.with-cont .want-help-button',{scale:0.8},{scale:1,duration:0.2},'fivethStage+=5.7')

        // .addLabel('sixStage')
        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'sixStage+=1.5')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=0.5')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'sixStage+=2')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=1')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'sixStage+=2.5')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=1.5')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'sixStage+=3')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=2')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'sixStage+=3.5')
        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=2.5')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'sixStage+=4')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=3')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'sixStage+=4.5')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=3.5')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'sixStage+=5')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=4')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'sixStage+=5.5')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=4.5')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'sixStage+=6')

        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=5')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'sixStage+=6.5')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=5.5')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'sixStage+=7')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=6')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'sixStage+=7.5')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=6.5')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'sixStage+=8')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=7')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'sixStage+=8.5')
        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=7.5')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'sixStage+=9')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=8')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'sixStage+=9.5')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=8.5')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'sixStage+=10')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=9')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'sixStage+=10.5')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=9.5')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'sixStage+=11')

        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=10')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'sixStage+=11.5')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=10.5')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'sixStage+=12')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=11')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'sixStage+=12.5')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=11.5')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'sixStage+=13')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=12')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'sixStage+=13.5')
        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=12.5')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'sixStage+=14')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=13')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'sixStage+=14.5')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=13.5')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'sixStage+=15')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=14')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'sixStage+=15.5')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=14.5')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'sixStage+=16')

        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=15')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'sixStage+=16.5')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=15.5')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'sixStage+=17')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=16')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'sixStage+=17.5')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'sixStage+=16.5')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'sixStage+=18')

        // .to('.empty-cart.with-cont .progress-bar.bar1 .progress-bar-done',{width:'100%',duration:18},'sixStage')
        // .to(obj1,18,{
        //     value:0, 
        //     onUpdate:function() {
        //     element1.innerHTML = Math.round(obj1.value).toLocaleString('ru');
        //     }
        // },'sixStage')
        // .to(obj2,8,{
        // value:10, 
        // onUpdate:function() {
        //     element2.innerHTML = Math.round(obj2.value).toLocaleString('ru');
        // }
        // },'sixStage+=10')
        // .to(obj3,4,{
        //     value:0, 
        //     onUpdate:function() {
        //     element3.innerHTML = Math.round(obj3.value).toLocaleString('ru');
        //     },
        //     repeat:1
        // },'sixStage+=10')

        // .to(obj4,2,{
        //     value:0,
        //     repeat:3, 
        //     onUpdate:function() {
        //     element4.innerHTML = Math.round(obj4.value).toLocaleString('ru');
        //     }
        // },'sixStage+=10')
        // .to(obj5,2,{
        //     value:0,
        //     repeat:3, 
        //     onUpdate:function() {
        //     element5.innerHTML = Math.round(obj5.value).toLocaleString('ru');
        //     }
        // },'sixStage+=10')
        // .to('.empty-cart.with-cont .amount-block .text',{opacity:0, display:"none",duration:0})
        // .to('.empty-cart.with-cont .amount-block .amount-sum',{opacity:0, display:"none",duration:0})
        // .to('.empty-cart.with-cont .amount-block .text2',{opacity:1, display:"flex",duration:0})
        // .to('.empty-cart.with-cont .want-help-button',{opacity:0, display:"none",duration:0})
        // .to('.empty-cart.with-cont .want-help-button.gray',{opacity:1, display:"block",duration:0})
        // .to('.empty-cart.with-cont .want-help-button.gray',{opacity:1, display:"block",duration:0})
        // .to(obj6,5,{
        //     value:1, 
        //     onUpdate:function() {
        //         element2.innerHTML = Math.round(obj6.value).toLocaleString('ru');
        //     }
        // },'sixStage+=18.5')
        // .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block .title',{opacity:0,display:'none',duration:0})
        // .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block .days',{opacity:0,display:'none',duration:0})
        // .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block .time',{opacity:0,display:'none',duration:0})
        // .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block .reabGone',{opacity:1,display:'flex',duration:0})

        // .to('.fixed-animation-block .right-half .empty-cart.with-cont .kid-img1',{opacity:0,duration:0.5})
        // .to('.fixed-animation-block .right-half .empty-cart.with-cont .kid-img2',{opacity:1,duration:0.5})

        // .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block',{opacity:0,duration:0.5})

        // .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont',{rotationY:'0'},{rotationY:'90deg',duration:0.5})
        // .to('.fixed-animation-block .right-half .empty-cart.reab-result',{opacity:1,duration:0})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result',{rotationY:'270deg'},{rotateY:'360deg',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .title',{opacity:'0'},{opacity:'1',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .img-block',{opacity:'0'},{opacity:'1',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .result-list .item:nth-child(1)',{opacity:'0'},{opacity:'1',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .result-list .item:nth-child(2)',{opacity:'0'},{opacity:'1',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .result-list .item:nth-child(3)',{opacity:'0'},{opacity:'1',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .result-list .item:nth-child(4)',{opacity:'0'},{opacity:'1',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .pechat',{opacity:'0'},{opacity:'1',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result',{rotationY:'360deg'},{rotateY:'270deg',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result',{opacity:'1'},{opacity:'0',duration:0})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont',{rotationY:'90deg'},{rotationY:'0',duration:0.5})

        // .to('.empty-cart.with-cont .amount-block .text',{opacity:1, display:"flex",duration:0})
        // .to('.empty-cart.with-cont .amount-block .amount-sum',{opacity:1, display:"block",duration:0})
        // .to('.empty-cart.with-cont .amount-block .text2',{opacity:0, display:"none",duration:0})
        // .to('.empty-cart.with-cont .progress-bar.bar2 ',{display:'block', opacity:'1',duration:0.5})

        // .to(obj8,2,{
        //     value:0, 
        //     onUpdate:function() {
        //     element8.innerHTML = Math.round(obj8.value).toLocaleString('ru');
        //     }
        // })
        // .to('.empty-cart.with-cont .progress-bar.bar2 .progress-bar-done ',{width:'100%',duration:2},'-=2')
        // .to('.empty-cart.with-cont .progress-bar.bar3 ',{display:'block', opacity:'1',duration:0.5})
        // .to(obj9,2,{
        //     value:0, 
        //     onUpdate:function() {
        //     element9.innerHTML = Math.round(obj9.value).toLocaleString('ru');
        //     }
        // })
        // .to('.empty-cart.with-cont .progress-bar.bar3 .progress-bar-done ',{width:'100%',duration:2},'-=2')
        // .to('.empty-cart.with-cont .progress-bar.bar4 ',{display:'block', opacity:'1',duration:0.5})
        // .to(obj10,2,{
        //     value:0, 
        //     onUpdate:function() {
        //     element10.innerHTML = Math.round(obj10.value).toLocaleString('ru');
        //     }
        // })
        // .to('.empty-cart.with-cont .progress-bar.bar4 .progress-bar-done ',{width:'100%',duration:2},'-=2')
        // .to('.empty-cart.with-cont .progress-bar.bar5 ',{display:'block', opacity:'1',duration:0.5})
        // .to(obj11,2,{
        //     value:0, 
        //     onUpdate:function() {
        //     element11.innerHTML = Math.round(obj11.value).toLocaleString('ru');
        //     }
        // })
        // .to('.empty-cart.with-cont .progress-bar.bar5 .progress-bar-done ',{width:'100%',duration:2},'-=2')
        // .to('.empty-cart.with-cont .level',{opacity:0,duration:0})
        // .to('.empty-cart.with-cont .GMFCS',{background:'#ffffff',fontWeight:'bold',boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.07)',position:'absolute',duration:0})
        // .to('.empty-cart.with-cont .GMFCS',{padding:'1rem 4.59rem',
        // borderRadius: '30px',translateX:'1rem',translateY:'-5rem',scale:'1.5',width:'24rem',duration:1})

        // .to('.empty-cart.with-cont .GMFCS .arrow-img',{display:'inline-block',duration:0})
        // .to('.empty-cart.with-cont .GMFCS .txt2',{display:'inline-block',duration:0})

        // .to('.empty-cart.with-cont .GMFCS .arrow-img',{opacity:1,duration:0.5})
        // .to('.empty-cart.with-cont .GMFCS .txt2',{opacity:1,duration:0.5})
        
        // .to('.empty-cart.with-cont .GMFCS',{textAlign:'right',duration:0})
        // .to('.empty-cart.with-cont .GMFCS .txt1',{opacity:0,duration:0.5})
        // .to('.empty-cart.with-cont .GMFCS .arrow-img',{opacity:0,duration:0.5})
        // .to('.empty-cart.with-cont .GMFCS .arrow-img',{display:'none',duration:0})
        // .to('.empty-cart.with-cont .GMFCS .txt1',{display:'none',duration:0})
        // .to('.empty-cart.with-cont .GMFCS',{width:'auto',translateX:'12.5rem'})
        // .to('.empty-cart.with-cont .GMFCS',{textAlign:'left',duration:0})
        // .to('.empty-cart.with-cont .GMFCS',{padding:'0 0',translateX:'0',translateY:'0',scale:'1',fontWeight:'normal',boxShadow: 'none',duration:1})
        // .to('.empty-cart.with-cont .GMFCS',{position:'relative',duration:0})
        // .to('.empty-cart.with-cont .level',{opacity:1,duration:0})

        
        
        // .addLabel('seventhStage')
        // ;

        // var tl2 = new TimelineMax();
        // tl2.pause();

        // tl2.addLabel('secondStage')
        // .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(1) .text',{width:'44px'},{width:'auto',duration:1},'secondStage')
        // .to('.fixed-animation-block .left-half .list .list_item:nth-child(1) .romb',{right:'-15px',duration:1},'secondStage')
        // .fromTo('.fixed-animation-block .list_item:first-child .points',{opacity:1},{opacity:0,duration:0.5},'secondStage+=0.5')
        // .to('.fixed-animation-block .list_item:first-child',{background:'#FF9E00',duration:1},'secondStage+=1')
        // .to('.fixed-animation-block .left-half .list .list_item:nth-child(1) .romb',{background:'#FF9E00',duration:1},'secondStage+=1')
        // .fromTo('.fixed-animation-block .list_item:first-child .text',{opacity:0},{opacity:1,duration:1},'secondStage+=1')
        // .fromTo('.fixed-animation-block .list_item:first-child .subinfo',{opacity:0},{opacity:1,duration:0.5},'secondStage+=2')

        // .addLabel('fourthStage')
        // .to('.fixed-animation-block .list_item:first-child .subinfo',{opacity:0,duration:1},'fourthStage')
        // .to('.fixed-animation-block .list_item:nth-child(1)',{background:'#FCFAF5',duration:1},'fourthStage')
        // .to('.fixed-animation-block .list_item:nth-child(1) .romb',{background:'#FCFAF5',duration:1},'fourthStage')
        // .to('.fixed-animation-block .list_item:nth-child(1) .text',{color:'#000000',duration:1},'fourthStage')
        // .fromTo('.fixed-animation-block .list_item:nth-child(2)',{opacity:0},{opacity:1,duration:0.5},'fourthStage+=1')
        // .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(2) .text',{width:0},{width:'auto',duration:1},'fourthStage+=1.5')
        // .to('.fixed-animation-block .left-half .list .list_item:nth-child(2) .romb',{right:'-15px',duration:1},'fourthStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(2)',{background:'#FF9E00',duration:1},'fourthStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(2) .romb',{background:'#FF9E00',duration:1},'fourthStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(2) .text',{opacity:1,duration:0.5},'fourthStage+=2.5')
        // .to('.fixed-animation-block .list_item:nth-child(2) .subinfo',{opacity:1,duration:0.5},'fourthStage+=3.5')

        // .addLabel('fivethStage')
        // .to('.fixed-animation-block .list_item:nth-child(2) .subinfo',{opacity:0,duration:1},'fivethStage')
        // .to('.fixed-animation-block .list_item:nth-child(2)',{background:'#FCFAF5',duration:1},'fivethStage')
        // .to('.fixed-animation-block .list_item:nth-child(2) .romb',{background:'#FCFAF5',duration:1},'fivethStage')
        // .to('.fixed-animation-block .list_item:nth-child(2) .text',{color:'#000000',duration:1},'fivethStage')
        // .fromTo('.fixed-animation-block .list_item:nth-child(3)',{opacity:0},{opacity:1,duration:1},'fivethStage+=1')
        // .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(3) .text',{width:0},{width:'auto',duration:1},'fivethStage+=1.5')
        // .to('.fixed-animation-block .left-half .list .list_item:nth-child(3) .romb',{right:'-15px',duration:1},'fivethStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(3)',{background:'#FF9E00',duration:1},'fivethStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(3) .romb',{background:'#FF9E00',duration:1},'fivethStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(3) .text',{opacity:1,duration:0.5},'fivethStage+=2.5')
        // .to('.fixed-animation-block .list_item:nth-child(3) .subinfo',{opacity:1,duration:0.5},'fivethStage+=8.5')

        // .addLabel('sixStage')
        // .to('.fixed-animation-block .list_item:nth-child(3) .subinfo',{opacity:0,duration:1},'sixStage')
        // .to('.fixed-animation-block .list_item:nth-child(3)',{background:'#FCFAF5',duration:1},'sixStage')
        // .to('.fixed-animation-block .list_item:nth-child(3) .romb',{background:'#FCFAF5',duration:1},'sixStage')
        // .to('.fixed-animation-block .list_item:nth-child(3) .text',{color:'#000000',duration:1},'sixStage')
        // .to('.fixed-animation-block .list_item:nth-child(3) .subinfo2',{opacity:0,duration:0.5},'sixStage')
        // .fromTo('.fixed-animation-block .list_item:nth-child(4)',{opacity:0},{opacity:1,duration:1},'sixStage+=1')
        // .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(4) .text',{width:0},{width:'auto',duration:1},'sixStage+=1.5')
        // .to('.fixed-animation-block .left-half .list .list_item:nth-child(4) .romb',{right:'-15px',duration:1},'sixStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(4)',{background:'#FF9E00',duration:1},'sixStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(4) .romb',{background:'#FF9E00',duration:1},'sixStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(4) .text',{opacity:1,duration:0.5},'sixStage+=2.5')
        // .to('.fixed-animation-block .list_item:nth-child(4) .subinfo',{opacity:1,duration:0.5},'sixStage+=8.5')
        // .addLabel('seventhStage')
        // .to('.fixed-animation-block .list_item:nth-child(4) .subinfo',{opacity:0,duration:1},'seventhStage')
        // .to('.fixed-animation-block .list_item:nth-child(4)',{background:'#FCFAF5',duration:1},'seventhStage')
        // .to('.fixed-animation-block .list_item:nth-child(4) .romb',{background:'#FCFAF5',duration:1},'seventhStage')
        // .to('.fixed-animation-block .list_item:nth-child(4) .text',{color:'#000000',duration:1},'seventhStage')
        // .to('.fixed-animation-block .list_item:nth-child(4) .subinfo2',{opacity:0,duration:0.5},'seventhStage')
        // .fromTo('.fixed-animation-block .list_item:nth-child(5)',{opacity:0},{opacity:1,duration:1},'seventhStage+=1')
        // .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(5) .text',{width:0},{width:'auto',duration:1},'seventhStage+=1.5')
        // .to('.fixed-animation-block .left-half .list .list_item:nth-child(5) .romb',{right:'-15px',duration:1},'seventhStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(5)',{background:'#FF9E00',duration:1},'seventhStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(5) .romb',{background:'#FF9E00',duration:1},'seventhStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(5) .text',{opacity:1,duration:0.5},'seventhStage+=2.5')
        // .to('.fixed-animation-block .list_item:nth-child(5) .subinfo',{opacity:1,duration:0.5},'seventhStage+=8.5')

        // .addLabel('eightStage')
        // .to('.fixed-animation-block .list_item:nth-child(5) .subinfo',{opacity:0,duration:1},'eightStage')
        // .to('.fixed-animation-block .list_item:nth-child(5)',{background:'#FCFAF5',duration:1},'eightStage')
        // .to('.fixed-animation-block .list_item:nth-child(5) .romb',{background:'#FCFAF5',duration:1},'eightStage')
        // .to('.fixed-animation-block .list_item:nth-child(5) .text',{color:'#000000',duration:1},'eightStage')
        // .to('.fixed-animation-block .list_item:nth-child(5) .subinfo2',{opacity:0,duration:0.5},'eightStage')
        // .fromTo('.fixed-animation-block .list_item:nth-child(6)',{opacity:0},{opacity:1,duration:1},'eightStage+=1')
        // .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(6) .text',{width:0},{width:'auto',duration:1},'eightStage+=1.5')
        // .to('.fixed-animation-block .left-half .list .list_item:nth-child(6) .romb',{right:'-15px',duration:1},'eightStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(6)',{background:'#FF9E00',duration:1},'eightStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(6) .romb',{background:'#FF9E00',duration:1},'eightStage+=1.5')
        // .to('.fixed-animation-block .list_item:nth-child(6) .text',{opacity:1,duration:0.5},'eightStage+=2.5')
        // .to('.fixed-animation-block .list_item:nth-child(6) .subinfo',{opacity:1,duration:0.5},'eightStage+=8.5')

        // .addLabel('nineStage')
        // ;

        var tl3 = new TimelineMax();

        // Первый пункт
        tl3.addLabel('stage1')
        .fromTo('.fixed-animation-block .right-half .empty-cart.first',
        {
            y:'0',
            opacity:1
        },
        {
            y:'55rem',
            opacity:0,
            duration: 1.5
        },'stage1')
        .fromTo('.fixed-animation-block .right-half .empty-cart.second img, .fixed-animation-block .right-half .empty-cart.second .cart-text',{
            opacity:0,
        },{
            opacity:1,
            duration:1.5
        },'stage1+=1.5')
        .fromTo('.fixed-animation-block .right-half .empty-cart.second',{x:'-30px',y:'-30px'},{x:'0',y:'0',duration:0.5},'stage1+=3')
        .fromTo('.fixed-animation-block .right-half .empty-cart.third',{x:'-60px',y:'-60px'},{x:'-30px',y:'-30px',opacity:1,duration:0.5},'stage1+=3.1')
        .fromTo('.fixed-animation-block .right-half .empty-cart.fourth',{x:'-90px',y:'-90px'},{x:'-60px',y:'-60px',opacity:0.78,duration:0.5},'stage1+=3.2')
        .fromTo('.fixed-animation-block .right-half .empty-cart.fiveth',{opacity:0},{opacity:0.7,duration:0.5},'stage1+=3.3')

        .to('.fixed-animation-block .right-half .empty-cart.second',{x:'-30px',y:'-30px', opacity:1, duration:0},'stage1+=3.8')
        .to('.fixed-animation-block .right-half .empty-cart.third',{x:'-60px',y:'-60px', opacity:0.78, duration:0},'stage1+=3.8')
        .to('.fixed-animation-block .right-half .empty-cart.fourth',{x:'-90px',y:'-90px',opacity:0.7, duration:0},'stage1+=3.8')
        .to('.fixed-animation-block .right-half .empty-cart.fiveth',{opacity:0, duration:0},'stage1+=3.8')

        .to('.fixed-animation-block .right-half .empty-cart.second img, .fixed-animation-block .right-half .empty-cart.second .cart-text',{
            opacity:0,
            duration:0,
        },'stage1+=3.8')

        .fromTo('.fixed-animation-block .right-half .empty-cart.first',{y:'0',opacity:1},{y:'55rem',opacity:0,duration: 1.5},'stage1+=3.8')
        .fromTo('.fixed-animation-block .right-half .empty-cart.second img, .fixed-animation-block .right-half .empty-cart.second .cart-text',{
            opacity:0,
        },{
            opacity:1,
            duration:1.5
        },'stage1+=5.3')
        .fromTo('.fixed-animation-block .right-half .empty-cart.second',{x:'-30px',y:'-30px'},{x:'0',y:'0',duration:0.5},'stage1+=6.8')
        .fromTo('.fixed-animation-block .right-half .empty-cart.third',{x:'-60px',y:'-60px'},{x:'-30px',y:'-30px',opacity:1,duration:0.5},'stage1+=6.9')
        .fromTo('.fixed-animation-block .right-half .empty-cart.fourth',{x:'-90px',y:'-90px'},{x:'-60px',y:'-60px',opacity:0.78,duration:0.5},'stage1+=7')
        .fromTo('.fixed-animation-block .right-half .empty-cart.fiveth',{opacity:0},{opacity:0.7,duration:0.5},'stage1+=7.1')

        .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(1) .text',{width:'44px'},{width:'auto',duration:1},'stage1+=3.8')
        .to('.fixed-animation-block .left-half .list .list_item:nth-child(1) .romb',{right:'-15px',duration:1},'stage1+=3.8')
        .fromTo('.fixed-animation-block .list_item:first-child .points',{opacity:1},{opacity:0,duration:0.5},'stage1+=4.3')
        .to('.fixed-animation-block .list_item:first-child',{background:'#FF9E00',duration:1},'stage1+=4.8')
        .to('.fixed-animation-block .left-half .list .list_item:nth-child(1) .romb',{background:'#FF9E00',duration:1},'stage1+=4.8')
        .fromTo('.fixed-animation-block .list_item:first-child .text',{opacity:0},{opacity:1,duration:1},'stage1+=4.8')
        .fromTo('.fixed-animation-block .list_item:first-child .subinfo',{opacity:0},{opacity:1,duration:0.5},'stage1+=5.8')

        .fromTo('.fixed-animation-block .right-half .empty-cart.second',{rotationY:'0'},{rotationY:'90deg',duration:0.5},'stage1+=7.6')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont',{display:'block',duration:0},'stage1+=8.1')
        .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont',{rotationY:'270deg'},{rotationY:'360deg',duration:0.5},'stage1+=8.1')

        // Второй пункт
        .addLabel('stage2','+=2')
        .to('.fixed-animation-block .list_item:first-child .subinfo',{opacity:0,duration:1},'stage2')
        .to('.fixed-animation-block .list_item:nth-child(1)',{background:'#FCFAF5',duration:1},'stage2')
        .to('.fixed-animation-block .list_item:nth-child(1) .romb',{background:'#FCFAF5',duration:1},'stage2')
        .to('.fixed-animation-block .list_item:nth-child(1)',{background:'transparent',duration:0},'stage2+=1')
        .to('.fixed-animation-block .list_item:nth-child(1) .romb',{background:'transparent',duration:0},'stage2+=1')
        .to('.fixed-animation-block .list_item:nth-child(1) .text',{color:'#000000',duration:1},'stage2')
        .fromTo('.fixed-animation-block .list_item:nth-child(2)',{opacity:0},{opacity:1,duration:0.5},'stage2+=1')
        .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(2) .text',{width:0},{width:'auto',duration:1},'stage2+=1.5')
        .to('.fixed-animation-block .left-half .list .list_item:nth-child(2) .romb',{right:'-15px',duration:1},'stage2+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(2)',{background:'#FF9E00',duration:1},'stage2+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(2) .romb',{background:'#FF9E00',duration:1},'stage2+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(2) .text',{opacity:1,duration:0.5},'stage2+=2.5')
        .to('.fixed-animation-block .list_item:nth-child(2) .subinfo',{opacity:1,duration:0.5},'stage2+=4.5')

        .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont .img-block',{height:'44rem'},{height:'30rem',duration:1},'stage2+=5')
        .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont .kid-name',{fontSize:'2rem'},{fontSize:'1.8rem',duration:1},'stage2+=5')
        .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont .diagnos',{fontSize:'1.4rem'},{fontSize:'1.2rem',duration:1},'stage2+=5')
        .fromTo('.empty-cart.with-cont .progress-list .progress-bar.bar1',{width:0,flex:'initial'},{width:'100%',duration:0.5},'stage2+=5.5')
        .fromTo('.empty-cart.with-cont .progress-list',{opacity:0},{opacity:1,duration:0.5},'stage2+=5.5')
        .fromTo('.empty-cart.with-cont .amount-block',{opacity:0},{opacity:1,duration:0.5},'stage2+=6')
        .fromTo('.empty-cart.with-cont .needed-block',{opacity:0},{opacity:1,duration:0.5},'stage2+=6.5')
        .fromTo('.empty-cart.with-cont .want-help-button',{opacity:0},{opacity:1,duration:0.01},'stage2+=7')
        .fromTo('.empty-cart.with-cont .want-help-button',{scale:1},{scale:0.8,duration:0.2},'stage2+=7')
        .fromTo('.empty-cart.with-cont .want-help-button',{scale:0.8},{scale:1,duration:0.2},'stage2+=7.2')

        // Третий пункт
        .addLabel('stage3','+=6.5')
        .to('.fixed-animation-block .list_item:nth-child(2) .subinfo',{opacity:0,duration:1},'stage3-=3')
        .to('.fixed-animation-block .list_item:nth-child(2)',{background:'#FCFAF5',duration:1},'stage3-=3')
        .to('.fixed-animation-block .list_item:nth-child(2) .romb',{background:'#FCFAF5',duration:1},'stage3-=3')
        .to('.fixed-animation-block .list_item:nth-child(2)',{background:'transparent',duration:0},'stage3-=2')
        .to('.fixed-animation-block .list_item:nth-child(2) .romb',{background:'transparent',duration:0},'stage3-=2')
        .to('.fixed-animation-block .list .line',{height:'70px',duration:0},'stage3-=2')
        .to('.fixed-animation-block .list_item:nth-child(2) .text',{color:'#000000',duration:1},'stage3-=3')
        .fromTo('.fixed-animation-block .list_item:nth-child(3)',{opacity:0},{opacity:1,duration:1},'stage3-=2')
        .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(3) .text',{width:0},{width:'auto',duration:1},'stage3-=1.5')
        .to('.fixed-animation-block .left-half .list .list_item:nth-child(3) .romb',{right:'-15px',duration:1},'stage3-=1.5')
        .to('.fixed-animation-block .list_item:nth-child(3)',{background:'#FF9E00',duration:1},'stage3-=1.5')
        .to('.fixed-animation-block .list_item:nth-child(3) .romb',{background:'#FF9E00',duration:1},'stage3-=1.5')
        .to('.fixed-animation-block .list_item:nth-child(3) .text',{opacity:1,duration:0.5},'stage3')
        .fromTo('.empty-cart.with-cont .reabilitation-block',{opacity:0},{opacity:1,duration:0.5},'stage3')

        .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3')
        .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'stage3+=1.5')
        .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=0.5')
        .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'stage3+=2')
        .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=1')
        .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'stage3+=2.5')
        .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=1.5')
        .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'stage3+=3')
        .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=2')
        .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'stage3+=3.5')
        .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=2.5')
        .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'stage3+=4')
        .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=3')
        .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'stage3+=4.5')
        .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=3.5')
        .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'stage3+=5')
        .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=4')
        .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'stage3+=5.5')
        .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=4.5')
        .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'stage3+=6')

        .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=5')
        .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'stage3+=6.5')
        .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=5.5')
        .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'stage3+=7')
        .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=6')
        .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'stage3+=7.5')
        .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=6.5')
        .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'stage3+=8')
        .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=7')
        .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'stage3+=8.5')
        .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=7.5')
        .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'stage3+=9')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=8')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'stage3+=9.5')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=8.5')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'stage3+=10')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=9')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'stage3+=10.5')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=9.5')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'stage3+=11')

        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=10')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'stage3+=11.5')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=10.5')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'stage3+=12')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=11')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'stage3+=12.5')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=11.5')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'stage3+=13')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=12')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'stage3+=13.5')
        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=12.5')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'stage3+=14')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=13')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'stage3+=14.5')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=13.5')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'stage3+=15')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=14')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'stage3+=15.5')
        // .fromTo('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=14.5')
        // .to('.fixed-animation-block .right-half .elem5',{opacity:0,scale:0.5,duration:1},'stage3+=16')

        // .fromTo('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=15')
        // .to('.fixed-animation-block .right-half .elem1',{opacity:0,scale:0.5,duration:1},'stage3+=16.5')
        // .fromTo('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=15.5')
        // .to('.fixed-animation-block .right-half .elem2',{opacity:0,scale:0.5,duration:1},'stage3+=17')
        // .fromTo('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=16')
        // .to('.fixed-animation-block .right-half .elem3',{opacity:0,scale:0.5,duration:1},'stage3+=17.5')
        // .fromTo('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5},{opacity:1,scale:1,duration:1},'stage3+=16.5')
        // .to('.fixed-animation-block .right-half .elem4',{opacity:0,scale:0.5,duration:1},'stage3+=18')

        .to('.empty-cart.with-cont .progress-bar.bar1 .progress-bar-done',{width:'100%',duration:9},'stage3')
        .to(obj1,9,{
            value:0, 
            onUpdate:function() {
            element1.innerHTML = Math.round(obj1.value).toLocaleString('ru');
            }
        },'stage3')
        .to(obj2,4,{
        value:10, 
        onUpdate:function() {
            element2.innerHTML = Math.round(obj2.value).toLocaleString('ru');
        }
        },'stage3+=4')
        .to(obj3,2,{
            value:0, 
            onUpdate:function() {
            element3.innerHTML = Math.round(obj3.value).toLocaleString('ru');
            },
            repeat:1
        },'stage3+=4')

        .to(obj4,1,{
            value:0,
            repeat:3, 
            onUpdate:function() {
            element4.innerHTML = Math.round(obj4.value).toLocaleString('ru');
            }
        },'stage3+=4')
        .to(obj5,1,{
            value:0,
            repeat:3, 
            onUpdate:function() {
            element5.innerHTML = Math.round(obj5.value).toLocaleString('ru');
            }
        },'stage3+=4')

        .to('.fixed-animation-block .list_item:nth-child(3) .subinfo',{opacity:1,duration:0.5},'stage3+=4.5')

        .to('.empty-cart.with-cont .amount-block .text',{opacity:0, display:"none",duration:0})
        .to('.empty-cart.with-cont .amount-block .amount-sum',{opacity:0, display:"none",duration:0})
        .to('.empty-cart.with-cont .amount-block .text2',{opacity:1, display:"flex",duration:0})
        .to('.empty-cart.with-cont .needed-block',{opacity:0, duration:0})
        .to('.empty-cart.with-cont .want-help-button',{opacity:0, display:"none",duration:0})
        .to('.empty-cart.with-cont .want-help-button.gray',{opacity:1, display:"block",duration:0})
        .to('.empty-cart.with-cont .want-help-button.gray',{opacity:1, display:"block",duration:0})
        .to(obj6,5,{
            value:1, 
            onUpdate:function() {
                element2.innerHTML = Math.round(obj6.value).toLocaleString('ru');
            }
        },'stage3+=9.5')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block .title',{opacity:0,display:'none',duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block .days',{opacity:0,display:'none',duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block .time',{opacity:0,display:'none',duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block .reabGone',{opacity:1,display:'flex',duration:0})

        .to('.fixed-animation-block .list_item:nth-child(3) .subinfo',{opacity:0,duration:1},'stage3+=13.5')
        .to('.fixed-animation-block .list_item:nth-child(3)',{background:'#FCFAF5',duration:1},'stage3+=13.5')
        .to('.fixed-animation-block .list_item:nth-child(3) .romb',{background:'#FCFAF5',duration:1},'stage3+=13.5')
        .to('.fixed-animation-block .list_item:nth-child(3)',{background:'transparent',duration:0},'stage3+=14.5')
        .to('.fixed-animation-block .list_item:nth-child(3) .romb',{background:'transparent',duration:0},'stage3+=14.5')
        .to('.fixed-animation-block .list .line',{height:'140px',duration:0},'stage3+=14.5')
        .to('.fixed-animation-block .list_item:nth-child(3) .text',{color:'#000000',duration:1},'stage3+=13.5')
        .to('.fixed-animation-block .list_item:nth-child(3) .subinfo2',{opacity:0,duration:0.5},'stage3+=13.5')
        .fromTo('.fixed-animation-block .list_item:nth-child(4)',{opacity:0},{opacity:1,duration:1},'stage3+=14')
        .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(4) .text',{width:0},{width:'auto',duration:1},'stage3+=14.5')
        .to('.fixed-animation-block .left-half .list .list_item:nth-child(4) .romb',{right:'-15px',duration:1},'stage3+=14.5')
        .to('.fixed-animation-block .list_item:nth-child(4)',{background:'#FF9E00',duration:1},'stage3+=14.5')
        .to('.fixed-animation-block .list_item:nth-child(4) .romb',{background:'#FF9E00',duration:1},'stage3+=14.5')
        .to('.fixed-animation-block .list_item:nth-child(4) .text',{opacity:1,duration:0.5},'stage3+=15')

        .to('.fixed-animation-block .right-half .empty-cart.with-cont .kid-img1',{opacity:0,duration:0.5},'stage3+=16')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .kid-img2',{opacity:1,duration:0.5},'stage3+=16.5')

        .to('.fixed-animation-block .list_item:nth-child(4) .subinfo',{opacity:1,duration:0.5},'stage3+=18')


        .addLabel('stage4','+=2')
        .to('.fixed-animation-block .list_item:nth-child(4) .subinfo',{opacity:0,duration:1},'stage4')
        .to('.fixed-animation-block .list_item:nth-child(4)',{background:'#FCFAF5',duration:1},'stage4')
        .to('.fixed-animation-block .list_item:nth-child(4) .romb',{background:'#FCFAF5',duration:1},'stage4')
        .to('.fixed-animation-block .list_item:nth-child(4)',{background:'transparent',duration:0},'stage4+=1')
        .to('.fixed-animation-block .list_item:nth-child(4) .romb',{background:'transparent',duration:0},'stage4+=1')
        .to('.fixed-animation-block .list .line',{height:'210px',duration:0},'stage4+=1')
        .to('.fixed-animation-block .list_item:nth-child(4) .text',{color:'#000000',duration:1},'stage4')
        .to('.fixed-animation-block .list_item:nth-child(4) .subinfo2',{opacity:0,duration:0.5},'stage4')
        .fromTo('.fixed-animation-block .list_item:nth-child(5)',{opacity:0},{opacity:1,duration:1},'stage4+=1')
        .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(5) .text',{width:0},{width:'auto',duration:1},'stage4+=1.5')
        .to('.fixed-animation-block .left-half .list .list_item:nth-child(5) .romb',{right:'-15px',duration:1},'stage4+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(5)',{background:'#FF9E00',duration:1},'stage4+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(5) .romb',{background:'#FF9E00',duration:1},'stage4+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(5) .text',{opacity:1,duration:0.5},'stage4+=2.5')


        .addLabel('stage5','+=2')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .reabilitation-block',{opacity:0,duration:0.5})

        .fromTo('.fixed-animation-block .right-half .empty-cart.with-cont',{rotationY:'0'},{rotationY:'90deg', duration:0.5})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont',{opacity:0,duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.reab-result',{opacity:1,duration:0})
        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result',{rotationY:'270deg'},{rotateY:'360deg',duration:0.5})
        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .title',{opacity:'0'},{opacity:'1',duration:0.5})
        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .img-block',{opacity:'0'},{opacity:'1',duration:0.5})
        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .result-list .item:nth-child(1)',{opacity:'0'},{opacity:'1',duration:0.5})
        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .result-list .item:nth-child(2)',{opacity:'0'},{opacity:'1',duration:0.5})
        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .result-list .item:nth-child(3)',{opacity:'0'},{opacity:'1',duration:0.5})
        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .result-list .item:nth-child(4)',{opacity:'0'},{opacity:'1',duration:0.5})
        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result .pechat',{opacity:'0'},{opacity:'1',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result',{rotationY:'360deg'},{rotateY:'270deg',duration:0.5})
        // .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result',{opacity:'1'},{opacity:'0',duration:0})


        .to('.fixed-animation-block .list_item:nth-child(5) .subinfo',{opacity:1,duration:0.5},'+=1.5')

        .addLabel('stage6','+=4')
        .to('.fixed-animation-block .list_item:nth-child(5) .subinfo',{opacity:0,duration:1},'stage6')
        .to('.fixed-animation-block .list_item:nth-child(5)',{background:'#FCFAF5',duration:1},'stage6')
        .to('.fixed-animation-block .list_item:nth-child(5) .romb',{background:'#FCFAF5',duration:1},'stage6')
        .to('.fixed-animation-block .list_item:nth-child(5)',{background:'transparent',duration:0},'stage6+=1')
        .to('.fixed-animation-block .list_item:nth-child(5) .romb',{background:'transparent',duration:0},'stage6+=1')
        .to('.fixed-animation-block .list .line',{height:'280px',duration:0},'stage6+=1')
        .to('.fixed-animation-block .list_item:nth-child(5) .text',{color:'#000000',duration:1},'stage6')
        .to('.fixed-animation-block .list_item:nth-child(5) .subinfo2',{opacity:0,duration:0.5},'stage6')
        .fromTo('.fixed-animation-block .list_item:nth-child(6)',{opacity:0},{opacity:1,duration:1},'stage6+=1')
        .fromTo('.fixed-animation-block .left-half .list .list_item:nth-child(6) .text',{width:0},{width:'auto',duration:1},'stage6+=1.5')
        .to('.fixed-animation-block .left-half .list .list_item:nth-child(6) .romb',{right:'-15px',duration:1},'stage6+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(6)',{background:'#FF9E00',duration:1},'stage6+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(6) .romb',{background:'#FF9E00',duration:1},'stage6+=1.5')
        .to('.fixed-animation-block .list_item:nth-child(6) .text',{opacity:1,duration:0.5},'stage6+=2.5')

        .to('.fixed-animation-block .list_item:nth-child(6) .subinfo',{opacity:1,duration:0.5},'stage6+=3.5')


        .fromTo('.fixed-animation-block .right-half .empty-cart.reab-result',{rotationY:'360deg'},{rotationY:'270deg',duration:0.5},'stage6+=3')
        .to('.fixed-animation-block .right-half .empty-cart.reab-result',{opacity:'0',display:'none',duration:0},'stage6+=3.5')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .want-help-button',{display:'block',opacity:1,duration:0},'stage6+=3.5')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .want-help-button.gray',{display:'none',duration:0},'stage6+=3.5')
        .to('.empty-cart.with-cont .needed-block',{opacity:1, duration:0},'stage6+=3.5')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont',{opacity:'1',duration:0},'stage6+=3.5')
        .to('.empty-cart.with-cont .progress-list .progress-bar.bar1',{flex:1,duration:0},'stage6+=3.5')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont',{rotationY:0,duration:0.5},'stage6+=3.5')

        .to('.empty-cart.with-cont .amount-block .text',{opacity:1, display:"flex",duration:0})
        .to('.empty-cart.with-cont .amount-block .amount-sum',{opacity:1, display:"block",duration:0})
        .to('.empty-cart.with-cont .amount-block .text2',{opacity:0, display:"none",duration:0})
        .to('.empty-cart.with-cont .progress-bar.bar2 ',{display:'block', opacity:'1',duration:0.5})

        .to(obj8,1,{
            value:0, 
            onUpdate:function() {
            element8.innerHTML = Math.round(obj8.value).toLocaleString('ru');
            }
        })
        .to('.empty-cart.with-cont .progress-bar.bar2 .progress-bar-done ',{width:'100%',duration:1},'-=1')
        .to('.empty-cart.with-cont .progress-bar.bar3 ',{display:'block', opacity:'1',duration:0.5})
        .to(obj9,1,{
            value:0, 
            onUpdate:function() {
            element9.innerHTML = Math.round(obj9.value).toLocaleString('ru');
            }
        })
        .to('.empty-cart.with-cont .progress-bar.bar3 .progress-bar-done ',{width:'100%',duration:1},'-=1')
        .to('.empty-cart.with-cont .progress-bar.bar4 ',{display:'block', opacity:'1',duration:0.5})
        .to(obj10,1,{
            value:0, 
            onUpdate:function() {
            element10.innerHTML = Math.round(obj10.value).toLocaleString('ru');
            }
        })
        .to('.empty-cart.with-cont .progress-bar.bar4 .progress-bar-done ',{width:'100%',duration:1},'-=1')
        .to('.empty-cart.with-cont .progress-bar.bar5 ',{display:'block', opacity:'1',duration:0.5})
        .to(obj11,1,{
            value:0, 
            onUpdate:function() {
            element11.innerHTML = Math.round(obj11.value).toLocaleString('ru');
            }
        })
        .to('.empty-cart.with-cont .progress-bar.bar5 .progress-bar-done ',{width:'100%',duration:1},'-=1')
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .want-help-button',{display:'none',opacity:1,duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .want-help-button.gray',{display:'block',duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .amount-block .text',{display:'none',duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .amount-block .amount-sum',{display:'none',duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .amount-block .text2',{display:'block',opacity:1,duration:0})
        .to('.fixed-animation-block .right-half .empty-cart.with-cont .amount-block .needed-block',{opacity:0,duration:0})
        .to('.empty-cart.with-cont .level',{opacity:0,duration:0})
        .to('.empty-cart.with-cont .GMFCS',{background:'#ffffff',fontWeight:'bold',boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.07)',position:'absolute',duration:0})
        .to('.empty-cart.with-cont .GMFCS',{padding:'1rem 4.59rem',
        borderRadius: '30px',translateX:'1rem',translateY:'-5rem',scale:'1.5',width:'24rem',duration:1})

        .to('.empty-cart.with-cont .GMFCS .arrow-img',{display:'inline-block',duration:0})
        .to('.empty-cart.with-cont .GMFCS .txt2',{display:'inline-block',duration:0})

        .to('.empty-cart.with-cont .GMFCS .arrow-img',{opacity:1,duration:0.5})
        .to('.empty-cart.with-cont .GMFCS .txt2',{opacity:1,duration:0.5})
        
        .to('.empty-cart.with-cont .GMFCS',{textAlign:'right',duration:0})
        .to('.empty-cart.with-cont .GMFCS .txt1',{opacity:0,duration:0.5})
        .to('.empty-cart.with-cont .GMFCS .arrow-img',{opacity:0,duration:0.5})
        .to('.empty-cart.with-cont .GMFCS .arrow-img',{display:'none',duration:0})
        .to('.empty-cart.with-cont .GMFCS .txt1',{display:'none',duration:0})
        .to('.empty-cart.with-cont .GMFCS',{width:'auto',translateX:'12.5rem'})
        .to('.empty-cart.with-cont .GMFCS',{textAlign:'left',duration:0})
        .to('.empty-cart.with-cont .GMFCS',{padding:'0 0',translateX:'0',translateY:'0',scale:'1',fontWeight:'normal',boxShadow: 'none',duration:1})
        .to('.empty-cart.with-cont .GMFCS',{position:'relative',duration:0})
        .to('.empty-cart.with-cont .level',{opacity:1,duration:0})
        .to('.fixed-animation-block .list_item:nth-child(6) .subinfo',{opacity:0,duration:1})
        .to('.fixed-animation-block .list_item:nth-child(6)',{background:'#FCFAF5',duration:1},'-=1')
        .to('.fixed-animation-block .list_item:nth-child(6) .romb',{background:'#FCFAF5',duration:1},'-=1')
        .to('.fixed-animation-block .list_item:nth-child(6) .text',{color:'#000000',duration:1},'-=1')
        .to('.fixed-animation-block .list_item:nth-child(6)',{background:'transparent',duration:0})
        .to('.fixed-animation-block .list_item:nth-child(6) .romb',{background:'transparent',duration:0})
        .to('.fixed-animation-block .list .line',{height:'350px',duration:0})
        // .to('.fixed-animation-block .list_item:nth-child(6) .subinfo',{opacity:0,duration:0.5})
        .to('.fixed-animation-block .last-info',{opacity:1,duration:0.5})

        .addLabel('stage7')
        ;


        // let st = ScrollTrigger.create({
        //     trigger: ".section.mission.mainanimation",
        //     start: "top top",
        //     //endTrigger: "#otherID",
        //     end: "bottom 50%+=300px",
        //     onToggle: self => {
        //         console.log()
        //         console.log("toggled, isActive:", self.isActive);
        //         if (self.isActive) {
        //             $('.fixed-animation-block').css({'position':'fixed','top':'150px'});
                    
        //         } else {
        //             $('.fixed-animation-block').css('position','relative');
        //         }
        //     },
        //     onUpdate: self => {
        //         console.log(self.progress.toFixed(3));
        //     }
        // });

        // let st1 = ScrollTrigger.create({
        //     trigger: ".section.mission.mainanimation .animContainer.anim1",
        //     start: "center center",
        //     //endTrigger: "#otherID",
        //     end: "center center",
        //     onToggle: self => {
        //     },
        //     onUpdate: self => {
        //         if (self.direction == 1) {
        //             //tl.tweenTo('thirdStage');
        //             console.log('tut');
        //             tl2.tweenTo('fourthStage');
        //         } else {
        //             tl2.tweenTo(0);
        //             //tl.tweenTo('firstStage');
        //         }
        //     }
        // });

        // let st2 = ScrollTrigger.create({
        // trigger: ".section.mission.mainanimation .animContainer.anim2",
        // start: "center center",
        // //endTrigger: "#otherID",
        // end: "center center",
        // onToggle: self => {
        // },
        // onUpdate: self => {
        //     if (self.direction == 1) {
        //         console.log('tut2');
        //         tl.tweenTo('fivethStage');
        //     } else {
        //         tl.tweenTo('thirdStage').timeScale(2);
        //     }
        // }
        // });

        // let st3 = ScrollTrigger.create({
        //     trigger: ".section.mission.mainanimation .animContainer.anim3",
        //     start: "center center",
        //     //endTrigger: "#otherID",
        //     end: "center center",
        //     onToggle: self => {
        //     },
        //     onUpdate: self => {
        //         if (self.direction == 1) {
        //             console.log('tut3');
        //             tl2.tweenTo('fivethStage');
        //             tl.tweenTo('sixStage');
        //         } else {
        //             tl2.tweenTo('fourthStage').timeScale(2);
        //             tl.tweenTo('fivethStage');
        //             // tl.tweenTo('thirdStage');
        //         }
        //     }
        // });
        // let st4 = ScrollTrigger.create({
        //     trigger: ".section.mission.mainanimation .animContainer.anim4",
        //     start: "center center",
        //     end: "center center",
        //     onToggle: self => {
        //     },
        //     onUpdate: self => {
        //         if (self.direction == 1) {
        //             console.log('tut4');
        //             tl2.tweenTo('sixStage');
        //             tl.tweenTo('seventhStage');
        //         } else {
        //             tl2.tweenTo('fivethStage').timeScale(3);
        //             tl.tweenTo('fivethStage');
        //         }
        //     }
        // });
        // let st5 = ScrollTrigger.create({
        //     trigger: ".section.mission.mainanimation .animContainer.anim5",
        //     start: "center center",
        //     end: "center center",
        //     onToggle: self => {
        //     },
        //     onUpdate: self => {
        //         if (self.direction == 1) {
        //             console.log('tut5');
        //             tl2.tweenTo('nineStage');
        //             tl.tweenTo('seventhStage');
        //         } else {
        //             tl2.tweenTo('sixStage').timeScale(3);
        //             tl.tweenTo('sixStage');
        //         }
        //     }
        // });

        
        
        // var proxyTween = gsap.to({}, 400, {});
        
        // TweenLite.defaultEase = Linear.easeNone;
        // //console.log(TweenLite);
        
        // $window.on("scroll", function() {
        //     //get document height
        //     var documentHeight = $(document).height();
        //     //get window height
        //     var windowHeight = $window.height();
        //     //get distance of window scrollbar
        //     scrollTop = $(window).scrollTop();
        
        //     var scrollPercent = Math.max(
        //     scrollTop / (documentHeight - windowHeight),
        //     0
        //     );
        
        //     scrollDir = scrollTop < lastScrollTop;
        //     // get difference to use as new progress
        //     var scrollDiff = (scrollTop - lastScrollTop) / (documentHeight - windowHeight);
        //     //console.log(scrollDiff);
            
        //     // make sure new progress is between 0 and 1 to avoid jumps
        //     var newProgress = Math.min(Math.max(0, proxyTween.progress() + scrollDiff), 1);
        //     proxyTween.progress(newProgress);
        //     console.log(proxyTween.progress());
            
        //     if (scrollDir) {
        //         proxyTween.reverse();
        //     } else {
        //         proxyTween.play();
        //     }
        
        //     lastScrollTop = scrollTop;
        // });
        // gsap.ticker.add(function() {
        //     var progress = tl2.progress();
        //     // ease can be anything from 0.5 to 0.01
        //     // Change ease to tweak effect
        //     progress += (proxyTween.progress() - progress) * 0.04;
        //     //console.log(progress)
        //     tl2.progress(progress);
        // });
    } else {
    }
});