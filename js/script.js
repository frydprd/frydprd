

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
    if( !checkAnimation() ) {
      menu_active = this.dataset.nav;
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
            console.log( 'fp_nav_temp', fp_nav_temp );
            fp_nav[i].classList.remove('animate');
            console.log( 'fp_nav_temp', fp_nav_temp );
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

// Contact
( function() {
  let contact_wrap = document.querySelector('.nav-contact');
  let navigation = document.querySelector('.navigation');
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
    if( this.dataset.nav == "contact" ) {
      if( !contact_wrap.classList.contains('done') ) {
        setTimeout( () => {
          contact_wrap.classList.add('animate');
        }, 500 );
        // Animation is done
        setTimeout( () => {
          contact_wrap.classList.add('done');
        }, 1000 );
      }
    }
  }

})();
