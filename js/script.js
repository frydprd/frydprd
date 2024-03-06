var my_json_works = {
  sagis: {
    data: [
      {
        img: 'img/sa.png',
        img_text: 'Landing Page'
      },
      {
        img: 'img/sa-login.png',
        img_text: 'Login Page'
      },
      {
        img: 'img/sa-dash.png',
        img_text: 'Dashboard Page'
      }
    ]
  },
  lawfuel: {
    data: [
      {
        img: 'img/lawfuel.png',
        img_text: 'Front Page'
      }
    ]
  },
  grannfordon: {
    data:[
      {
        img: 'img/grannfordon.png',
        img_text: 'Front Page'
      }
    ]
  },
  compare: {
    data: [
      {
        img: 'img/compare.png',
        img_text: 'Compare Man With Van'
      }
    ]
  },
  nickjackson: {
    data: [
      {
        img: 'img/nickjackson.png',
        img_text: 'Nickjackson'
      }
    ]
  },

};

function throttle( callback, limit ) {
  var wait = false;
  return function() {
    if( !wait ) {
      callback.call();
      wait = true;
      setTimeout( function() {
        wait = false;
      }, limit );
    }
  }
}

let loaded_img = [];

// Loader
( function() {
  let loader = document.querySelector('.loader');
  let line = false;
  let percent = false;
  let text = false;
  let array_img = [1,2,3];
  let img_length = array_img.length;
  let check_if_loaded = false;
  if( loader ) {
    line = loader.querySelector('.load-time');
    percent = loader.querySelector('.triangle');
    text = loader.querySelector('.text');
    for ( let i = 0; i < img_length; i++) {
      setTimeout(() => {
        line.style.width = ((( img_length / (i + 1))) * 100)/3  + '%';
        percent.style.left = ((( img_length / (i + 1))) * 100)/3  + '%';
        text.style.left = ((( img_length / (i + 1))) * 100)/3  + '%';
        text.innerHTML = Math.floor(((( img_length / (i + 1))) * 100)/3)  + '%';
        if( i == 0  ) {
          loader.classList.add('loaded');
          loader.dataset.index = i;
        }
      } , 3000 / (i + 1) );
    }
  }
  check_if_loaded = setInterval( () => {
    if( loader.classList.contains('loaded') ) {
      setTimeout( () => {
        loader.style.opacity = 0;
      }, 500 );
      setTimeout( () => {
        loader.style.display = "none";
      }, 1000 );
      clearInterval(check_if_loaded);
    }
  }, 1000 );

})();

// 3 layer animation
function layerAnimate( element, delay = 0, time = 0 ) {
  element.classList.add('pre-animate');
  setTimeout( () => {
    element.classList.add('animate');
  }, delay );
  setTimeout( () => {
    element.classList.add('done');
  }, time );
}

function layerAnimateHide( element, delay = 0 ) {
  element.classList.remove('done');
  setTimeout( () => {
    element.classList.remove('animate');
  }, delay );
}

