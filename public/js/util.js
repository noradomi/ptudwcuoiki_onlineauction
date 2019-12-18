function countDownTimer(expriry_date, id) {
	let current_date = new Date().getTime();

	let ex_date = new Date(expriry_date);

	let days, hours, minutes, seconds; // variables for time units

	let countdown = document.getElementById(id); // get tag element

	let seconds_left =
		(ex_date.getTime() +
			ex_date.getTimezoneOffset() * 60 * 1000 -
			current_date) /
		1000;

	// 	Het han

	if (seconds_left < 0) {
		countdown.innerHTML = `<h3>		
		<span class="label label-success">FINISHED</span>
	</h3>`;
		return;
	}

	let a = setInterval(function() {
		getCountdown(ex_date);
	}, 1000);

	function getCountdown(ex_date) {
		current_date = new Date().getTime();

		seconds_left =
			(ex_date.getTime() +
				ex_date.getTimezoneOffset() * 60 * 1000 -
				current_date) /
			1000;

		days = pad(parseInt(seconds_left / 86400));
		seconds_left = seconds_left % 86400;

		hours = pad(parseInt(seconds_left / 3600));
		seconds_left = seconds_left % 3600;

		minutes = pad(parseInt(seconds_left / 60));
		seconds = pad(parseInt(seconds_left % 60));

		// format countdown string + set tag value
		countdown.innerHTML = `<li><span>${days} D</span></li>
                <li><span>${hours} H</span></li>
                <li><span>${minutes} M</span></li>
                <li><span>${seconds} S</span></li>`;
	}

	function pad(n) {
		return (n < 10 ? '0' : '') + n;
	}
}

// CAN SUA LAI
function transferDateFormat(start_date, id) {
	var time = document.getElementById('time' + id); // get tag element
	getTime(start_date);

	function getTime(start_date) {
		// find the amount of "seconds" between now and target
		var Day = new Date(start_date).getDate();
		var Month = new Date(start_date).getMonth() + 1;
		var Year = new Date(start_date).getYear() + 1900;
		// format countdown string + set tag value
		time.innerHTML = `${Day}/${Month}/${Year}`;
	}
}

// Thêm/Xóa thích sản phẩm trong Watch List
function actOnPro(event) {
	let proId = event.target.dataset.proId;

	console.log(event.target.dataset.islike);

	let islike = event.target.dataset.islike;

	if (islike === 'false') {
		console.log('vao set css');
		$(`[data-pro-id=${proId}]`).css({
			color: '#f8694a',
			'-webkit-box-shadow':
				'0px 0px 0px 1px #f8694a inset, 0px 0px 0px 0px #f8694a',
			'box-shadow':
				'0px 0px 0px 1px #f8694a inset, 0px 0px 0px 0px #f8694a'
		});
		event.target.dataset.islike = 'true';
	} else {
		console.log('vao xóa css');
		$(`[data-pro-id=${proId}]`).css({
			color: '#30323a',
			'background-color': '#fff',
			'-webkit-box-shadow':
				'0px 0px 0px 1px #dadada inset 0px 0px 0px 6px transparent',
			'box-shadow':
				'0px 0px 0px 1px #dadada inset, 0px 0px 0px 6px transparent'
		});
		event.target.dataset.islike = 'false';
	}

	console.log('Vao ham voi proid : ' + proId);

	axios.post('/bidders/watchlist/' + proId);
}
