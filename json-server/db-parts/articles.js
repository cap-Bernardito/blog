module.exports = [
  {
    id: 1,
    title: "Javascript news",
    excerpt:
      "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка., JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем ...",
    img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
    views: 1022,
    createdAt: "26.02.2022",
    type: ["IT"],
    body: [
      { tag: "h1", type: "heading", body: "Javascript news", id: 2 },
      {
        tag: "h2",
        type: "heading",
        body: "Что нового в JS за 2022 год?",
        id: 5,
      },
      {
        tag: "p",
        type: "paragraph",
        body: "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.,\nJavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.,",
        id: 8,
      },
      {
        tag: "h2",
        type: "heading",
        body: "Существуют и другие способы запуска JS-кода в браузере",
        id: 11,
      },
      {
        tag: "p",
        type: "paragraph",
        body: "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега &lt;script&gt;.",
        id: 14,
      },
      {
        id: 15,
        type: "fence",
        tag: "code",
        body: '<pre class="hljs"><code class="language-js"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {\n  <span class="hljs-attr">module</span>: {\n    <span class="hljs-attr">rules</span>: [\n      {\n        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.less$/i</span>,\n        <span class="hljs-attr">use</span>: [\n          <span class="hljs-comment">// compiles Less to CSS</span>\n          <span class="hljs-string">&quot;style-loader&quot;</span>,\n          <span class="hljs-string">&quot;css-loader&quot;</span>,\n          <span class="hljs-string">&quot;less-loader&quot;</span>,\n        ],\n      },\n    ],\n  },\n};\n</code></pre>',
        attrs: [["class", "language-js"]],
      },
      {
        tag: "p",
        type: "paragraph",
        body: "Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:&quot;",
        id: 18,
      },
    ],
  },
  {
    id: 2,
    title: "Javascript news",
    excerpt:
      "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка., JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем ...",
    img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
    views: 1022,
    createdAt: "26.02.2022",
    type: ["IT"],
    body: [
      { tag: "h1", type: "heading", body: "Javascript news", id: 2 },
      {
        tag: "h2",
        type: "heading",
        body: "Что нового в JS за 2022 год?",
        id: 5,
      },
      {
        tag: "p",
        type: "paragraph",
        body: "Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.,\nJavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.",
        id: 8,
      },
      { tag: "h2", type: "heading", body: "Images", id: 11 },
      {
        type: "image",
        tag: "img",
        attrs: {
          src: "https://octodex.github.com/images/minion.png",
          alt: "Minion",
        },
        id: 14,
      },
      {
        tag: "p",
        type: "paragraph",
        body: "Like links, Images also have a footnote style syntax",
        id: 17,
      },
      {
        tag: "h2",
        type: "heading",
        body: "Существуют и другие способы запуска JS-кода в браузере",
        id: 20,
      },
      {
        tag: "p",
        type: "paragraph",
        body: "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега &lt;script&gt;.",
        id: 23,
      },
      {
        id: 24,
        type: "fence",
        tag: "code",
        body: '<pre class="hljs"><code class="language-js"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {\n  <span class="hljs-attr">module</span>: {\n    <span class="hljs-attr">rules</span>: [\n      {\n        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.less$/i</span>,\n        <span class="hljs-attr">use</span>: [\n          <span class="hljs-comment">// compiles Less to CSS</span>\n          <span class="hljs-string">&quot;style-loader&quot;</span>,\n          <span class="hljs-string">&quot;css-loader&quot;</span>,\n          <span class="hljs-string">&quot;less-loader&quot;</span>,\n        ],\n      },\n    ],\n  },\n};\n</code></pre>',
        attrs: [["class", "language-js"]],
      },
      {
        tag: "p",
        type: "paragraph",
        body: "Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:",
        id: 27,
      },
    ],
  },
];