// Particle background
( function() {

  const canvas = document.getElementById('fp-bg-animation');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let numberOfParticles = 30;
  let mouse = {
    x: null,
    y: null,
    radius: ( canvas.height/150 ) * ( canvas.width/150 )
  }

  window.addEventListener( 'mousemove',
    function(e) {
      mouse.x = event.x;
      mouse.y = event.y;
    }
  );

  const particlesArray = [];

  class Particle {
      constructor( x, y, directionX, directionY, size, color ) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.size, 0, Math.PI*2, false );
        ctx.fillStyle = '#CBD5E0';
        ctx.fill();
      }
      update() {
        //check if the particle is still with the canvas
        if( this.x > canvas.width || this.x < 0 ) {
          this.directionX = -this.directionX;
        }
        if( this.y > canvas.height || this.y < 0 ) {
          this.directionY = -this.directionY;
        }

        //check collision detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt( dx*dx + dy*dy );
        if( distance < mouse.radius + this.size ) {
          if( mouse.x < this.x && this.x < canvas.width - this.size * 10 ) {
            this.x += 10;
            this.directionX = -this.directionX;
          }
          if( mouse.x > this.x && this.x > this.size * 10 ) {
            this.x -= 10;

          }
          if( mouse.y < this.y && this.y < canvas.height - this.size * 10 ) {
            this.y += 10;
          }
          if( mouse.y > this.y && this.y > this.size * 10 ) {
            this.y -= 10;
          }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
  }
  function init(){
      let color = '#8C5523';
      for (let i = 0; i < numberOfParticles; i++){
        let size = ( Math.random() * 2 ) + 1;
        let x = ( Math.random() * ( ( innerWidth - size * 2) - (size *2) ) + size * 2);
        let y = ( Math.random() * ( ( innerHeight - size * 2) - (size *2) ) + size * 2);
        let directionX = ( Math.random() * 3 ) - 2.5;
        let directionY = ( Math.random() * 3 ) - 2.5;
        particlesArray.push( new Particle(x, y, directionX, directionY, size, color ) );
      }
  }
  function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++){
          particlesArray[i].update();
      }
       connect();
      requestAnimationFrame(animate);
  }

  function connect() {
    for (var i = 0; i < particlesArray.length; i++) {
      for (var j = i; j < particlesArray.length; j++) {
        let x_dist = particlesArray[i].x - particlesArray[j].x;
        let y_dist = particlesArray[i].y - particlesArray[j].y;
        let distance = ( (( x_dist ) * ( x_dist ))
                      + (( y_dist ) * ( y_dist )) );
        if( distance < ( canvas.width / 7 ) * (canvas.height / 7) ) {
          ctx.strokeStyle = "#A0AEC0";
          ctx.lineWidth = 0.1;
          ctx.beginPath();
          ctx.moveTo( particlesArray[i].x, particlesArray[i].y );
          ctx.lineTo( particlesArray[j].x, particlesArray[j].y );
          ctx.stroke();
        }
      }
    }
  }
  init();
  animate();

  window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    init();
  });


})();


// Circle background
( function() {
  const canvas = document.getElementById('fp-bg-circles');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let circle = null;
  let mouse = {
    x: null,
    y: null,
    radius: 10
  }

  window.addEventListener( 'mousemove',
    function(e) {
      mouse.x = event.x;
      mouse.y = event.y;
    }
  );

  class Circle {
    constructor() {
      this.radius = canvas.height / 2.5;
      this.x = 0;
      this.y = 0;

    }
    draw() {
      ctx.beginPath();
      ctx.arc( ( canvas.width / 2 ) + this.x , ( canvas.height / 2 ) + this.y, this.radius, Math.PI * 2, false );
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = "0.2";
      ctx.stroke();
    }
    update() {
      let position_x = mouse.x / canvas.width;
      let position_y = mouse.y / canvas.height;

      if( position_x > 0.5  && this.x > -10 ) {
        this.x -= 0.5;
      }
      if( position_x < 0.5 && this.x  < 10 ) {
          this.x += 0.5;
      }
      if( position_y > 0.5 && this.y > -10 ) {
        this.y -= 0.5;
      }
      if( position_y < 0.5 && this.y < 10 ) {
        this.y += 0.5;
      }
      this.draw();
    }

    insideCircle() {

    }
  }
  function init() {
    circle = new Circle();
  }
  function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circle.update();
      requestAnimationFrame(animate);
  }
  window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
  init();
  animate();
})();

