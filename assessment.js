(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
    * 指定した要素の子どもを全て除去する
    * @param {HTMLElement} element HTMLの要素
    */
    function removeAllChildren(element) {
        while (element.firstChild) { // 子どもの要素があるかぎり削除
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) { // 名前が空の時は処理を終了する
            return;
        }

        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text='
        + encodeURIComponent(result);
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AB%E3%82%AA%E3%82%B9%E3%82%B9%E3%83%A1%E3%81%AETV%E3%82%B2%E3%83%BC%E3%83%A0%E3%82%B8%E3%83%A3%E3%83%B3%E3%83%AB';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    };

    userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick();
        }
    };

    const answers = [
        '{userName}さんにピッタリのゲームは「アクションゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「GOD HAND、火の鳥 鳳凰編、ワイワイワールド2、ゴエモンシリーズ、マリオシリーズ」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「格闘ゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「闘神伝シリーズ、Fight of Gods、ファイターズヒストリー、北斗の拳、豪血寺一族、ハイパーストリートファイターII、ギルティギアシリーズ」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「音楽ゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「BM98、beatmania、DJMAX」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「レースゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「リッジレーサーシリーズ、THE CREW、TrackManiaシリーズ、マリオカートシリーズ」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「シューティングゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「ダライアスシリーズ、ぐわんげ、斑鳩、魔法大作戦、虫姫さま、Pop\'nツインビー」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「乙女ゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「アンジェリーク、薄桜鬼、ときめきメモリアル Girl\'s Side」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「オンラインゲーム(MMO)」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「ウルティマオンライン、ラグナロクオンライン、ドラゴンクエストX」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「ロールプレイングゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「ソウルブレイダー、ルーンファクトリーシリーズ、メタルマックスシリーズ、ノーラと刻の工房、グランディア、デビルサマナーシリーズ」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「ローグライクゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「Elona、FTL: Faster Than Light、SUNLESS SEA、トルネコの大冒険、風来のシレン」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「アドベンチャーゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「リメイクお願いします！MYSTシリーズ、みつめてナイト、同級生2、EVE burst error、DESIRE」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「ホラーゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「UFO END大好き！サイレントヒルシリーズ、零シリーズ、SIRENシリーズ、F.E.A.R.、System Shockシリーズ」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「シミュレーションゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「手強いシミュレーション！ファイアーエムブレムシリーズ、フロントミッション、半熟英雄」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「ストラテジー系のゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「あともう１ターン！Civilizationシリーズ、Age of Empiresシリーズ、RimWorld、Wastelandシリーズ」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「サンドボックス系のゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「Minecraft、Terraria、Space Engineers、ドラゴンクエストビルダーズ」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「パズルゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「ぷよぷよ通、パネルでポン、XI」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>',
        '{userName}さんにピッタリのゲームは「カードゲーム」です。<br>ちなみに独断と偏見で個人的にオススメなゲームは「ファイナルファンタジー8のミニゲームTriple Triad、WITCHER3のミニゲームGWENT」です。<p>※家庭用のTVゲームもしくはPCゲームがメインで、ソーシャルゲームは入っていません。</p>'
    ];

    /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */
    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g, userName);
        return result;
    }

    // テストコード
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
