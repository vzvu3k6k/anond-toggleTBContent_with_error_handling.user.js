// ==UserScript==
// @name           はてな匿名ダイアリー: toggleTBContent with error handling
// @description    インラインで投稿を開くのに失敗したらエラーメッセージを表示する
// @version        1.0
// @author         vzvu3k6k
// @match          http://anond.hatelabo.jp/*
// @namespace      http://vzvu3k6k.tk/
// @license        CC0
// ==/UserScript==

var main = function(){
  // トップページではwindow.jsonpが定義されていない
  if(typeof window.jsonp !== 'function') return;

  eval('window.jsonp = ' + window.jsonp.toString().replace('script.src = url;', function(){
    // replaceの第二引数に文字列ではなく関数を渡しているのは
    // Replacement Text Symbol Substitutionが意図せず発生するのを防ぐため
    return '( ' + function(){
      script.src = url;

      var match = /^\/(\d{14})\?mode=json&callback=setTBContent$/.exec(url);
      if(match){
        script.addEventListener('error', function(){
          setTBContent({
            body: "<b>投稿が見つかりませんでした。</b>",
            id: match[1]
          });
        });
      }
    } + '());';
  }));
};

location.href = 'javascript:(' + main + ')()';
