/**
 * Created by erginus-hybrid on 14/4/17.
 */
var smail = require('nodemailer');

module.exports.saaslaMail = function(username,cb){
    console.log('here is username in email///////////////////////------------>',username);
    var smtptransport = smail.createTransport({
        service : 'Gmail',
        auth:{
            user : 'harpreetsinghkhattra@gmail.com',
            pass : '872909066'
        }
    });

    var options = {
        from : 'Harpreet Singh<harpreetsinghkhattra@gmail.com>',
        to : 'harpreetsinghkhattra@gmail.com',
        subject : 'Saasla Info',
        html : '<div style="text-align: center">' +
        '<h2>recoreTalent</h2>' +
        '<div style="margin:10px;"><hr></div>' +
        '</div>' +
        '<h4>Congractulations You Registered Here...</h4>' +
        '<h5>Please Confirm At Here...</h5>' +
        '<div style="display: block; background-color: deepskyblue; border-radius: 50px; width: 300px; height: 30px; text-align: center; padding: 10px 10px 0px;">' +
        '<a style ="color : white" href="http://localhost:3000/a/verify/?username='+username+'">Confirm ID Here...</a>' +
        '</div>' +
        '<div style="margin:10px;">' +
        '<hr>' +
        "<p>The Software-based Assessment of American Sign Language Abilities (SAASLATM) is an online tool provided and copyrighted by SAASLA, LLC. and used by educators and clinical diagnosticians to aid in evaluating a student's American Sign Language (ASL) skills."+
        '</p>'+
        '</div>'
    }
    smtptransport.sendMail(options, function(err, data){
        if(err) throw  err;
        console.log(data);
        if(data){
            cb('sent');
        }
    });
}

module.exports.scheduleInterviewMail = function(username, candidate, cb){
    console.log('here is username in email///////////////////////------------>',username);
    var smtptransport = smail.createTransport({
        service : 'Gmail',
        auth:{
            user : 'harpreetsinghkhattra@gmail.com',
            pass : '872909066'
        }
    });

    var options = {
        from : 'Harpreet Singh<harpreetsinghkhattra@gmail.com>',
        to : 'harpreetsinghkhattra@gmail.com',
        subject : 'Saasla Info',
        html : '<div style="text-align: center">' +
        '<h2>recoreTalent</h2>' +
        '<div style="margin:10px;"><hr></div>' +
        '</div>' +
        '<h4>Dear sir, </h4>' +
        '<h5> Sir i want to sechedule interview with given candidate.</h5>' +
        //'<div style="display: block; background-color: deepskyblue; border-radius: 50px; width: 300px; height: 30px; text-align: center; padding: 10px 10px 0px;">' +
        ////'<a style ="color : white" href="http://localhost:3000/a/verify/?username='+username+'">Confirm ID Here...</a>' +
        //'</div>' +
        '<div style="margin:10px;">' +
        '<p>Employee Id :'+candidate+' </p>' +
        '<p> with </p>' +
        '<p>Employer Id : '+username+'</p>' +
        '<hr>' +
        "<p>The Software-based Assessment of American Sign Language Abilities (SAASLATM) is an online tool provided and copyrighted by SAASLA, LLC. and used by educators and clinical diagnosticians to aid in evaluating a student's American Sign Language (ASL) skills."+
        '</p>'+
        '</div>'
    }
    smtptransport.sendMail(options, function(err, data){
        if(err) throw  err;
        console.log(data);
        if(data){
            cb('sent');
        }else{
            cb('not_sent');
        }
    });
}

