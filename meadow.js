var express = require('express');
var app = express();

// 设置handlebars 视图引擎
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 静态文件目录
app.use(express.static(__dirname + '/public'));

// process.env.PORT 读取当前目录下环境变量port的值
app.set('port', process.env.PORT || 3000);

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.get('/', function (req, res) {
    // res.type('text/plain');
    // res.send('Meadowlark Travel');
    res.render('home');
});

app.get('/about', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about',{fortune:randomFortune});
});

// 404 ctch-all 处理器（中间件）
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

//  500错误处理（中间件）
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});