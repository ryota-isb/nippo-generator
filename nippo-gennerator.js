(function () {
	'use strict';

	window.onload = function () {

		/*指定した要素の子要素をすべて削除*/
		function removeAllChildren(element) {
			while (element.firstChild) { //子どもの要素がある限り削除
				element.removeChild(element.firstChild);
			}
		}

		/*報告日を設定*/
		function reportDate() {
			var now = new Date();
			now.setHours(now.getHours() - 6);
			var mon = now.getMonth() + 1; //１を足すこと
			var day = now.getDate();
			return (mon + '/' + day);
		};

		/*現在時刻を退勤時刻に設定*/
		function setReportTime() {
			const now2 = new Date();
			let hour = now2.getHours();
			if (String(hour).length < 2) {
				hour = "0" + hour;
			}
			const minute = now2.getMinutes();
			return hour + ":" + minute;
		};
		document.getElementById('clockOut').value = setReportTime();

		/*出力ボタン押下時の動作*/
		var inputButton = document.getElementById('inputButton');
		inputButton.onclick = function () {

			var outputSection = document.getElementById('output');
			removeAllChildren(outputSection);

			/*名前を取得*/
			var userName = document.getElementById('name').value;

			/*名前を出力*/
			if (userName) {
				outputSection.insertAdjacentHTML('afterbegin', '<p id="text">お疲れ様です。' + userName + 'です。<br>本日の業務報告です。</p>');

				for (var i = 0; i < 10; i++) {
					/*業務名を取得*/
					var job = document.getElementById('job' + (i + 1)).value;

					/*業務詳細を取得*/
					var jobDisc = document.getElementById('job_d' + (i + 1)).value;
					/*改行処理*/
					jobDisc = jobDisc.replace(/\r\n/g, "\n");
					jobDisc = jobDisc.replace(/\n/g, '<br>');

					/*業務を出力*/
					/*出力エリアの取得*/
					var text = document.getElementById('text');
					/*出力の出し分け*/
					if (job) {
						if (i === 0) {
							/*1回目*/
							if (jobDisc) {
								text.insertAdjacentHTML('beforeend', '<br><br>【業務】<br>■' + job + '<br>' + jobDisc);
							} else {
								text.insertAdjacentHTML('beforeend', '<br><br>【業務】<br>■' + job);
							}

						} else {
							/*2回目以降*/
							if (jobDisc) {
								text.insertAdjacentHTML('beforeend', '<br><br>■' + job + '<br>' + jobDisc);
							} else {
								text.insertAdjacentHTML('beforeend', '<br><br>■' + job);
							}
						}
						/*業務が空の場合ループ終了*/
					} else {
						break;
					}
				}

				for (var n = 0; n < 10; n++) {
					/*更新クライアント名を取得*/
					var update = document.getElementById('update' + (n + 1)).value;

					/*更新件数を取得*/
					var updateNum = document.getElementById('update_num' + (n + 1)).value;

					/*更新件数を出力*/
					if (update) {
						/*出力の出し分け*/
						if (n === 0) {
							/*1回目*/
							text.insertAdjacentHTML('beforeend', '<br><br>【更新】<br>-' + update + '&nbsp;&nbsp;' + updateNum + '件');
						} else {
							/*2回目以降*/
							text.insertAdjacentHTML('beforeend', '<br>-' + update + '&nbsp;&nbsp;' + updateNum + '件');
						}
						/*クライアント名が空の場合ループ終了*/
					} else {
						break;
					}
				}


				/*所感を取得*/
				var imp = document.getElementById('imp').value;
				/*改行処理*/
				imp = imp.replace(/\r\n/g, "\n");
				imp = imp.replace(/\n/g, '<br>');
				/*所感の値があるときのみ出力する*/
				if (imp) {
					/*所感を出力*/
					text.insertAdjacentHTML('beforeend', '<br><br>【所感】<br>' + imp);
				}
				
				/*明日の予定を取得*/
				var tommorow = document.getElementById('tomorrow').value;
				/*改行処理*/
				imp = tommorow.replace(/\r\n/g, "\n");
				imp = tommorow.replace(/\n/g, '<br>');
				/*明日の予定の値があるときのみ出力する*/
				if (tommorow) {
					/*明日の予定を出力*/
					text.insertAdjacentHTML('beforeend', '<br><br>【明日の予定】<br>' + tommorow);
				}

				/*勤怠報告*/
				/*出勤時刻を取得*/
				const clockIn = document.getElementById('clockIn').value;
				/*時刻を整形*/
				const clockInSplit = clockIn.split(':');
				const clockInTime = parseInt(clockInSplit[0]) + '時' + clockInSplit[1] + '分';

				/*退勤時間を取得*/
				const clockOut = document.getElementById('clockOut').value;
				/*時刻を整形*/
				const clockOutSplit = clockOut.split(':');
				const clockOutTime = parseInt(clockOutSplit[0]) + '時' + clockOutSplit[1] + '分';

				/*勤務時間を取得*/
				/*勤務時間を分単位に変換*/
				/*出勤時刻を変換*/
				const clockInMinutes = 60 * clockInSplit[0] + clockInSplit[1] * 1;
				/*退勤時間を変換*/
				let clockOutMinutes
				if (clockOutSplit[0] > 10) {
					clockOutMinutes = 60 * clockOutSplit[0] + clockOutSplit[1] * 1;
				} else { //日付が変わった時の処理
					clockOutMinutes = 60 * (clockOutSplit[0] * 1 + 24 * 1) + clockOutSplit[1] * 1;
				}
				/*勤務時間を計算*/
				const workHourMinutes = clockOutMinutes - clockInMinutes - 60; //休憩時間を引く
				/*勤務時間を整形*/
				let workHour;
				if (workHourMinutes % 60 === 0) { //00分の時の処理
					workHour = Math.floor(workHourMinutes / 60) + '時間';
				} else {
					workHour = Math.floor(workHourMinutes / 60) + '時間' + (workHourMinutes % 60) + '分';
				}

				/*残業時間を取得*/
				/*残業時間を計算*/
				const overTimeMinutes = workHourMinutes - 480;
				/*残業時間を整形*/
				let overTime;
				if (overTimeMinutes % 60 === 0) { //00分の時の処理
					overTime = Math.floor(overTimeMinutes / 60) + '時間';
				} else {
					overTime = Math.floor(overTimeMinutes / 60) + '時間' + (overTimeMinutes % 60) + '分';
				}

				/*勤怠報告を出力*/
				/*
			if (clockIn && clockOut) {
				if (overTimeMinutes > 0) {
					text.insertAdjacentHTML('beforeend', '<br><br>【勤怠報告】<br>出勤時刻：' + clockInTime + '<br>退勤時間：' + clockOutTime + '<br>勤務時間：' + workHour + '（休憩時間1時間を除く）' + '<br>残業時間：' + overTime);
				} else {
					text.insertAdjacentHTML('beforeend', '<br><br>【勤怠報告】<br>出勤時刻：' + clockInTime + '<br>退勤時刻：' + clockOutTime + '<br>勤務時間：' + workHour + '（休憩時間1時間を除く）');
				}
			}
			*/
				const switch1 = document.getElementById('switch1').checked;
				if (switch1) {
					if (clockIn && clockOut) {
						text.insertAdjacentHTML('beforeend', '<br><br>【勤怠報告】<br>出勤時刻：' + clockInTime + '<br>退勤時刻：' + clockOutTime + '<br>勤務時間：' + workHour + '（休憩時間1時間を除く）');
					}
				}

				/*メール送信ボタンを生成*/
				text.insertAdjacentHTML('afterend', '<button id="mailButton">メールで送る</button>');
			} else {
				outputSection.insertAdjacentHTML('afterbegin', '<p id="text"><span style="color:#666;">※氏名を入力してください！</span></p>');
			}

			/*メール送信ボタン押下時の動作*/
			var mailButton = document.getElementById('mailButton');
			mailButton.onclick = function () {

				/*宛先・CCを設定*/
				var to = 'sato@ga-design.jp'
				var cc = 'fukuda@ga-design.jp,morinishi@ga-design.jp,tsuboi@ga-design.jp'

				/*タイトルを設定*/
				var subject = "【" + userName + "】業務報告" + "【" + reportDate() + '】';

				/*本文を取得*/
				var body = document.getElementById('text').innerHTML;
				/*改行コードを置き換え*/
				body = body.replace(/<br>/g, '%0D%0A');
				body = body.replace(/&nbsp;/g, '%20');

				/*mailtoを実行*/
				location.href = 'mailto:' + to + '?cc=' + cc + '&subject=' + subject + '&body=' + body + '%0D%0A';
			};
		};
	};
})();