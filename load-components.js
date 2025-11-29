// ヘッダーとフッターを動的に読み込む（XMLHttpRequestを使用）
function loadComponents() {
    // 呼び出し元のパスに応じてheader/footerのパスを切り替え
    const isPost = window.location.pathname.includes('/post/');
    const headerPath = isPost ? '../header.html' : 'header.html';
    const footerPath = isPost ? '../footer.html' : 'footer.html';

    // ヘッダーの読み込み
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        loadHTML(headerPath, headerContainer, initializeMenu);
    }

    // フッターの読み込み
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        loadHTML(footerPath, footerContainer);
    }
}

// XMLHttpRequestでHTMLを読み込む（CORS対策）
function loadHTML(url, container, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            container.innerHTML = xhr.responseText;
            if (callback) callback();
        } else {
            console.error(url + ' の読み込みに失敗しました:', xhr.status);
            container.innerHTML = '<p>読み込みエラー</p>';
        }
    };
    xhr.onerror = function() {
        console.error(url + ' のネットワークエラー');
        container.innerHTML = '<p>ネットワークエラー</p>';
    };
    xhr.send();
}

// メニューの初期化関数
function initializeMenu() {
    const ham = document.getElementById('hamburger');
    const closeBtn = document.querySelector('.close');
    const pagelinks = document.querySelectorAll('.page-nav .pagelink');
    const nav = document.querySelector('.page-nav');

    if (ham && nav) {
        ham.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('toggle');
        });
    }

    if (closeBtn && nav) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('toggle');
        });
    }

    pagelinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav) {
                nav.classList.remove('toggle');
            }
        });
    });
}

// DOMContentLoadedの後に実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
