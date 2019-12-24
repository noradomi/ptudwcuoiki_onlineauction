function cancelBid(bidderId, proId, price) {
	// let bidderId = $(this).attr('bidderId');

	// let proId = $(this).attr('proId');

	console.log('Thông tin từ chối :' + bidderId + ' ' + proId);

	bootbox.dialog({
		title: 'XÁC NHẬN',
		message: '<p>Bạn thực sự muốn từ chối lượt ra giá này ?</p>',
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
						url: '/seller/denybid/' + bidderId + '/' + proId,
						method: 'POST',
						data: { price: price },
						success: function(data) {
							if (data['success']) {
								localStorage.setItem('Deny', true);
								location.reload();

								// setTimeout(function() {
								// 	bootbox.alert('T');
								// }, 300);
							} else {
								bootbox.alert({
									message:
										'Chỉ bidder mới có thể thực hiện quyền này. Vui lòng thử lại với quyền bidder !!!',
									size: 'small'
								});
							}
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
}