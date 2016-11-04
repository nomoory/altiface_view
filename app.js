const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/altiface/reports/ranking/json',function (req,res) {
  var msg = {"fname":req.body.fname, "lname":req.body.lname};
  console.log(msg);
    res.send(msg);
});
app.get('/altiface/reports/:report/:term',function (req,res) {
  var report = req.params.report;
  var term = req.params.term;
  switch (report) {
    case 'ranking':
      switch (term) {
        case 'live':
          res.sendFile(path.join(__dirname,'public/templates/index.html'));
          break;
        case 'json':
        var msg = {"req":req.query.msg};
        console.log("ss");
        var msgs = JSON.stringify(msg);
          res.send(msgs);
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }

  // template html file에 live data 적용
  // 추후에 웹의 자바스크립트가 1) onload 시 데이터 ajax로 요청 2) 주기적으로 데이터 ajax로 요청
  // template와 연결된 자바스크립트의 역할 1) 주기적 요청 이벤트 발생 2) 로드된 데이터 스코프에 저장
  // 스코프 자료에 변화가 생기는 동시에 interpolation 변경 및 css animation 발생
  // 1) animation 발생 트리거를 어떤 이벤트로 하지? 2) 애니메이션은 어떻게 주지?
});

app.listen(3300,function () {
  console.log('port 3300 connected!!');
});
