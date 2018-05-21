
# NewsFeeder
(For Russian version see below)
## Demo
A working demo can be found [here](https://cookiehunter22.github.io/newsfeeder/dist/).

### Purpose

Perhaps, some of you have a blog or a news website. Adding news requires either CMS or at least some basic knowledge of HTML. What if you have none?
This project is an attempt to offer another way of updating news on your website. NewsFeeder is a simple widget that consists of two parts. A [Telegram bot](https://t.me/news_box_bot) serves as an input source and a client-side widget, that displays news on your website.

### Bot
The bot will help you to manage your posts and add new ones. Today it supports a few simple commands:

_/create_ - initiates the creation of the post
_/delete_ - offers a list of your posts to delete
_/list_ - lists your posts
_/abort_ - aborts any active procedure
_/getid_ - returns you user ID, which is used to request news on the client-side

### Widget
The client-side part is the combination of two [owl-carousels](http://www.landmarkmlp.com/js-plugin/owl.carousel/index.html). Its design is fully responsive and ready for production. The main carousel displays six recent news, whereas the secondary one keeps track of all previous articles. Click on the title will invoke a modal with the full article.

### Installation
You will only need the _./dist_ folder. Move it to your projects directory.
1) Add a few lines in your HTML's head and body:
```
<head>
    <!-- Import bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!--Import newsfeeder CSS-->
    <link href="newsfeeder.min.css" rel="stylesheet"></head>

</head>
<body>
    <!--Invoke modal-->
    <div id="myModal" class="bot-modal"></div>
    <!--Invoke carousels-->
    <div id="container-newsbox"></div>

    <!--Import configuration file-->
    <script type="text/javascript" src="newsfeeder.config.js"></script>
    <!--Import jQuery-->
    <script type="text/javascript" src="jquery-3.3.1.min.js"></script>
    <!--Import newsfeeder JS-->
    <script type="text/javascript" src="newsfeeder.min.js"></script></body>
</body>
```
2) Edit the configuration file (_newsfeeder.config.js_):

| Property name        |  Description  | Format
| :-------------: | :-----:| :--------:|
| id      | Your user ID. Can be obtained by sending _/getid_ command to the [bot](https://t.me/news_box_bot) | numeric|
| feedColorMain      |  background color of the main Carousel| any CSS supported color fromat|
| feedColorSecondary | background color of the secondary Carousel| any CSS supported color format|
| modalColor | background color of the Modal| any CSS supported color format|
| lang | Defines language of the date| [ISO language code](http://www.mathguide.de/info/tools/languagecode.html)|

Now you are set to go. Write to the [NewsFeeder Bot](https://t.me/news_box_bot) and post your articles!
I encourage you to use file upload instead of photo upload in Telegram since file upload will not compress your pictures. Please use photos with dimensions 360x450. Otherwise, they will be centred and cropped.

Please feel free to share your feedback!



# NewsFeeder
(Русская версия)
## Demo
Финальную версию можно посмотреть [тут](https://cookiehunter22.github.io/newsfeeder/dist/).
## Цель

Возможно, некоторые из вас имеют свой блог или новостной сайт, однако, для добавления новых новостей необходимо иметь Систему управления контентом или хотя бы базовые знания HTML. Но что ели ни того, ни того не имеется?
Цель этого проекта предложить альтернативный подход к добавлению новостей на ваш сайт. NewsFeeder это простой виджет, который состоит из двух частей. [Бот в Telegram](https://t.me/news_box_bot) служит источником ввода, а виджет из этой репозитории отображает новости на вашем сайте.

### Бот
Бот поможет вам управлять вашими постами и создавать новые. На сегодняшний день, он поддерживает несколько простых команд:

_/create_ -начинает создание нового поста
_/delete_ - выводит список имеющихся постов, из которого можно выбрать один для удаления
_/list_ - выводит список ваших постов
_/abort_ - прерывает текущую операцию
_/getid_ - возвращает пользовательский ID, который будет использован на стороне пользователя для выполнения запроса

### Виджет
Виджет состоит из двух каруселей ( [owl-carousels](http://www.landmarkmlp.com/js-plugin/owl.carousel/index.html) ).
Дизайн полностью адоптирован для мобильных устройств. Верхняя, главная карусель отображает 6 последних постов, в то время как нижняя отображает все остальные. При нажатии на заголовок новости открывается всплывающее окно с полным текстом статьи.

### Установка
Вам потребуется только папка _./dist_. Переместите ее в папку вашего проекта.
1) Добавьте несколько строк в HTML код страницы:
```
<head>
    <!-- Import bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!--Import newsfeeder CSS-->
    <link href="newsfeeder.min.css" rel="stylesheet"></head>

</head>
<body>
    <!--Invoke modal-->
    <div id="myModal" class="bot-modal"></div>
    <!--Invoke carousels-->
    <div id="container-newsbox"></div>

    <!--Import configuration file-->
    <script type="text/javascript" src="newsfeeder.config.js"></script>
    <!--Import jQuery-->
    <script type="text/javascript" src="jquery-3.3.1.min.js"></script>
    <!--Import newsfeeder JS-->
    <script type="text/javascript" src="newsfeeder.min.js"></script></body>
</body>
```
2) Отредактируйте файл с конфигурацией (_newsfeeder.config.js_):

| Опция        |  Описание  | Формат
| :-------------: | :-----:| :--------:|
| id      | Ваш пользовательский ID. Может быть получен, если отправить [боту](https://t.me/news_box_bot) команду _/getid_ | числовой|
| feedColorMain      |  цвет фона главной карусели| любой поддерживаемый CSS формат|
| feedColorSecondary | цвет фона нижней карусели | любой поддерживаемый CSS формат|
| modalColor | цвет фона всплывающего окна с полным текстом статьи| любой поддерживаемый CSS формат|
| lang | Определяет языковой формат даты| [ISO language code](http://www.mathguide.de/info/tools/languagecode.html)|

Все готово! Напиши [NewsFeeder Bot](https://t.me/news_box_bot) и публикуй свои новости прямо сейчас!
Я рекомендую использовать в Телеграме загрузку файлов, а не загрузку фото. Закрузка фото приведет к сжатию ваших изображений и ухудшению качества. Используйте картинки размером 360х450. В противном случае, картинки будут оцентрованы и обрезаны.

Буду благодарен за ваш feedback!
