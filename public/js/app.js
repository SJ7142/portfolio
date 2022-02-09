const dd = console.log;

let scroll = 0;
let timer = true;

const Cube = {
	init() {
		this.def = $('.cube_1').offset();
		this.def.top -= 100;

		$(window).on('scroll', this.move.bind(this))

		this.move();
	},

	move() {
		$('.cube_1').css({
			position: 'absolute',
			left: this.def.left,
			top: this.def.top + $(window).scrollTop(),
		})

		if ($(window).scrollTop() + $(window).height() >= $('.cube2').offset().top + 600) {
			let ofs = $('.cube2').offset();

			$('.cube_1').css({
				left: ofs.left,
				top: ofs.top,
				position: 'absolute',
			});
		}

		if ($('.cube2').offset().top + 100 < $(window).scrollTop()) {
			$('.cube_1').css({
				top: $('.clone-cube').offset().top - 75,
			}).addClass('cube_1--fade');

			$('.cube-info').css('opacity', 1)

			if (!$('.clone-cube .cube_1').length) {
				let $clone = $('.section1 .cube_1').clone().removeClass('cube_1--fade');
				$('.clone-cube').html($clone);
			}
		} else {
			$('.cube_1').removeClass('cube_1--fade')
			$('.clone-cube').html('');
			$('.cube-info').css('opacity', 0)
		}
	}
}
let def = $('.cube_1').offset();

function ani() {
	let st = $(window).scrollTop();
	let wh = $(window).height();

	$('.ani').each((i, v) => {
		let vt = $(v).offset().top;
		let vh = $(v).height();

		if (st <= vt && vt+vh <= st+wh) {
			$(v).css({
				opacity: 1,
				transform: 'translateY(0)',
				transitionDelay: $(v).data('delay')+'s',
			});
		} else {
			$(v).css({
				opacity: 0,
				transform: 'translateY(20px)',
				transitionDelay: '0s',
			});
		}
	})

	$('.section').each((i, v) => {
		let name = $(v).data('name');
		let vt = $(v).offset().top + 700;
		if (st <= vt && vt <= st+wh) {
			$('nav .active').removeClass('active');
			$(`nav div[data-name='${name}']`).addClass('active');
		}
	})
}

window.onload = function() {

	particleground($('.section')[0], {
		dotColor: '#4287f540',
		dotColor: 'rgba(66,135,245,.23)',
		lineColor: '#ffffff00',
		speedX: .2,
		speedY: .2,
		particleRadius: 4,
		parallax: false
	})

	Cube.init();

	setTimeout(ani, 500);

	$(window).on('scroll wheel', ani);

	$('nav div').click(function() {
		let name = $(this).data('name');
		let top = $(`.section[data-name='${name}']`).eq(0).offset().top;

		$('body, html').stop().animate({
			scrollTop: top
		}, 500)
	})
}