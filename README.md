# 使い方
0. ファイルを読み込む。例：`<script src="commonSlider.js"></script>`
0. HTMLを書く（※1）
0. クラスをnewする（※2）
0. 終わり

## ※1
```
<ul class="gift_illust" style="margin: 0; padding: 0;">
    <li><img src="/images/001.jpg" data-author="ここに絵を描いた人とか書いておくと表示される"></li>
    <li><img src="/images/002.jpg" data-author="Autor Name"></li>
    <li><img src="/images/003.png" data-author="Autor Name"></li>
    <li><img src="/images/004.jpg" data-author="Autor Name"></li>
</ul>
<div class="gift_illust_slider"></div>
```


## ※2
```
<script>
var cs = new commonSlider('.gift_illust');
</script>
```