// Background Noise
( function() {
  const noise = () => {
    let canvas, ctx;

    let wWidth, wHeight;

    let noiseData = [];
    let frame = 0;

    let loopTimeout;


    // Create Noise
    const createNoise = () => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        for (let i = 0; i < len; i++) {
            if (Math.random() < 0.5) {
                buffer32[i] = 0xFF1A312C;
            }
        }

        noiseData.push(idata);
    };


    // Play Noise
    const paintNoise = () => {
        if (frame === 9) {
            frame = 0;
        } else {
            frame++;
        }

        ctx.putImageData(noiseData[frame], 0, 0);
    };


    // Loop
    const loop = () => {
        paintNoise(frame);

        loopTimeout = window.setTimeout(() => {
            window.requestAnimationFrame(loop);
        }, (1000 / 25));
    };


    // Setup
    const setup = () => {
        wWidth = window.innerWidth;
        wHeight = window.innerHeight;

        canvas.width = wWidth;
        canvas.height = wHeight;

        for (let i = 0; i < 10; i++) {
            createNoise();
        }

        loop();
    };


    // Reset
    let resizeThrottle;
    const reset = () => {
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeThrottle);

            resizeThrottle = window.setTimeout(() => {
                window.clearTimeout(loopTimeout);
                setup();
            }, 200);
        }, false);
    };


    // Init
    const init = (() => {
        canvas = document.getElementById('fp-bg-noise');
        ctx = canvas.getContext('2d');

        setup();
    })();
};

  noise();
})();


// Content Wrapper
( function() {
  var width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;
  let tilte_start = 0;
  let title_id;
  let max_skew_x = 10;
  let skew_x = 0;
  let height_y = 0;
  let mouse = {
    x: null,
    y: null,
    radius: 10
  }

  window.addEventListener( 'mousemove',
    function(e) {
      mouse.x = event.x;
      mouse.y = event.y;
    }
  );

  // Get text
  let title = document.querySelector('.title');



  function animateTitle() {

    if( (width / mouse.x) < 2 && skew_x <= max_skew_x ) {
      // title.style.transform = "skewX(" + skew_x + "deg) translateY(-50%)";
       title.style.left = skew_x + 'px';
      skew_x++;
    }
    if( ( width / mouse.x ) > 2 && skew_x >= -max_skew_x ) {
      // title.style.transform = "skewX(" + skew_x + "deg) translateY(-50%)";
      title.style.left = skew_x + 'px';
      skew_x--;
    }

    if( ( height / mouse.y )  < 2 && height_y <= 15 ) {
      title.style.top = "calc(50% - " + ( 50 - height_y ) + "px)";
      height_y++;
    }

    if( ( height / mouse.y )  > 2 && height_y >= -15 ) {
      title.style.top = "calc(50% - " + ( 50 - height_y ) + "px)";
      height_y--;
    }

    title_id = requestAnimationFrame( animateTitle );
  }
  animateTitle();

})();

// Navigation
( function() {
  let navigation = document.querySelector('.navigation');
  let nav_children = false;
  let nav_length = 0;
  let main_text = document.querySelector('.main-text');
  if( navigation ) {
    nav_children = navigation.children;
    nav_length = nav_children.length;
    for ( let i = 0; i < nav_length; i++ ) {
      nav_children[i].addEventListener( 'click', navClickEvent );
    }
  }

  function navClickEvent( e ) {
    let menu_active = "";
    clearNav();
    menu_active = ".nav-" + this.dataset.nav;
    let nav_content_ele = document.querySelector(menu_active); 

    if( nav_content_ele ) {

      console.log( nav_content_ele );
      setTimeout( () => {
        nav_content_ele.classList.add('animate');
      }, 500 );
      // Animation is done
      setTimeout( () => {
        nav_content_ele.classList.add('done');
      }, 1000 );
    }

    if( !checkAnimation() ) {

      this.classList.add('active');
      this.classList.add('animate');  

      if( !main_text.classList.contains('animate') ) {
        main_text.classList.add('animate');
      }
      setTimeout( ()=> {
        this.classList.remove('animate');
        main_text.style.display = "none";
      }, 2000 );
    }
  }

  function clearNav() {
    let fp_nav = document.querySelectorAll('.fp-nav');
    let fp_nav_length = 0;
    let fp_nav_temp = false;
    for ( let i = 0; i < nav_length; i++ ) {
      if( nav_children[i].classList.contains( 'active' ) ) {
        nav_children[i].classList.remove('active');
      }
    }

    if( fp_nav ) {

      fp_nav_length = fp_nav.length;
      for (let i = 0; i < fp_nav_length; i++) {
        fp_nav_temp = fp_nav[i];
        if( fp_nav[i].classList.contains('done') ) {
          fp_nav[i].classList.remove('done');
        }
        if( fp_nav[i].classList.contains('animate') ) {
          setTimeout( () => {
            fp_nav[i].classList.remove('animate');
          }, 500  );
        }
      }
    }


  }

  function checkAnimation() {
    for ( let i = 0; i < nav_length; i++ ) {
      if( nav_children[i].classList.contains( 'animate' )  ) {
        return true;
      }
    }
    return false
  }



})();


