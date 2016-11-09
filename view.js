// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
const express = require('./config/express');
const fs = require('fs');
const path = require('path');

// Create a new Express application instance
const app = express();

// altiface/reports/ranking/json
app.post('/ajax', function(req, res) {
    var msg = {
        "fname": req.body.fname,
        "lname": req.body.lname
    };
    console.log(msg);
    res.send(msg);
});

app.get('/refresh', function(req, res) {
    var rankingInform = {
        "data": [{
            "person_id": 1,
            "total_time": 180,
            "name": "김수현",
            "uri": "http://pds.joins.com/news/component/moneytoday/201312/26/2013122607575744978_1.jpg"
        }, {
            "person_id": 2,
            "total_time": 150,
            "name": "전지현",
            "uri": "http://img.seoul.co.kr/img/upload/2013/12/27/SSI_20131227112812_V.jpg"
        }, {
            "person_id": 1,
            "total_time": 122,
            "name": "박해진",
            "uri": "http://img.tf.co.kr/article/home/2014/01/24/201472611390491749.jpg"
        }, ]
    }
    res.send(rankingInform);

});

app.get('/js/:path', function(req, res) {
    var pathoffile = req.params.path;
    res.send(path.join(__dirname, '/js', pathoffile));
});

app.get('/altiface/reports/:report/:term', function(req, res) {
    var report = req.params.report;
    var term = req.params.term;
    switch (report) {
        case 'ranking':
            switch (term) {
                case 'live':
                    res.sendFile(path.join(__dirname, 'public/templates/index.html'));
                    break;
                case 'json':
                    var msg = {
                        "req": req.query.msg
                    };
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

app.listen(3300, function() {
    console.log('port 3300 connected!!');
});
