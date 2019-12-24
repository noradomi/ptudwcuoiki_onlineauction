$('.add-to-cart').on('click', function(e) {
	let proId = $(this).attr('pro-id');

	let fieldName = $('.btn-number').attr('data-field');
	let input = $("input[name='" + fieldName + "']");
	// Giá đáu giá hiện tại submit
	let currBidPrice = parseInt(input.val());
	let step_cost = parseInt($('.input-number').attr('step_cost'));
	console.log('Gia dau gia :' + currBidPrice);

	bootbox.dialog({
		title: 'XÁC NHẬN',
		message: '<p>Bạn thực sự muốn đấu giá ?</p>',
		size: 'large',
		buttons: {
			cancel: {
				label: "I'm a cancel button!",
				className: 'btn-danger',
				callback: function() {
					console.log('Custom cancel clicked');
				}
			},
			ok: {
				label: "I'm an OK button!",
				className: 'btn-info',
				callback: function() {
					$.ajax({
						url: '/bidders/bid/' + proId,
						method: 'POST',
						data: { bidPrice: currBidPrice },
						success: function(data) {
							// console.log('Custom OK clicked ' + proId);
							if (data['isInBL']) {
								// bootbox.alert(
								// 	'Bạn đã bị seller từ chối ra giá sản phẩm này.'
								// );
								alertify.alert(
									'Có biến',
									'Bạn đã bị seller từ chối ra giá sản phẩm này.!',
									function() {
										alertify.success('Ok');
									}
								);
								return;
							}
							if (data['notEnoughRP']) {
								// Không đủ điểm đánh giá > 80%
								alertify.alert(
									'Có biến',
									'Bạn không đủ điểm đánh giá để tham gia đấu giá.!',
									function() {
										alertify.success('Cố gắng lên');
									}
								);
								return;
							}
							localStorage.setItem('Status', true);
							location.reload(true);
						}
					});

					// setTimeout(function() {
					// 	bootbox.alert(
					// 		'Giá đấu của bạn đã được ghi nhận! F5 để xem kết quả'
					// 	);
					// }, 900);
				}
			}
		}
	});
});

$('.btn-number').click(function(e) {
	e.preventDefault();

	fieldName = $(this).attr('data-field');
	type = $(this).attr('data-type');
	// Bước giá
	let step_cost = parseInt($('.input-number').attr('step_cost'));
	let input = $("input[name='" + fieldName + "']");
	let currentVal = parseInt(input.val());
	if (!isNaN(currentVal)) {
		if (type == 'minus') {
			if (currentVal > input.attr('min')) {
				input.val(currentVal - step_cost + ' K').change();
			}
			if (parseInt(input.val()) == input.attr('min')) {
				$(this).attr('disabled', true);
			}
		} else if (type == 'plus') {
			if (currentVal < input.attr('max')) {
				input.val(currentVal + step_cost + ' K').change();
			}
			if (parseInt(input.val()) == input.attr('max')) {
				$(this).attr('disabled', true);
			}
		}
	} else {
		input.val(0);
	}
});
$('.input-number').focusin(function() {
	$(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
	minValue = parseInt($(this).attr('min'));
	maxValue = parseInt($(this).attr('max'));
	valueCurrent = parseInt($(this).val());

	name = $(this).attr('name');
	if (valueCurrent >= minValue) {
		$(
			".btn-number[data-type='minus'][data-field='" + name + "']"
		).removeAttr('disabled');
	} else {
		alert('Sorry, the minimum value was reached');
		$(this).val($(this).data('oldValue'));
	}
	if (valueCurrent <= maxValue) {
		$(
			".btn-number[data-type='plus'][data-field='" + name + "']"
		).removeAttr('disabled');
	} else {
		alert('Sorry, the maximum value was reached');
		$(this).val($(this).data('oldValue'));
	}
});
$('.input-number').keydown(function(e) {
	// Allow: backspace, delete, tab, escape, enter and .
	if (
		$.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
		// Allow: Ctrl+A
		(e.keyCode == 65 && e.ctrlKey === true) ||
		// Allow: home, end, left, right
		(e.keyCode >= 35 && e.keyCode <= 39)
	) {
		// let it happen, don't do anything
		return;
	}
	// Ensure that it is a number and stop the keypress
	if (
		(e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
		(e.keyCode < 96 || e.keyCode > 105)
	) {
		e.preventDefault();
	}
});
