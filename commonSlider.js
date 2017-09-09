
/**
 * 画像のスライダー
 * @return {void}
 */
var commonSlider = (function(){

    /**
    * コンストラクタ
    * @constructor
    */
    function commonSlider(elem_name){
        // 要素名を保持しておく
        this.element_name = elem_name;

        // 要素名から要素を取得
        this.panel = $(this.element_name);

        // スライダーボタンのクラス名
        this.element_btn_name = 'btn_' + this.element_name.replace(/[.]/g, '');
        this.element_btn_name += '_gift_illust_slider_button';


        // 初期設定を行う
        this.initialize(this.element_name);
    }


    /**
     * 画像スライダーの初期状態を設定します
     * @param  {string} element_name 対象の画像をのulのクラス名を渡します
     * @return {void}
     */
    commonSlider.prototype.initialize = function(element_name){
        // スライダーのボタンのHTMLを入れる変数
        var illust_button_html = '';

        // 著者名を表示するため、ul要素にrelativeを入れる
        $(element_name).css('position', 'relative');

        // イラストのliをすべて取得する
        var list = $(element_name + ' li');

        // 最初のもの以外を非表示にする
        for ( var i=0; i<list.length; i++ ){
            if ( i !== 0 ){
                $(list[i]).css('display', 'none');
            }

            // data要素追加
            $(list[i]).attr('data-illust_index', i);

            // スライダーのHTMLリンクを作成
            illust_button_html += '<a href="#!" class="'+ this.element_btn_name +'" data-illustnum="'+ i +'">●</a>　';
        }

        // スライダーボタンを表示
        $(element_name + '_slider').html('<div style="text-align: center;">' + illust_button_html + '</div>');

        // 著者を表示する要素を作成
        $(element_name + ' li').append('<div class="'+ element_name.replace(/[.]/g, '') +'_author"></div>');

        // 著者の表示
        let author = this.getAuthor($(list));
        this.setAuthor(author);

        // クリックイベントを結びつける
        document.addEventListener('mousedown', this.mouseDown.bind(this), false);
    }


    /**
     * クリックされたことを検知
     * @param  {object} e イベントが入る
     */
    commonSlider.prototype.mouseDown = function(e){
        // クリックされたのがスライダーのボタンかを調べ、違っていたら
        if ( e.target.className !== this.element_btn_name ){
            // 処理を抜ける
            return false;
        }

        // クリックされた要素のdata-illustnumの値を取得
        let illust_num = e.target.dataset.illustnum

        // 今のイラストを取得
        var now_illust = $(this.element_name + ' li:visible');
        if ( illust_num === now_illust.attr('data-illust_index') ){
            return false;
        }

        // 次のイラスを取得
        var next_illust = $(this.element_name).find('li[data-illust_index="'+ illust_num +'"]');

        // 一度画像切り替えボタンを隠す
        $(this.element_name + '_slider').hide();

        // 今のイラストをフェードアウトし、クリックされたイラストをフェードイン
        $(now_illust).fadeOut(300, function(element_name){
            $(next_illust).fadeIn(300);
        });

        // 著者の表示
        let author = this.getAuthor(next_illust);
        this.setAuthor(author);

        // 画像切り替えボタンを表示する
        $(this.element_name + '_slider').show();
    }


    /**
     * 指定された要素の著者名を取得する
     * @param  {object} elem 取得する著者名が書いてある要素名
     * @return {string}      著者名
     */
    commonSlider.prototype.getAuthor = function(elem){
        // 著者名を取得
        let author = $(elem).find('img').attr('data-author');

        return author;
    }


    /**
     * 要素に著者名をセットする
     * @param  {string} author_name 著者名
     */
    commonSlider.prototype.setAuthor = function(author_name){
        $(this.element_name + '_author').html('Illustration by ' + author_name)
        .css({
            "position": "absolute",
            "bottom": 0,
            "left": 0,
            "right": 0,
            "color": "#fff",
            "background-color": "#000",
            "opacity": 0.8,
            "height": "25px"
        });

    }

    return commonSlider;
})();
