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

		/*出力ボタン押下時の動作*/
		var inputButton = document.getElementById('inputButton');
		inputButton.onclick = function () {

			var outputSection = document.getElementById('output');
			removeAllChildren(outputSection);

			/*名前を取得*/
			var userName = document.getElementById('name').value;
			//			console.log(userName);

			/*名前を出力*/
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
							text.insertAdjacentHTML('beforeend', '<br><br>【業務】<br>・' + job + '<br>' + jobDisc);
						} else {
							text.insertAdjacentHTML('beforeend', '<br><br>【業務】<br>・' + job);
						}

					} else {
						/*2回目以降*/
						if (jobDisc) {
							text.insertAdjacentHTML('beforeend', '<br><br>・' + job + '<br>' + jobDisc);
						} else {
							text.insertAdjacentHTML('beforeend', '<br><br>・' + job);
						}
					}
					/*業務が空の場合ループ終了*/
				} else {
					break;
				}
			}

			for (var n = 0; n < 5; n++) {
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

			/*メール送信ボタンを生成*/
			text.insertAdjacentHTML('afterend', '<button id="mailButton">メールで送る</button>');

			/*メール送信ボタン押下時の動作*/
			var mailButton = document.getElementById('mailButton');
			mailButton.onclick = function () {

				/*宛先・CCを設定*/
				var to = 'sato@ga-design.jp'
				var cc = 'fukuda@ga-design.jp,morinishi@ga-design.jp'

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