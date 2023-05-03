let move_speed = 3, grativy = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird');
let sound_playing = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/gvt.mp3');

// lấy thuộc tính phần tử bird
let bird_props = bird.getBoundingClientRect();

// phương thức này trả về 'màn hình chính' DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let teach = document.querySelector('.teach');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
teach.classList.add('teachStyle');

document.addEventListener('click', (e) => {
    if (game_state != 'Play') {
        document.querySelectorAll('.tube').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        teach.innerHTML = '';
        score_title.innerHTML = 'Vòng :';
        score_val.innerHTML = '1';
        teach.classList.remove('teachStyle');
        play();
    }
});

function play() {
    function move() {
        if (game_state != 'Play') return;

        let tube = document.querySelectorAll('.tube');
        tube.forEach((element) => {
            let tube_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if (tube_props.right <= 0) {
                element.remove();
            } else {
                if (bird_props.left < tube_props.left + tube_props.width && bird_props.left + bird_props.width > tube_props.left && bird_props.top < tube_props.top + tube_props.height && bird_props.top + bird_props.height > tube_props.top) {
                    game_state = 'End';
                    teach.innerHTML = 'Game Over'.fontcolor('white')
                    teach.classList.add('teachStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                } else {
                    if (tube_props.right < bird_props.left && tube_props.right + move_speed >= bird_props.left && element.increase_score == '1') {
                        score_val.innerHTML = + score_val.innerHTML + 1;
                        sound_playing.play();
                    }
                    element.style.left = tube_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity() {
        if (game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
       
        document.addEventListener('click', () => {
            img.src = 'images/Bird-3.png';
            bird_dy = -7.6;
            Audio.src='(sounds effect/hay.mp3)';
        });

        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End';
            teach.style.left = '28vw';
            window.location.reload();
            teach.classList.remove('teachStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 35;

    function create_pipe() {
        if (game_state != 'Play') return;

        if (pipe_seperation > 115) {
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let tube_inv = document.createElement('div');
            tube_inv.className = 'tube';
            tube_inv.style.top = pipe_posi - 70 + 'vh';
            tube_inv.style.left = '100vw';

            document.body.appendChild(tube_inv);
            let tube = document.createElement('div');
            tube.className = 'tube';
            tube.style.top = pipe_posi + pipe_gap + 'vh';
            tube.style.left = '100vw';
            tube.increase_score = '1';

            document.body.appendChild(tube);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}

