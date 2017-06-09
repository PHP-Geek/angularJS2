/**
 * Created by erginus-hybrid on 15/4/17.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var calendar = require('node-calendar');

var path = require('path');
var fs = require('fs');

var crud = require('../recoreTalent_operations/operations');
var recoreTalentMail = require('../recoreTalent_operations/sendMail.js');

router.post('/login', function(req, res){
        console.log(req.body);
    crud.login(req.body.username, req.body.password, function(data, id){
        //console.log(data);
        //res.json(data);
        if(data === 'ok'){
            //if(data[0].user_type === 1){
            //    req.session.organiztion_id = data[0].organiztion_id;
            //}else{
            //    req.session.organiztion_id = data[0].organiztion_id;
            //}
            if(id[0].group_id === 2){
                req.session.recore_username = req.body.username;
                req.session.recore_password = req.body.password;
            }else{
                req.session.recore_Admin_username = req.body.username;
            }
            req.session.recore_GROUP_ID = id[0].group_id;
            req.session.NEXT_WEEK_CONTSTANT = 7;
            req.session.PREVIOUS_WEEK_CONTSTANT = 7;
            console.log('session created', req.session.recore_username);
            console.log('here i loged in successfuly');
            res.json({value : 'ok', id : id[0].group_id});
            res.end();
        }else{
            console.log('Your username/password incorrect');
            res.json('not_ok');
            res.end();
        }
    })
})

router.post('/isLoggedIn', function(req, res){
    if(req.session.recore_GROUP_ID !== undefined && req.session.recore_GROUP_ID !== ''){
        res.json(req.session.recore_GROUP_ID);
        res.end();
    }else{
        res.json('not_ok');
        res.end();
    }
})

router.get('/logout',function(req, res){
    req.session.destroy(function(err){
        if(err) throw err;
    });
    res.redirect('http://localhost:3000/');
    res.end();
});

router.post('/getEmployerAndEmployees', function(req, res){
    console.log(req.body);
    crud.getEmployerAndEmployees(parseInt(req.body.limit), function(data){
        if(data){
            res.json(data);
            res.end();
        }else{
            res.json('Server Internal Problem Occured !......');
            res.end();
        }
    })
})

router.post('/setQualification', function(req, res){
    console.log(req.body);
    crud.setQualification(req.body, function(data){
        if(data === 'ok'){
            res.json('Qualification Course '+req.body.course_name+' Successfull Added !......');
            res.end();
        }else{
            res.json('Server Internal Problem Occured !......');
            res.end();
        }
    })
})

router.post('/setSkills', function(req, res){
    console.log(req.body);
    crud.setSkills(req.body, function(data){
        if(data === 'ok'){
            res.json('Qualification Course '+req.body.course_name+' Successfull Added !......');
            res.end();
        }else{
            res.json('Server Internal Problem Occured !......');
            res.end();
        }
    })
})

router.post('/setDesiredCompensation', function(req, res){
    console.log(req.body.length);
    crud.setDesiredCompensation(req.body, function(data){
        if(data === 'ok'){
            res.json('Qualification Course '+req.body.course_name+' Successfull Added !......');
            res.end();
        }else{
            res.json('Server Internal Problem Occured !......');
            res.end();
        }
    })
})

router.post('/getQualification', function(req, res){
    crud.getQualification(function(data){
        if(data.length !== 0){
            res.json(data);
            res.end();
        }else{
            res.json('Server Internal Problem Occured !......');
            res.end();
        }
    })
})

router.post('/getSkills', function(req, res){
    crud.getSkills(function(data){
        if(data.length !== 0){
            res.json(data);
            res.end();
        }else{
            res.json('Server Internal Problem Occured !......');
            res.end();
        }
    })
})

router.post('/getDesiredCompensation', function(req, res){
    crud.getDesiredCompensation(function(data){
        if(data.length !== 0){
            res.json(data);
            res.end();
        }else{
            res.json('Server Internal Problem Occured !......');
            res.end();
        }
    })
})

router.post('/getUserDetail', function(req, res){
    console.log('Listen This Is For Only test to check our creted sessions', req.session.recore_username);
    console.log('Listen This Is For Only test to check our creted sessions', req.session.candidate_resume);
    console.log('Listen This Is For Only test to check our creted sessions', req.session.candidate_image);;

    crud.getUserDetail(req.session.recore_username, function (data) {
        if(data && data.length !== 0){
            res.json(data);
            res.end();
        }else{
            res.json('Nothing Here Is Found!......');
            res.end();
        }
    })

})

router.post('/getQalificationAndSkills', function(req, res){
    crud.getQalificationAndSkills(function(data){
        if(data){
            res.json(data);
            res.end();
        }else{
            res.end();
        }
    })
})

router.post('/getCourses', function(req, res){
    console.log(req.body);
    crud.getCourse(req.body.course, function(data){
        if(data){
            res.json(data);
            res.end();
        }else{
            res.end();
        }
    })
})

router.post('/getUserAndCandidates', function(req, res){
    crud.getUserAndCandidate(function(data) {
        res.json(data);
        res.end();
    })
});

router.post('/setCountOfView', function(req, res){

    if(req.session.recore_username !== undefined){
        console.log('Listen bro i am enter here !........', req.body.username)
        crud.setCountOfView(req.body.username, function(data){
            if(data === 'ok'){
                res.json('successfully done');
                res.end();
            }
        });
    }
})

router.post('/getMostViewCandidates', function(req, res){

    console.log(req.body);
    crud.getCountOfView(function(data){
        if(data.length !== 0){
            res.json(data);
            res.end();
        }
    });
})

router.post('/scheduleInterview', function(req, res){

    crud.secheduleInterview(req.body, function(data){
        console.log('hello');
        res.json(data);
        res.end();
    })
})

router.post('/getscheduleInterview', function(req, res){

    crud.getsecheduleInterview(function(data){
        console.log('hello');
        res.json(data);
        res.end();
    })
})

router.post('/getScheduledInterviewForClient', function(req, res){

    crud.getScheduledInterviewForClient( req.session.recore_username , function(data){
        console.log('hello');
        res.json(data);
        res.end();
    })
})

router.post('/changeStatusVisible', function(req, res){
    crud.changeStatusVisible(req.body.username, function(data){
        console.log('hello');
        res.json(data);
        res.end();
    })
})

router.post('/qualificationStatusVisible', function(req, res){
    crud.qualificationStatusVisible(req.body.username, function(data){
        res.json(data);
        res.end();
    })
})

router.post('/skillStatusVisible', function(req, res){
    crud.skillStatusVisible(req.body.username, function(data){
        res.json(data);
        res.end();
    })
})

router.post('/desiredStatusVisible', function(req, res){
    crud.desiredStatusVisible(req.body.username, function(data){
        res.json(data);
        res.end();
    })
})

router.post('/changeStatusSelected', function(req, res){

    var result = req.body.data.toString().split('/');
    crud.changeStatusSelected(result, function(data){
        console.log('hello');
        res.json(data);
        res.end();
    })
})

router.post('/getResume', function(req, res){
    console.log('Listen This Is For Only test to username check our creted sessions', req.session.recore_username);
    console.log('Listen This Is For Only test to pdf check our creted sessions', req.session.candidate_resume);
    console.log('Listen This Is For Only test to image check our creted sessions', req.session.candidate_image);

    crud.getAllResume(req.session.talent_category, function (data) {
        if(data && data.length !== 0){
            res.json(data);
            res.end();
        }else{
            res.json('Nothing Here Is Found!......');
            res.end();
        }
    })

})

router.post('/getCategoryResume', function(req, res){
    crud.getCategory(req.session.talent_category, req.body.category, function (data) {
        if(data && data.length !== 0){
            res.json(data);
            res.end();
        }else{
            console.log('not_ok');
            res.json('Nothing Here Is Found!......');
            res.end();
        }
    })

})

router.post('/getCalendar', function(req, res){

    console.log('here is your input', req.body);
    console.log('here is your weekday');
    console.log('here we go',  calendar.monthrange(parseInt(req.body.year), parseInt(req.body.month)).toString().split(','));
    var array = calendar.monthrange(parseInt(req.body.year), parseInt(req.body.month)).toString().split(',');
    //'here we go    : > \n month started day  '+array[0]+'\n how many days in month   > : '+array[1]


    today = new Date();
    today.setMonth(0);
    tomorrow = new Date();
    tomorrow.setMonth(today.getMonth()+1);

    var TOTAL_COL = 35;
    var temp = 7;
    var j = 1;
    var content = '<tr>';
    //<tr><th colspan="7"><h3><div class="row"><div class="col-xs-2"><span class="left-angle leftArrow"><a><i class="fa fa-angle-left fa-2x" aria-hidden="true"></i></a></span></div><div class="col-xs-8">&nbsp;2017</div><div class="col-xs-2"><span class="right-angle rightArrow"><a><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a></span></div></div></h3></th></tr><tr><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td><td>Sun</td></tr>
    for(var i = 0 ; i < TOTAL_COL ; i++){
        if(temp > 0){
            console.log(temp);
            if(i >= array[0] && j <= array[1]){
                if(temp === 7){
                    if(j === parseInt(new Date().getDate()) && parseInt(new Date().getMonth())+1 === parseInt(req.body.month)){
                        content += '<tr><td><div class="highlight"><a href = "/dashboard/hrTalent">'+j+'</a></div></td>';
                    }else{
                        content += '<tr><td>'+j+'</td>';
                    }
                }else{
                    if(j === parseInt(new Date().getDate()) && parseInt(new Date().getMonth())+1 === parseInt(req.body.month)){
                        content += '<td > <div class="highlight"> <a href = "/dashboard/hrTalent">'+j+'</a></div></td>';
                    }else{
                        content += '<td>'+j+'</td>';
                    }
                }
                j++;
            }else{
                content += '<td>&nbsp;</td> ';
            }
            if(temp === 1){
                console.log('\n');
                content += '</tr>'
                temp = 8;
            }
        }
        temp-- ;
    }
    if(content !== ''){
        res.send(content);
    }
});

//router.post('/getWeekCalendar', function(req, res){
//    var currentDate = new Date();
//    var currentMonth = new Date().getMonth();
//    var currenYear = new Date().getFullYear();
//    var firstDayOfTheWeek = '';
//
//    //for(var i = 0; i<7; i++){
//    //
//    //}
//
//    //console.log(new calendar.Calendar(6).itermonthdates(2017, 5).toString().split(','));
//    var week = new calendar.Calendar(6).itermonthdates(2017, 5).toString().split(',');
//    var array = [];
//    var temp = [];
//    for(var i= 0; i<35 ; i++){
//        if(i%7 === 0){
//            array.push(temp);
//            temp = [];
//        }else{
//            tmep.push(week[i]);
//        }
//    }
//
//    if(array.length!==0){
//        console.log(array);
//    }
//});


router.post('/register', function(req, res){
    console.log(req.body);
    crud.register_company(req.body, function(data){
        console.log(data);
        if(data === 'ok'){
            res.json("Congractulations, Dear "+req.body.email+", You Are Successfully Registered!......");
            res.end();
        }else if(data === 'err'){
            res.json(data);
            res.end();
        }else{
            res.json("Email Id Exists");
            res.end();
        }
    })
});

router.post('/changePassword', function(req, res){
    console.log(req.body);
    //crud.changePassword(req.body, function(data){
    //    console.log(data);
    //    if(data === 'ok'){
    //        res.json("Dear "+req.body.email+", You Are Successfully Changed Password!......");
    //        res.end();
    //    }else if(data === 'err'){
    //        console.log(data);
    //        res.json('Internal Server Error Occured !.......');
    //        res.end();
    //    }else{
    //        res.json("Password Not Changed");
    //        res.end();
    //    }
    //})
});

router.post('/setMyTalent', function(req, res){
   console.log(req.body);
    crud.setMyTalent(req.session.recore_username,req.body.value, req.body.description, function(data){
        if(data === 'ok'){
            res.json('talent is created');
        }
    })
});

router.post('/getMyTalent', function(req, res){
    console.log(req.body);
    crud.getMyTalent(req.session.recore_username, function(data){
        res.json(data);
    })
});

router.post('/setIdResume', function(req, res){
    console.log('listen here your id =======================================>', req.body.id);
    req.session.userResumeId = req.body.id;
    req.session.save();
    req.session.talent_category = req.body.category;
    req.session.save();
});

router.post('/getIdResume', function(req, res){
    console.log('listen here ////////////////////////', req.session.userResumeId,' and ', req.session.userResumeId);
    if(req.session.userResumeId !== undefined && req.session.userResumeId !== 'ok'){
        crud.getIdResume(req.session.userResumeId, function (data) {
            if(data && data.length !== 0){
                req.session.userResumeId = '';
                req.session.save();
                res.json({'showStatus' : 'ok', data : data});
                res.end();
            }else{
                res.json({'showStatus' : 'not_ok', data : 'There Is Nothing To show'});
                res.end();
            }
        })
    }else {
        res.json({'showStatus': 'not_ok', data: 'There Is Nothing To show'});
        res.end();
    }
});

router.post('/scheduleInterview', function(req, res){
    console.log(req.body);
    recoreTalentMail.scheduleInterviewMail(req.session.recore_username, req.body.email, function(data){
        if(data = 'sent'){
            res.json('interview scheduled successfully!.......');
            res.end();
        }else{
            res.json('Internal error!.......');
            res.end();
        }
    })
})

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './public/images');
    },
    filename : function(req, file, cb){
        console.log('here is file information', file, file.fieldname);
        cb(null, file.originalname.toString().split('.')[0]+Math.random() +'.'+file.originalname.toString().split('.')[1]);
    }
})

var upload = multer({storage : storage, limits : { fileSize : 1e+7} }).single('uploadFile');

router.post('/upload', function(req, res){
    upload(req, res, function(err){
        if(err) throw err;

        console.log('here is final file information', req.file.path);

        console.log('here is final file information', req.files);

        if(req.file.mimetype.toString().split('/')[0] === 'image'){
            req.session.candidate_image = req.file.path;
            req.session.save();
            console.log('Here is wwwwwwwwwwwresume of candidate : ',req.session.candidate_image);
        }else if(req.file.mimetype.toString().split('/')[0] === 'application'){
            req.session.candidate_resume = req.file.path;
            req.session.save();
            console.log('Here iseeeeeeeeee image of candidate : ',req.session.candidate_resume);
        }
    });
})

//router.get('/verify', function(req,res){
//    console.log('verify',req.query.username);
//    showData.verifyUser(req.query.username, function(data){
//        if(data){
//            if(data === 'ok'){
//                console.log("Congractulations! Sign In For Further Services!......");
//                res.redirect('http://localhost:3000/');
//            }else{
//                console.log(data);
//            }
//        }
//    }) ;
//});

router.post('/addResume', function(req, res){
    console.log(req.body);
    console.log('Here is resume of candidate : ',req.session.candidate_resume );
    console.log('Here is image of candidate : ',req.session.candidate_image);
    //console.log('Here is image of candidate : ',req.session);

    crud.setValue(req.body, req.session.candidate_resume, req.session.candidate_image, function(resonse){
        if(resonse === 'ok'){
            if(req.session.candidate_resume !== undefined && req.session.candidate_image !== undefined) {
                uploadFile(req.session.candidate_resume);
                uploadFile(req.session.candidate_image);
            }
            res.json('Resume Is Entered Successfully!......');
            res.end();
            console.log(resonse);
        }else{
            res.json(resonse);
            res.end();
            console.log(resonse);
        }
    })
});

router.post('/editResume', function(req, res){
    console.log(req.body);
    console.log('Here is resume of candidate : ',req.session.candidate_resume );
    console.log('Here is image of candidate : ',req.session.candidate_image);
    //console.log('Here is image of candidate : ',req.session);

    crud.editResume(req.body, req.session.candidate_resume, req.session.candidate_image, function(resonse){
        if(resonse === 'ok'){
            if(req.session.candidate_resume !== undefined && req.session.candidate_image !== undefined) {
                uploadFile(req.session.candidate_resume);
                uploadFile(req.session.candidate_image);
            }
            res.json('Congractulations  '+req.body.email+'  Resume Is Updated Successfully!......');
            res.end();
            console.log(resonse);
        }else{
            res.json(resonse);
            res.end();
            console.log(resonse);
        }
    })
});

//replace file into another folder as final commit
function uploadFile(filepath){
    console.log('i am entered here', filepath);
    var base = path.parse(filepath);
    console.log(base.base);
    fs.readFile(filepath.toString(), function (err, data) {
        if (err) throw err;
        fs.writeFile(path.join('client/images/upload', base.base.toString()), data, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    })
}

//---------------------------------------------------------------week calendar-----------------------------------------------------------------

router.post('/getWeekCalendar', function(req, res){
    var object = new Date()
    var firstDayOfTheWeek = '';

    var   currentMonth = object.getMonth();
    var  currentDate = object.getDate();
    var   currentYear = object.getFullYear();

    var week = new calendar.Calendar(6).itermonthdates(Number(currentYear), Number(currentMonth)+1).toString().split(',');
    var array = [];
    var temp = [];

    if(object <= new Date(week[34])){
        for(var i= 1; i<=35 ; i++){
            if(i%7 == 0){
                temp.push(week[i-1]);
                array.push(temp);
                temp = [];
            }else{
                temp.push(week[i-1]);
            }
        }
    }else{
        var obj = new Date();
        obj.setMonth(obj.getMonth()+1);
        week = new calendar.Calendar(6).itermonthdates(Number(obj.getFullYear()), Number(obj.getMonth())+1).toString().split(',');

        for(var i= 1; i<=35 ; i++){
            if(i%7 == 0){
                temp.push(week[i-1]);
                array.push(temp);
                temp = [];
            }else{
                temp.push(week[i-1]);
            }
        }
        console.log('here is my new week got it =>', week[34], ' and ', obj);
    }

    if(array.length!==0){
        for(var i = 0 ; i < array.length; i++){
            for(var j = 0; j<array[i].length; j++){
                if( new Date(array[i][j]).toDateString() === new Date().toDateString()){
                    temp = [];
                    if(temp.length === 0){
                        console.log('ok ================================================>', i);
                        temp.push(i);
                        var tempDate = new Date(array[i][j]);
                        console.log('Date => ', tempDate.getDate(),' Month => ', tempDate.getMonth(), ' Year => ', tempDate.getFullYear());
                        // console.log('Date => ', tempDate.getDate(),' Month => ', tempDate.getMonth(), ' Year => ', tempDate.getFullYear());
                    }
                }else{
                    // console.log('Sorry, there your date is not found!......', i);
                }
            }
        }
    }

    if(temp.length !== 0){
        console.log(array[temp]);
        var content = '';
        for(var i = 0; i<array[temp].length ; i++){
            content+= '<tr class="table-bg-color"></tr><tr><th><div class="date-border"><h1 class="day-of-week"> '+array[temp][i].toString().split(' ')[0]+'</h1><h4 class="date-of-week">'+array[temp][i].toString().split(' ')[2]+' </h4><h3 class="date-of-year"> '+array[temp][i].toString().split(' ')[1]+' '+array[temp][i].toString().split(' ')[3]+' </h3></div></th><td></td></tr>';
        }
        if(content !== ''){
            res.send(content);
            res.end();
        }
    }
});

router.post('/getNextWeekCalendar', function(req, res){
    var object = new Date()
    var firstDayOfTheWeek = '';
    req.session.NEXT_WEEK_CONTSTANT = parseInt(req.session.NEXT_WEEK_CONTSTANT)+7;
    object.setDate(object.getDate()+parseInt(req.session.NEXT_WEEK_CONTSTANT));
    var   currentMonth = object.getMonth();
    var  currentDate = object.getDate();
    var   currentYear = object.getFullYear();
    //for(var i = 0; i<7; i++){
    //
    //}
    console.log(parseInt(req.session.NEXT_WEEK_CONTSTANT), 'and here is also', object.getDate() );
    var week = new calendar.Calendar(6).itermonthdates(Number(currentYear), Number(currentMonth)+1).toString().split(',');
//    var week = new calendar.Calendar(6).itermonthdates(parseInt(currenYear), parseInt(currentMonth)).toString().split(',');
    var array = [];
    var temp = [];
    console.log(new Date(week[34]).toDateString() ,' and ', object.toDateString());
    // if(new Date(week[34]).toDateString() >= object.toDateString()){
    if(object <= new Date(week[34])){
        for(var i= 1; i<=35 ; i++){
            if(i%7 == 0){
                temp.push(week[i-1]);
                array.push(temp);
                temp = [];
            }else{
                temp.push(week[i-1]);
            }
        }
    }else{
        console.log('here i enter for it.');

        var obj = new Date();
        obj.setMonth(obj.getMonth()+1);
        week = new calendar.Calendar(6).itermonthdates(Number(obj.getFullYear()), Number(obj.getMonth())+1).toString().split(',');

        for(var i= 1; i<=35 ; i++){
            if(i%7 == 0){
                temp.push(week[i-1]);
                array.push(temp);
                temp = [];
            }else{
                temp.push(week[i-1]);
            }
        }

       // console.log('here is my new week got it =>', week[34], ' and ', obj);
    }


    if(array.length!==0){
        for(var i = 0 ; i < array.length; i++){
            for(var j = 0; j<array[i].length; j++){
                // if( new Date(array[i][j]).toDateString() === new Date().toDateString()){
                console.log( 'dates in array => ', new Date(array[i][j]).toDateString() ,' === ', object.toDateString())
                if( new Date(array[i][j]).toDateString() === object.toDateString()){
                    temp = [];
                    if(temp.length === 0){
                       // console.log('ok ================================================>', i);
                        temp.push(i);
                        var tempDate = new Date(array[i][j]);
                        //console.log('Date => ', tempDate.getDate(),' Month => ', tempDate.getMonth(), ' Year => ', tempDate.getFullYear());
                        // console.log('Date => ', tempDate.getDate(),' Month => ', tempDate.getMonth(), ' Year => ', tempDate.getFullYear());
                    }
                }else{
                  //  console.log('Sorry, there your date is not found!......', i);

                }
            }
        }
    }

    if(temp.length !== 0){
        // console.log('current Date is for example at here ok =>', object);
        console.log(array[temp]);
        var content = '';
        for(var i = 0; i<array[temp].length ; i++){
            content+= '<tr class="table-bg-color"></tr><tr><th><div class="date-border"><h1 class="day-of-week"> '+array[temp][i].toString().split(' ')[0]+'</h1><h4 class="date-of-week">'+array[temp][i].toString().split(' ')[2]+' </h4><h3 class="date-of-year"> '+array[temp][i].toString().split(' ')[1]+' '+array[temp][i].toString().split(' ')[3]+' </h3></div></th><td></td></tr>';
        }
        res.send(content);
        res.end();
    }
});

router.post('/getPreviousWeekCalendar', function(req, res){
    var object = new Date()
    var firstDayOfTheWeek = '';

    req.session.PREVIOUS_WEEK_CONTSTANT = parseInt(req.session.PREVIOUS_WEEK_CONTSTANT)+7;
    object.setDate(object.getDate()-parseInt(req.session.PREVIOUS_WEEK_CONTSTANT));
    var   currentMonth = object.getMonth();
    var  currentDate = object.getDate();
    var   currentYear = object.getFullYear();
    //for(var i = 0; i<7; i++){
    //
    //}

    //console.log(new calendar.Calendar(6).itermonthdates(2017, 5).toString().split(','));
    var week = new calendar.Calendar(6).itermonthdates(Number(currentYear), Number(currentMonth)+1).toString().split(',');
//    var week = new calendar.Calendar(6).itermonthdates(parseInt(currenYear), parseInt(currentMonth)).toString().split(',');
    var array = [];
    var temp = [];
    // for(var i= 1; i<=35 ; i++){
    //     if(i%7 == 0){
    //         temp.push(week[i-1]);
    //         array.push(temp);
    //         temp = [];
    //     }else{
    //         temp.push(week[i-1]);
    //     }
    // }

    console.log('check for week variable', new Date(week[34]).toDateString() >= object.toDateString());

    if(object <= new Date(week[34])){
        for(var i= 1; i<=35 ; i++){
            if(i%7 == 0){
                temp.push(week[i-1]);
                array.push(temp);
                temp = [];
            }else{
                temp.push(week[i-1]);
            }
        }
    }else{
        console.log('here i enter for it.');

        var obj = new Date();
        obj.setDate(obj.getDate()+1);
        week = new calendar.Calendar(6).itermonthdates(Number(obj.getFullYear()), Number(obj.getMonth())+1).toString().split(',');

        for(var i= 1; i<=35 ; i++){
            if(i%7 == 0){
                temp.push(week[i-1]);
                array.push(temp);
                temp = [];
            }else{
                temp.push(week[i-1]);
            }
        }

        console.log('here is my new week got it =>', week[34], ' and ', obj);
    }

    if(array.length!==0){
        for(var i = 0 ; i < array.length; i++){
            for(var j = 0; j<array[i].length; j++){
                // if( new Date(array[i][j]).toDateString() === new Date().toDateString()){
                // console.log( 'dates in array => ', new Date(array[i][j]).toDateString() ,' === ', object.toDateString())
                if( new Date(array[i][j]).toDateString() === object.toDateString()){
                    temp = [];
                    if(temp.length === 0){
                        console.log('ok ================================================>', i);
                        temp.push(i);
                        var tempDate = new Date(array[i][j]);
                        console.log('Date => ', tempDate.getDate(),' Month => ', tempDate.getMonth(), ' Year => ', tempDate.getFullYear());
                        // console.log('Date => ', tempDate.getDate(),' Month => ', tempDate.getMonth(), ' Year => ', tempDate.getFullYear());
                    }
                }else{
                    // console.log('Sorry, there your date is not found!......', i);

                }
            }
        }
    }

    if(temp.length !== 0){
        console.log('current Date is for example at here ok =>', object);
        console.log(array[temp]);
        var content = '';
        for(var i = 0; i<array[temp].length ; i++){
            content+= '<tr class="table-bg-color"></tr><tr><th><div class="date-border"><h1 class="day-of-week"> '+array[temp][i].toString().split(' ')[0]+'</h1><h4 class="date-of-week">'+array[temp][i].toString().split(' ')[2]+' </h4><h3 class="date-of-year"> '+array[temp][i].toString().split(' ')[1]+' '+array[temp][i].toString().split(' ')[3]+' </h3></div></th><td></td></tr>';
        }
        res.send(content);
        res.end();
    }
});

//---------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;