console.log( 'function setup' );
// Function Setup
( function() {
  let block = document.querySelectorAll('.block');
  let block_length = block.length;
  let block_children = 0;
  let block_children_length = 0;
  let transition = 0;
  let navigation = document.querySelector('.navigation');
  let nav_children = false;
  let nav_length = 0;
  let email_text = document.querySelectorAll('.email-event-copy');
  let email_length = 0;
  let copy = document.querySelector('.copied');

  for (var i = 0; i < block_length; i++) {
    block[i].innerHTML = wrapChars( block[i].textContent );
  }

  for (var i = 0; i < block_length; i++) {
    block_children = block[i].children;
    block_children_length = block_children.length;
    transition = 0;
    for (var j = 0; j < block_children_length; j++) {
      block_children[j].style.transitionDelay = transition + 's';
      transition += 0.02;
    }
  }

  if( navigation ) {
    let data_nav = false;
    let temp_wrap = false;
    nav_children = navigation.children;
    nav_length = nav_children.length;
    for (var i = 0; i < nav_length; i++) {
      nav_children[i].classList.remove('active');
      data_nav = nav_children[i].dataset.nav;
      temp_wrap = document.querySelector('.nav-' + data_nav );
      if( temp_wrap ) {
        temp_wrap.classList.add('pre-animate');
      }
    }
  }

  if( email_text && copy ) {
    email_length = email_text.length;
    for (let i = 0; i < email_length; i++) {
      email_text[i].addEventListener( 'click', copyText );
    }
  }

  function wrapChars(str) {
    return str.replace(/\w|'/gm,  "<span>$&</span>");
  }

  function copyText() {
    selectText();
    if( copy ) {
      copy.style.display = "block";
      setTimeout( () => {
        copy.style.opacity = 1;
      }, 200 );
      setTimeout( () => {
        copy.style.opacity = 0;
      }, 900 );
      setTimeout( () => {
        copy.style.display = 'none';
      }, 1100 );
    }
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }

  function selectText() {
    var element = event.target
    var range;
    if (document.selection) {
      // IE
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  }
})();

console.log( 'Aboyut setup' );
// About
( function() {
  class FPTextAnimation {

    constructor ( object ) {
      if( object.target ) {
        this.counter = 0;
        this.el =  object.target;
        this.target_element = object.target;
        this.characters = typeof object.characters != "undefined" ? object.characters : '!@#$%^&*)(_+=-' ;
        this.messages = typeof object.messages != "undefined" && object.messages.length != 0 ? object.messages : false;
        this.update = this.update.bind(this);
        this.init();
      }
    }

    randomChar() {
      return this.characters[ Math.floor( Math.random() * this.characters.length ) ];
    }

    setText( newText ) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    init() {
      let message_length = this.messages.length;
      let counter = 0;
      const next = () => {
        this.setText( this.messages[counter]).then(() => {
          setTimeout( next, 2000 );
        });
        counter = ( counter + 1 ) % message_length;
      }
      next();
    }

  }

  let about_wrap = document.querySelector('.nav-about');
  let navigation = document.querySelector('.navigation');
  let text_animation_wrap = about_wrap.querySelector('.text-animation-1');
  let text_arr = [ 'WEB DEVELOPER', 'WEB DESIGNER', 'DATA SCRAPER', 'FRONT-END DEV', 'BACK-END DEV' ];
  let email_text = document.querySelector('#email-input');
  let copy = document.querySelector('.copied');
  let nav_children = false;
  let nav_length = 0;
  if( navigation ) {
    nav_children = navigation.children;
    nav_length = nav_children.length;
    for ( let i = 0; i < nav_length; i++ ) {
      nav_children[i].addEventListener( 'click', navClickEvent );
    }
  }

  if( copy && email_text ) {
    email_text.addEventListener( 'click', copyText );
  }

  function navClickEvent( e ) {

    //About
    if( this.dataset.nav == "about" ) {
      if( !about_wrap.classList.contains('done')  ) {
        setTimeout( () => {
          about_wrap.classList.add('animate');
        }, 500 );
        // Animation is done
        setTimeout( () => {
          about_wrap.classList.add('done');
          // new FPTextAnimation({
          //   messages: text_arr,
          //   target: text_animation_wrap
          // });
        }, 1000 );
        if( !text_animation_wrap.classList.contains('fp-start') ) {
          text_animation_wrap.classList.add('fp-start');
          setTimeout( () => {
            new FPTextAnimation({
              messages: text_arr,
              target: text_animation_wrap
            });
          }, 1200 );

        }

      }
    }

  }

  function copyText() {
    selectText();
    if( copy ) {
      copy.style.display = "block";
      setTimeout( () => {
        copy.style.opacity = 1;
      }, 200 );
      setTimeout( () => {
        copy.style.opacity = 0;
      }, 900 );
      setTimeout( () => {
        copy.style.display = 'none';
      }, 1100 );
    }
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }

  function selectText() {
    var element = event.target
    var range;
    if (document.selection) {
      // IE
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  }



} )();

console.log( 'copy setup' );
( function() {

  // if( copy && email_text ) {
  //   email_text.addEventListener( 'click', copyText );
  // }

})();

console.log( 'modal setup' );
// Modal Settings
( function() {

  let modal = document.querySelector('#fp-modal');
  let modal_close = document.querySelector('.close-modal');
  let animation_done  = false;
  let modal_height = 100;
  let list_item = document.querySelectorAll('.list-item-work');

  if ( modal_close ) {
    modal_close.addEventListener( 'click', hideModal );
  }


  for( li = 0; li < list_item.length; li++ ) {
    list_item[li].addEventListener( 'click', openModal );
  }

  function hideModal(e) {
    modal_height = 100;
    window.requestAnimationFrame( hideAnimation );
  }

  function openModal( e ) {
    modal_height = 0;
    window.requestAnimationFrame( showAnimation );
  }

  function hideAnimation( height ) {
    modal.style.height = modal_height + '%';
    modal_height = modal_height - 5;
    if( modal_height > -1 ) {
      window.requestAnimationFrame( hideAnimation );
    }
  }

  function showAnimation( height ) {
    console.log( modal_height );
    modal.style.height = modal_height + '%';
    modal_height = modal_height + 5;

    if( modal_height >= 100 ) {
      modal.style.height = 100 + '%';
      modal_height = 100;
    }
    else {
      window.requestAnimationFrame( showAnimation );
    }

  }

  function showModal( e ) {
    
  }

  function createElements( work_data ) {

    if( work_data ) {
      
    }

  }

})();

// What I do Modal
( function() {

  let modal = document.querySelector('#fp-what-ido');
  let main_content      = false;
  let mouse_in          = false;
  let content_wrap      = false;
  let content_list      = false;
  let stick_note_wrap   = false;
  let sticky_list       = false;
  let list_a            = false;
  let click_enter_event = false;
  let close_modal       = false;
  let moving            = false;
  let top_title = false;
  let content_title = false;
  let scroll_data   = 0;
  let what_btn      = false;

  if( modal ) {
    main_content    = modal.querySelector('.modal-content');
    content_wrap    = modal.querySelector('.content-wrap');
    content_list    = modal.querySelectorAll('.content-list');
    stick_note_wrap = modal.querySelector('.sticky-note-list-wrap');
    sticky_list     = modal.querySelector('.sticky-list');
    list_a          = modal.querySelectorAll('.list-a');
    click_enter_event = modal.querySelector('#bottom-enter-event');
    close_modal       = modal.querySelector('.close-modal');
    what_btn          = document.querySelector('.what-i-do-btn');
    resetModal();
  }

  

  if( main_content ) {
    /* Events */

    // Open Modal
    what_btn.addEventListener( 'click', openModal );

    // Scroll 

    main_content.addEventListener( 'mouseenter', throttle( mouseEnter, 100 ) );
    main_content.addEventListener( 'mouseleave', throttle( mouseOut, 100 ) );

    main_content.addEventListener( 'wheel', function(e){
      if( mouse_in ) {
        e.preventDefault();
      }
    });

    modal.addEventListener( 'animationend', function(e) {
      if( modal.classList.contains('animate__fadeOut') ) {
        modal.classList.add('hide');
      }
    });
    
    
    keypress = document.addEventListener( 'keydown', function(e) {
      if( e.keyCode === 38 ) {
        moveKey('down');
      }
      else if( e.keyCode === 40 ) {
        moveKey('up');
      }
      else if( e.keyCode === 13 ) {
        nextList();
      }
      else if( e.keyCode === 39 ) {
        nextList();
      }
      else if( e.keyCode === 37 ) {
        prevList();
      }
    });
    
    click_enter_event.addEventListener( 'click', function(e) {
      nextList();
    });

    main_content.addEventListener( 'wheel', function(e) {

    //  let nomalize_val = normalizeWheelDelta( e );
      //console.log( 'Normalize Value ', nomalize_val );

      if( mouse_in ) {
        let delta = e.wheelDelta;
        let delta_data = e;
        if( delta < 0 ) {
          moveDown( {
            target: e
          } );
        }
        else if( delta > 0 ) {
          moveUp( {
            target: e
          } );
        }
      }

    });

    // Close Event
    close_modal.addEventListener( 'click', function(e) {
      let parent_element = this.parentElement;
      if( parent_element.classList.contains( 'animate__fadeIn' ) ) {
        parent_element.classList.remove('animate__fadeIn');
      }
      parent_element.classList.add('animate__fadeOut');
      console.log( 'click' );
    });


  } 

  // Navigation
  if( list_a ) {
    console.log( 'list_a', list_a );
    for (let index = 0; index < list_a.length; index++) {
      const element = list_a[index];
      element.addEventListener( 'click', navigationClickEvent );
    }
  }

  // Open Modal
  function openModal( e ) {
    resetAllModal();
    if( modal.classList.contains('hide') ) {
      modal.classList.remove('hide');
    } 
    if( modal.classList.contains('animate__fadeOut') ) {
      modal.classList.remove('animate__fadeOut');
    }

    modal.classList.add('animate__fadeIn');
  }

  // Scroll Events
  function normalizeWheelDelta(e){
		if(e.detail){
      console.log( 'e.detail', e.detail );
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
			else
				return -e.detail/3 // Firefox
		}else
			return e.wheelDelta/120 // IE,Safari,Chrome
	}

  function moveUp( data ) {

    let scroll_data = 0;
    let delta_data_scroll = 0;
    let content_wrap_style = getComputedStyle(content_wrap);

    scroll_data = parseInt(content_wrap_style.top);
    if( !content_wrap ) {
      return;
    }

    delta_data_scroll = scroll_data + (Math.abs(data.target.deltaY) * 0.03);

    content_wrap.style.top = ( delta_data_scroll  ) + 'px';

  }

  function moveKey( str ) {
    let content_wrap_style = getComputedStyle(content_wrap);
    let scroll_data        = parseInt( content_wrap_style.top );
    let get_bounding_rect  = content_wrap.getBoundingClientRect();

    if( str == 'down' ) {
      content_wrap.style.top = ( scroll_data + ( get_bounding_rect.height / 10 ) ) + 'px';
    }
    else if(  str == 'up') {
      content_wrap.style.top = ( scroll_data - ( get_bounding_rect.height / 10 ) ) + 'px';
    }

  }

  function moveDown( data ) {

    let scroll_data = 0;
    let delta_data_scroll = 0;
    let content_wrap_style = getComputedStyle(content_wrap);

    scroll_data = parseInt(content_wrap_style.top);

    if( !content_wrap ) {
      return;
    }

    delta_data_scroll = ( scroll_data - (Math.abs(data.target.deltaY) * 0.03));
    
    // console.log( scroll_data, 'mode down' )
    content_wrap.style.top =  delta_data_scroll + 'px';

  }

  function mouseScroll() {
    console.log('scrolled');
  }

  function mouseEnter() {
    mouse_in = true;
    console.log( 'mouse enter is ', mouse_in );
  }

  function mouseOut() {
    mouse_in = false;
    console.log( 'mouse out is ', mouse_in );
  }

  function resetAllModal() {


    let sticky_list_child = sticky_list.children;

    if( content_list ) {

      for (let index = 0; index < content_list.length; index++ ) {

        const element = content_list[index];

        if( index == 0 ) {
          element.classList.remove('hide');    
          element.classList.add('active');   
        }
        else {
          element.classList.add('hide');
        }
    
      }
      

      for (let index = 0; index < sticky_list_child.length; index++ ) {
        let element = sticky_list_child[index];
        if( index === 0 ) {
          if( element.classList.contains('hide') ) {
            element.classList.remove('hide');
          }
          element.classList.add('active');
        }
        else {
          if( element.classList.contains('active') ) {
            element.classList.remove('active');
          }
          element.classList.add('hide');
        }  
      }
      content_wrap.style.top = 0 + 'px';
    }
  }

  // Reset Functions
  function resetModal() {

    console.log( 'Reset Modal' );
    // Content List Reset
    if( content_list ) {

      for (let index = 0; index < content_list.length; index++ ) {

        const element = content_list[index];

        if( index == 0 ) {
          element.classList.remove('hide');       
        }
        else {
          element.classList.add('hide');
        }
    
      }

      

    }

  }
  
  // Navigation events
  function navigationClickEvent(e) {
    
    e.preventDefault();
    let parentElement = this.parentElement;
    let nav_data      = this.dataset.type;

    // Reset Li classList
    hideAllNav();

    parentElement.classList.add('active');

    resetContentList(nav_data);

  }

  function hideAllNav() {
    if( sticky_list ) {
      for (let index = 0; index < sticky_list.children.length; index++) {
        const element = sticky_list.children[index];
        if( element.classList.contains('active') ) {
          element.classList.remove('active');
        }
      }
    }
  }

  function resetContentList( data ) {

    if( content_list ) {
      for (let index = 0; index < content_list.length; index++ ) {
        const element = content_list[index];
        element.classList.add('hide');
      }
    }

    if( content_wrap ) {
      content_wrap.dataset.scroll = 0;
      content_wrap.style.top = 0 + 'px';
    }

    if( data ) {

      for (let index = 0; index < content_list.length; index++) {
        const element = content_list[index];

        if( element.dataset && element.dataset.nav == data ) {
            element.classList.remove('hide');
            break;
        }
        
      }

    }
    

  }

  function nextList() {
    
    let active_element = false;
    let data_list      = false;
    for (let index = 0; index  < sticky_list.children.length; index++) {
      
      if( sticky_list.children[index].classList.contains('active') ) {
        active_element = sticky_list.children[index + 1] ? sticky_list.children[index + 1] : false;
      }
      
    }
    console.log( 'active_element',active_element );

    if( active_element ) {
      data_list = active_element.children[0].dataset.type;
      console.log( data_list );
      hideAllNav();
      active_element.classList.add('active');
      resetContentList( data_list );
    }
    else {
      hideAllNav();
      sticky_list.children[0].classList.add('active');
      resetContentList( 'webdesign' );
    }

  }

  function prevList() {
    let active_element = false;
    let data_list      = false;
    for (let index = 0; index  < sticky_list.children.length; index++) {
      
      if( sticky_list.children[index].classList.contains('active') ) {
        active_element = sticky_list.children[index - 1] ? sticky_list.children[index - 1] : false;
      }
      
    }

    if( active_element ) {
      data_list = active_element.children[active_element.children.length - 1].dataset.type;
      hideAllNav();
      active_element.classList.add('active');
      resetContentList( data_list );
    }
    else {
      hideAllNav();
      sticky_list.children[sticky_list.children.length - 1 ].classList.add('active');
      resetContentList( 'wpplugin' );
    }

  }

})();

