module.exports = [
  {
    id: 1,
    title: "Javascript news",
    excerpt:
      'ООП позволяет разрабатывать сложные системы, которые могут быть легко поняты, поддержаны и модифицированы. ООП - это методология программирования, которая строится на концепции "объектов". Объекты представляют собой экземпляры классов, которые ...',
    img: "https://itproger.com/img/news/x1696684049.jpg.pagespeed.ic.QKaUI4ezRm.webp",
    views: 1022,
    createdAt: "26.02.2022",
    type: ["IT"],
    body: [
      {
        tag: "p",
        type: "paragraph",
        body: "ООП позволяет разрабатывать сложные системы, которые могут быть легко поняты, поддержаны и модифицированы.",
        id: 2,
      },
      {
        tag: "h2",
        type: "heading",
        body: "Что такое объектно-ориентированное программирование?",
        id: 5,
      },
      {
        tag: "p",
        type: "paragraph",
        body: "ООП - это методология программирования, которая строится на концепции &quot;объектов&quot;. Объекты представляют собой экземпляры классов, которые являются шаблонами для создания объектов. В ООП данные и функции, которые с ними работают, объединяются в единые сущности - объекты. Это позволяет абстрагировать сложные системы, делая их более модульными и понятными.",
        id: 8,
      },
      {
        tag: "h2",
        type: "heading",
        body: "Пример применения принципов ООП",
        id: 11,
      },
      {
        tag: "p",
        type: "paragraph",
        body: "Давайте рассмотрим простой пример применения принципов ООП на языке программирования Python.",
        id: 14,
      },
      {
        id: 15,
        type: "fence",
        tag: "code",
        body: 'class Animal:\n\tdef __init__(self, name):\n\t\tself.name = name\n\n\tdef speak(self):\n\t\tpass\n\nclass Dog(Animal):\n\tdef speak(self):\n\t\treturn f"{self.name} говорит: Гав!"\n\nclass Cat(Animal):\n\tdef speak(self):\n\t\treturn f"{self.name} говорит: Мяу!"\n\n# Создаем объекты\ndog = Dog("Барсик")\ncat = Cat("Мурзик")\n\n# Вызываем метод speak() для объектов разных классов\nprint(dog.speak()) # Вывод: "Барсик говорит: Гав!"\nprint(cat.speak()) # Вывод: "Мурзик говорит: Мяу!"\n',
        attrs: { lang: "python" },
      },
      {
        tag: "p",
        type: "paragraph",
        body: "В этом примере у нас есть базовый класс <code>Animal</code>, который имеет атрибут <code>name</code> и метод <code>speak()</code>, который будет переопределен в подклассах <code>Dog</code> и <code>Cat</code>. Это демонстрирует принцип наследования и полиморфизма.",
        id: 18,
      },
      { tag: "h2", type: "heading", body: "Заключение", id: 21 },
      {
        tag: "p",
        type: "paragraph",
        body: "Изучение основных принципов ООП в программировании является фундаментальным шагом для разработчиков. ООП помогает создавать модульный, понятный и гибкий код, что упрощает разработку, поддержку и масштабирование программных систем. Независимо от языка программирования, освоение ООП обогатит ваши навыки и позволит создавать более эффективное и надежное программное обеспечение.",
        id: 24,
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
        body: 'module.exports = {\n  module: {\n    rules: [\n      {\n        test: /\\.less$/i,\n        use: [\n          // compiles Less to CSS\n          "style-loader",\n          "css-loader",\n          "less-loader",\n        ],\n      },\n    ],\n  },\n};\n',
        attrs: { lang: "js" },
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
