/**
 * Created by erginus-hybrid on 14/4/17.
 */
var express = require('express');
var app = express.Router();
var path = require('path');
var connect = require('mongodb').MongoClient;
var crypto = require('crypto');
var hash = crypto.createHash('sha256');
var saaslaMail = require('./sendMail.js');

var crud = require('./crud_operation_validation_check.js');
var database = require('./monog_connection.js');

function isEmpty(obj){
    return JSON.stringify(obj) === JSON.stringify({});
}


function isNumber(element){
    return /^-?[\d.]+(?:e-?\d+)?$/.test(element);
}

module.exports.login = function(username, pass, cb){
    var result = '';
    randomPassword(username.split('@')[0], pass, function(password){
        if(password !== null && password !== '' && password !== undefined && username !== null && username !== '' && username !== undefined){
            database(function(err, db){
                if(err){
                    console.log('here is error in connection',err);
                }else{
                    var collection = db.collection('users');
                    collection.find({email : username, deleted_status : 0}).toArray(function(err, data){
                        //Verifying a hash
                        if(data.length !== 0){
                            console.log('here is database password\n', data[0].password,data[0].password === (password+data[0].salt), 'and here is user password from fronend\n', password+data[0].salt);
                            if(data[0].password === (password+data[0].salt).toString()){
                                console.log('here i am');
                                if(data[0].verified_code === 1){
                                    console.log('i entered')
                                    cb('ok',data);
                                }else{
                                    cb('verified_not_ok');
                                }
                            }else{
                                cb('not_ok')
                            }
                        }else{
                            cb('not_ok');
                        }
                    })
                }
            });
        }else{
            console.log('nothing')
        }
    });
}

module.exports.setValue = function(result, resume, image, callback){
    var array = [];
    console.log(isEmpty(result));
    console.log(JSON.stringify(result));
    if(isEmpty(result) && result.length === 0){
        callback('Form Data Is Emplty And Nothing Operation Has Done!...');
    }else{
        // shortest lofic if(array.length === 17) same below
        crud.validationOnRegistration(result, array, function(condition){
            if(condition === 'ok'){
                database(function(err, db){
                    var collection_user_info = db.collection('user_info');
                    collection_user_info.find({email : result.email}).toArray(function(err, data){
                        if(err){
                            console.log('error when matching username', err);
                        }else{
                            console.log(data);
                            if(data.length === 0){
                                if( data.length === 0 ){

                                    resume = (resume === undefined)? '' : path.join('/images/upload', path.parse(resume).base);
                                    image = (image === undefined)? '' : path.join('/images/upload', path.parse(image).base);
                                    collection_user_info.insertMany([{
                                        firstname : result.firstname,
                                        lastname : result.lastname,
                                        email : result.email,
                                        current_position : result.current_position,
                                        category : result.category,
                                        contact_no : result.contact_no,
                                        alternative_no : result.alternative_no,
                                        experience_level : result.experience_level,
                                        video_resume : result.video_resume,
                                        work_style_Link: result.user_talent_current_position,
                                        degree_qualification : result.qualification,
                                        skill : result.skill,
                                        experience : result.experience,
                                        desired_compensation: result.desired_compensation,
                                        resume : resume,
                                        profile_pic : image,
                                        count : 0,
                                        status : 0,
                                        visible_status : 1
                                    }]).then(function(response){
                                        callback('ok');
                                    }, function(reject){
                                        callback('Resumen Is Not Entered Successfully Due To Internal Errors!......');
                                    })
                                    //saaslaMail.saaslaMail(result.user_login, function(sent){
                                    //    callback(sent);
                                    //});
                                }
                            }
                        }
                    })
                });
            }else{
                console.log('here is reason', condition);
                callback(condition);
            }
        });
    }

}

module.exports.editResume = function(result, resume, image, callback){
    var array = [];
    console.log(isEmpty(result));
    console.log(JSON.stringify(result));
    if(isEmpty(result) && result.length === 0){
        callback('Form Data Is Emplty And Nothing Operation Has Done!...');
    }else{
        // shortest lofic if(array.length === 17) same below
        crud.validationOnRegistration(result, array, function(condition){
            if(condition === 'ok'){
                database(function(err, db){
                    var collection_user_info = db.collection('user_info');
                    collection_user_info.find({email : result.email}).toArray(function(err, data){
                        if(err){
                            console.log('error when matching username', err);
                        }else{
                            console.log(data);
                            if(data.length !== 0){
                                if( data.length !== 0 ){
                                    resume = (resume === undefined)? '' : path.join('/images/upload', path.parse(resume).base);
                                    image = (image === undefined)? '' : path.join('/images/upload', path.parse(image).base);
                                    collection_user_info.updateOne({email : result.email},{$set : {
                                        firstname : result.firstname,
                                        lastname : result.lastname,
                                        email : result.email,
                                        current_position : result.current_position,
                                        category : result.category,
                                        contact_no : result.contact_no,
                                        alternative_no : result.alternative_no,
                                        experience_level : result.experience_level,
                                        video_resume : result.video_resume,
                                        work_style_Link: result.user_talent_current_position,
                                        degree_qualification : result.qualification,
                                        skill : result.skill,
                                        experience : result.experience,
                                        desired_compensation: result.desired_compensation,
                                        resume : resume,
                                        profile_pic : image,
                                    }}).then(function(response){
                                        callback('ok');
                                    }, function(reject){
                                        callback('Resumen Is Not Updated Successfully Due To Internal Errors!......');
                                    })
                                    //saaslaMail.saaslaMail(result.user_login, function(sent){
                                    //    callback(sent);
                                    //});
                                }
                            }
                        }
                    })
                });
            }else{
                console.log('here is reason', condition);
                callback(condition);
            }
        });
    }

}

module.exports.register_company = function(result, callback){
    var array = [];
    var user_type_id = [1,2,3];
    var create_time = new Date().toString();
    console.log("isEmpty(result)  && result.length === 0", result.length);
    console.log('in registeratioin', result)
    if(isEmpty(result)){
        callback('Sent Object Is Empty');
        console.log('result.lenght is 0');
    }else{
        crud.validationOnRegisterCompany(result, array, function(condition){
            if(condition === 'ok'){
                    var randomPasword = randomPassword(result.email.toString().split('@')[0], result.password , function(hash_data_password){
                        console.log('here is your random password', hash_data_password,'here is your username as a salt', result.email.toString().split('@')[0]);
                        setTimeout(function(){
                            database(function(err,db){
                                if(err){
                                    console.log('insert student database error', err);
                                }else{
                                    var collection = db.collection('users');
                                    collection.find({email : result.email}).toArray(function(err, data){
                                        if(err){
                                            console.log('insert studnet database error in deep async', err);
                                        }else{
                                            if(data){
                                                if(data.length === 0){
                                                    console.log('here i am in collection insertion in student registry')
                                                    collection.insertOne({
                                                        email : result.email,
                                                        password : result.password,
                                                        company_name : result.result,
                                                        position : result.position,
                                                        localtion : result.localtion,
                                                        first_name : result.first_name,
                                                        last_name : result.last_name,
                                                        contact_number : result.contact_number,
                                                        password : hash_data_password+result.email.toString().split('@')[0],
                                                        created_date : create_time,
                                                        group_id : 2,
                                                        salt : result.email.toString().split('@')[0],
                                                        verified_code : 0,
                                                        deleted_status : 0,
                                                        visible_status : 1
                                                    //UPDATE_DATE
                                                    }).then(function(inserted_data){
                                                        callback('ok');
                                                        saaslaMail.saaslaMail(result.email, function(sent){
                                                            callback(sent);
                                                        });
                                                    }, function(rejected_data){
                                                        callback('err');
                                                    });
                                                    console.log('here you submitted efficently')
                                                }else{
                                                    callback('not_ok')
                                                    console.log('student is already present')
                                                }
                                            }
                                        }
                                    })
                                }
                            });
                        },2000);
                    });
            }else{
                callback(condition);
                console.log('here is issue', condition);
            }
        });
    }

}

//verify user through email
module.exports.verifyUser = function(username, cb){
    database(function (err, db) {
        if (username !== null && username !== '' && username !== undefined) {
            if (err) throw err;

            var collection = db.collection('users');
            collection.find({email: username}).toArray(function (err, data) {
                if (err) {
                    console.log('again erro in verify user methods find data part', err);
                } else {
                    if (data) {
                        if (data.length !== 0) {
                            console.log(data);
                            if(data[0].verified_code === 0){
                                collection.updateOne({email : username}, {$set : {verified_code : 1}});
                                cb('ok');
                            }else{
                                cb('verified_code_already_done');
                            }
                        }
                    }
                }
            });
        }
    });
}

module.exports.getAllResume  = function(category, cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('user_info');
        collection.find({category : category, visible_status : 1}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length !== 0) {
                        cb(data);
                    }
                } else {
                    console.log('nothing find of username address try to put right username');
                }
            }
        })
    })
}

module.exports.getUserDetail  = function(email, cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('users');
        collection.find({email : email , visible_status : 1}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length !== 0) {
                        cb(data);
                    }
                } else {
                    console.log('nothing find of username address try to put right username');
                }
            }
        })
    })
}

module.exports.setQualification  = function(result, cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('qualification');
        collection.find({course_name : result.course_name}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length === 0) {
                        collection.insert({
                            qualification : result.qualification,
                            course_name : result.course_name,
                            deleted : 0,
                            visible_status : 1,
                            created_date : new Date(),
                            status : 0
                        }).then(function(ok){
                            cb('ok');
                        });
                    }
                } else {
                    console.log('Nothing To Add !......');
                }
            }
        })
    })
}

module.exports.setSkills  = function(result, cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('skill');
        collection.find({ skill:result.skill }).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length === 0) {
                        collection.insert({
                            skill : result.skill,
                            deleted : 0,
                            visible_status : 1,
                            created_date : new Date(),
                            status : 0
                        }).then(function(ok){
                            cb('ok');
                        });
                    }
                } else {
                    console.log('Nothing To Add !......');
                }
            }
        })
    })
}

module.exports.setDesiredCompensation  = function(result, cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('desiredCompensation');
        collection.find({service:result.service }).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length === 0) {
                        collection.insert({
                            service : result.service,
                            deleted : 0,
                            visible_status : 1,
                            created_date : new Date(),
                            status : 0
                        }).then(function(ok){
                            cb('ok');
                        });
                    }
                } else {
                    console.log('Nothing To Add !......');
                }
            }
        })
    })
}

module.exports.getQualification  = function(cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('qualification');
        collection.find({}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length !== 0) {
                        cb(data);
                    }
                } else {
                    console.log('Nothing To Add !......');
                }
            }
        })
    })
}

module.exports.getSkills  = function(cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('skill');
        collection.find({}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length !== 0) {
                        cb(data);
                    }
                } else {
                    console.log('Nothing To Add !......');
                }
            }
        })
    })
}

module.exports.getDesiredCompensation  = function(cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('desiredCompensation');
        collection.find({}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length !== 0) {
                        cb(data);
                    }
                } else {
                    console.log('Nothing To Add !......');
                }
            }
        })
    })
}

module.exports.getQalificationAndSkills  = function(cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('qualification');
        var skill = db.collection('skill');
        var desiredCompensation = db.collection('desiredCompensation');
        var array = {
            qalification : [],
            skill : [],
            desiredCompensation : []
        }
        collection.find({ visible_status : 1 }).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    skill.find({ visible_status : 1 }).toArray(function(err, skills){
                        if(err) throw err;
                        if(skills){
                            desiredCompensation.find({ visible_status : 1 }).toArray(function(err, desiredCompensation){
                                if(err) throw err;
                                if(desiredCompensation){
                                    array.qalification.push(data);
                                    array.skill.push(skills);
                                    array.desiredCompensation.push(desiredCompensation);

                                    if(array.qalification.length !== 0 || array.skill.length !== 0 || array.desiredCompensation.length !== 0 ){
                                        cb(array);
                                    }
                                }
                            })
                        }
                    })
                } else {
                    console.log('Nothing To Add !......');
                }
            }
        })
    })
}

module.exports.getCourse  = function(result, cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('qualification');
        collection.find({ visible_status : 1, qualification : result }).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    cb(data);
                } else {
                    console.log('Nothing To Add !......');
                }
            }
        })
    })
}

module.exports.getEmployerAndEmployees  = function(limit, cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('users');
        var user_info = db.collection('user_info');
        var array = {
            employer : [],
            employee : []
        }

        limit = (limit === 1)? parseInt() : limit;
        collection.find({group_id : 2}).limit(limit).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    user_info.find({}).limit(limit).toArray(function(err, user_info){
                        array.employer.push(data);
                        array.employee.push(user_info);
                        if(array.employee.length !== 0 || array.employer.length !== 0){
                            cb(array);
                        }else{
                            cb('Nothing To Show !......');
                        }
                    })
                } else {
                    console.log('nothing find of username address try to put right username');
                }
            }
        })
    })
}

module.exports.getUserAndCandidate  = function(cb) {
    database(function (err, db) {
        if (err) throw err;
        var temp_array = {
            employer : [],
            employee : []
        };
        var collection = db.collection('users');
        var user_info = db.collection('user_info');
        collection.find({}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length !== 0) {
                        user_info.find({}).toArray(function (err, user_info) {
                            if(err) throw err;
                            if(user_info && user_info.length!== 0){
                                temp_array.employee.push(user_info);
                                temp_array.employer.push(data);
                                cb(temp_array);
                            }
                        })
                    }
                } else {
                    console.log('nothing find of username address try to put right username');
                }
            }
        })
    })
}

module.exports.setCountOfView = function(username , cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('user_info');
        collection.find({email : username}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length !== 0) {
                        collection.updateOne({email : username}, {$set : {count : parseInt(data[0].count)+1}})
                        cb('ok');
                    }
                } else {
                    console.log('nothing find of username address try to put right username');
                }
            }
        })
    })
}

module.exports.getCountOfView = function(cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('user_info');
        collection.find({count : {$gte : 2}, visible_status : 1}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            }

            if(data && data.length !== 0){
                var array = [];
                var temp = [];
                array.push(data);
                if(array.length !== 0){
                    cb(array);
                }
            }
        })
    })
}

module.exports.secheduleInterview = function(result, cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('scheduleInterview');
        //collection.find({}).toArray(function (err, data) {
        //    if(err) throw err;
        //    if(data && data === 0){
        //        collection.insertOne({
        //            employerId : result.users_id,
        //            employeeId : result.user_talents_id,
        //            hours : result.user_interview_schedule_hours,
        //            minutes : result.user_interview_schedule_minutes,
        //            date_of_interview : result.user_interview_schedule_date,
        //            createDate : new Date(),
        //            status : 0,
        //            deleted : 0,
        //        }).then(function(ok){
        //            console.log(ok);
        //        });
        //    }
        //})

        collection.find({employerId : result.users_id, employeeId : result.user_talents_id, hours : result.user_interview_schedule_hours, date_of_interview : result.user_interview_schedule_date }).toArray(function (err, allData) {
            if(err) throw err;
            if(allData && allData.length === 0){
                console.log('i am here');

                collection.insertOne({
                    employerId : result.users_id,
                    employeeId : result.user_talents_id,
                    hours : result.user_interview_schedule_hours,
                    minutes : result.user_interview_schedule_minutes,
                    date_of_interview : result.user_interview_schedule_date,
                    //year : parseInt(result.user_interview_schedule_date.split('/')[2]),
                    //month : parseInt(result.user_interview_schedule_date.split('/')[1]),
                    //date : parseInt(result.user_interview_schedule_date.split('/')[0]),
                    createDate : new Date(),
                    status : 0,
                    deleted : 0,
                }).then(function(ok){
                    console.log(ok);
                    cb('1');
                });
            }else{
                console.log('i am out of the box');
                cb('0');
            }
        })
    })
}

module.exports.changeStatusSelected = function(result, cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('scheduleInterview');
        collection.find({ employerId : result[1], employeeId : result[0] }).toArray(function (err, data) {
            if(err) throw err;
            if(data && data.length !== 0){

                console.log('i am here');

                var v = parseInt(data[0].status) === 0?v=1:v=0;
                collection.update({employerId : result[1], employeeId : result[0]}, {$set : { status : v}});
                cb('ok');
            }
        })
    })
}

module.exports.changeStatusVisible = function(result, cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('user_info');
        var users = db.collection('users');
        collection.find({email : result}).toArray(function (err, data) {
            if(err) throw err;
            if(data && data.length !== 0){

                console.log('i am here');

                var v = parseInt(data[0].visible_status) === 0?v=1:v=0;
                collection.update({email : result}, {$set : { visible_status : v}});
                cb('ok');
            }else{
                users.find({email : result}).toArray(function(err, us){
                    if(err) throw  err;
                    if(us && us.length !== 0){
                        var v = parseInt(us[0].visible_status) === 0?v=1:v=0;
                        users.update({email : result}, {$set : { visible_status : v}});
                        cb('ok');
                    }else{
                        cb('Nothing to change !...');
                    }
                })
            }
        })
    })
}

module.exports.qualificationStatusVisible = function(result, cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('qualification');
        collection.find({course_name : result}).toArray(function (err, data) {
            if(err) throw err;
            if(data && data.length !== 0){

                console.log('i am here');

                var v = parseInt(data[0].visible_status) === 0?v=1:v=0;
                collection.update({course_name : result}, {$set : { visible_status : v}});
                cb('ok');
            }else{
                cb('Nothing to change !...');
            }
        })
    })
}


module.exports.skillStatusVisible = function(result, cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('skill');
        collection.find({skill : result}).toArray(function (err, data) {
            if(err) throw err;
            if(data && data.length !== 0){

                console.log('i am here');

                var v = parseInt(data[0].visible_status) === 0?v=1:v=0;
                collection.update({skill : result}, {$set : { visible_status : v}});
                cb('ok');
            }else{
                cb('Nothing to change !...');
            }
        })
    })
}

module.exports.desiredStatusVisible = function(result, cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('desiredCompensation');
        collection.find({service : result}).toArray(function (err, data) {
            if(err) throw err;
            if(data && data.length !== 0){

                console.log('i am here');

                var v = parseInt(data[0].visible_status) === 0?v=1:v=0;
                collection.update({service : result}, {$set : { visible_status : v}});
                cb('ok');
            }else{
                cb('Nothing to change !...');
            }
        })
    })
}

module.exports.getsecheduleInterview = function(cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('scheduleInterview');
        var user_info = db.collection('user_info');
        var users = db.collection('users');
        collection.find({status : 0}).toArray(function (err, data) {
            if(err) throw err;
            if(data && data.length !== 0){
                var array = {
                    employer : [],
                    employee : []
                };
                    users.find().toArray(function (err, emp_data) {
                        if(err) throw err;
                        if(emp_data && emp_data.length !== 0) {
                            for(var i in data){
                                for(var j in emp_data){
                                    console.log('==========>', emp_data[j].email === data[i].employerId, ' && ', emp_data[j].email ,' === ', data[i].employerId)
                                    if(data[i].employerId === emp_data[j].email){
                                        array.employer.push(emp_data[j]);
                                        //if(emp_data[i] !== undefined){
                                        //
                                        //}
                                        //
                                    }
                                }
                            }
                            if( array.employer.length != 0){
                                user_info.find({}).toArray(function (err, dt) {
                                    if(err) throw err;
                                    if(dt && dt.length !== 0){
                                        for(var i in data){
                                            for(var j in dt){
                                                console.log('listen i am enter in empdata');
                                                console.log('================>', dt[j].email === data[i].employeeId, ' && ', dt[j].email ,' === ', data[i].employeeId)
                                                if(dt[j].email === data[i].employeeId){
                                                    dt[j].created_date = new Date(data[i].date_of_interview).toDateString()+' / '+data[i].hours+':'+ data[i].minutes +':'+'00';
                                                    array.employee.push(dt[j]);
                                                    console.log('ok got it', array)
                                                    //if(dt[i] !== undefined){
                                                    //
                                                    //}
                                                }
                                            }
                                        }
                                        if(array.employee.length !== 0){
                                            console.log('i am entered in final block !......');
                                            cb(array);
                                        }
                                    }else{
                                        console.log('here we did\'nt find it');
                                    }
                                });
                            }
                        }
                    })
            }else{
                cb('Nothing to show');
            }
        })
    })
}


module.exports.getScheduledInterviewForClient = function(username, cb){
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('scheduleInterview');
        var user_info = db.collection('user_info');
        var users = db.collection('users');
        collection.find({employerId : username}).toArray(function (err, data) {
            if(err) throw err;
            if(data && data.length !== 0){
                var array = {
                    employer : [],
                    employee : []
                };
                users.find().toArray(function (err, emp_data) {
                    if(err) throw err;
                    if(emp_data && emp_data.length !== 0) {
                        for(var i in data){
                            for(var j in emp_data){
                                console.log('==========>', emp_data[j].email === data[i].employerId, ' && ', emp_data[j].email ,' === ', data[i].employerId)
                                if(data[i].employerId === emp_data[j].email){
                                    array.employer.push(emp_data[j]);
                                    //if(emp_data[i] !== undefined){
                                    //
                                    //}
                                    //
                                }
                            }
                        }
                        if( array.employer.length != 0){
                            user_info.find({}).toArray(function (err, dt) {
                                if(err) throw err;
                                if(dt && dt.length !== 0){
                                    for(var i in data){
                                        for(var j in dt){
                                            console.log('listen i am enter in empdata');
                                            console.log('================>', dt[j].email === data[i].employeeId, ' && ', dt[j].email ,' === ', data[i].employeeId)
                                            if(dt[j].email === data[i].employeeId){
                                                dt[j].created_date = new Date(data[i].date_of_interview).toDateString()+' / '+data[i].hours+':'+ data[i].minutes +':'+'00';
                                                dt[j].status = data[i].status;
                                                array.employee.push(dt[j]);
                                                console.log('ok got it', array)
                                                //if(dt[i] !== undefined){
                                                //
                                                //}
                                            }
                                        }
                                    }
                                    if(array.employee.length !== 0){
                                        console.log('i am entered in final block !......');
                                        cb(array);
                                    }
                                }else{
                                    console.log('here we did\'nt find it');
                                }
                            });
                        }
                    }
                })
            }else{
                cb('Nothing to show');
            }
        })
    })
}


module.exports.getCategory  = function(category, experience_level , cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('user_info');
        collection.find({category : category, experience_level : experience_level, visible_status : 1}).toArray(function (err, data) {
            if (err) {
                console.log('error in deep find of save purchase');
            } else {
                if (data) {
                    if (data.length !== 0) {
                        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@22222')

                        cb(data);
                    }
                } else {
                    console.log('nothing find of username address try to put right username');
                }
            }
        })
    })
}

module.exports.interviews  = function(cb) {
    database(function (err, db) {
        if (err) throw err;
        var collection = db.collection('scheduleInterview');
        collection.find({}).toArray(function (err, data) {
            if (err) throw err;
            if (data) {
                if (data.length !== 0) {
                    cb(data);
                }
            } else {
                console.log('nothing find of username address try to put right username');
            }
        })
    })
}

module.exports.changePassword = function(username, newPassword, cb){
    database(function(err, db){
        if(err){
            console.log('hello here is an error in change password', err);
        }else{
            var collection = db.collection('users');
            randomPassword(username.split('@')[0], newPassword, function(password, salt){
                collection.find({email : username}).toArray(function(err, data){
                    if(err){
                        cosole.log('hello here also i am still in change password in async', err);
                    }else{
                        if(newPassword !== null && newPassword !== ''){//&& oldPassword !== '' && oldPassword!== null
                            if(data){
                                if(data.length !==0){
                                    console.log('here changed password is', password+salt);
                                    collection.update({email: username},{$set:{password : password+salt}}).then(function(data){
                                        console.log('updated data is', username);
                                        cb('ok');
                                    }, function(rejected){
                                        console.log('here is rejected data is ', rejected);
                                        cb('err');
                                    });
                                }else{
                                    console.log('username did not match');
                                    cb('not_ok');
                                }
                            }
                        }
                    }
                });
            });
            //   db.close();
        }
    });
}

module.exports.setMyTalent = function(username, result, description, cb){
    database(function(err, db){
        if(err){
            console.log('hello here is an error in change password', err);
        }else{
            var collection = db.collection('myTalent');
            collection.find({employeeId : result.email, employerId: username}).toArray(function(err, data){
                if(err) throw err;
                if(data && data.length === 0 ){
                    collection.insertOne({
                        employerId : username,
                        employeeId : result.email,
                        createdDate : new Date().toDateString,
                        delted_status : 0
                    });
                    cb('ok');
                }
            })
            //   db.close();
        }
    });
}

module.exports.getIdResume = function(id, cb){
    database(function(err, db){
        if(err){
            console.log('hello here is an error in change password', err);
        }else{
            var user_info = db.collection('user_info');
            user_info.find({email : id}).toArray(function(err, dt){
                if(err){
                    console.log('error in pushing the data!......', err);
                }
                if(dt && dt.length !== 0 ){
                   cb(dt);
                }
            });
        }
    });
}

module.exports.getMyTalent = function(username, cb){
    database(function(err, db){
        if(err){
            console.log('hello here is an error in change password', err);
        }else{
            var collection = db.collection('myTalent');
            var user_info = db.collection('user_info');
            var array = [];

            collection.find({employerId : username}).toArray(function(err, data){
                if(err) throw err;
                if(data && data.length !== 0){
                    for(var i in data){
                        user_info.find({email : data[i].employeeId}).toArray(function(err, dt){
                            if(err){
                                console.log('error in pushing the data!......', err);
                            }
                            if(dt && dt.length !== 0 ){
                                array.push(dt);
                                console.log(array.length, ' and ', dt);
                                if(array.length === dt.length ){
                                    cb(array);
                                }
                            }
                        });
                    }
                }
            })
            //   db.close();
        }
    });
}

module.exports.deleteTestStudent = function(stu_name, organization_id, testname, cb){
    database(function(err, db){
        if(err){
            console.log('hello here is an error in change password', err);
        }else{
            var collection = db.collection('pricipal_created_test');
            collection.find({test_name : testname, organiztion_id: organization_id}).toArray(function(err, data){
                if(err) throw err;
                if(data && data.length !== 0 ){
                    for( var x in data.test){
                        if( stu_name === ''){
                            collection.update({test_students:[{"test_student_username" : stu_name}]}, {$unset : {'test_students.0.0.test_status': -1 }})
                                .then(function(acceptedData){
                                    if(acceptedData.result.ok === 1){
                                        console.log('deleted')
                                        cb('ok');
                                    }
                                }, function(rejectedData){
                                    if(rejectedData.result.ok === 1){
                                        console.log('not deleted')
                                        cb('ok');
                                    }
                                })
                        }
                    }
                }else{
                    cb('not_ok');
                }
            })
            //   db.close();
        }
    });
}

module.exports.forgetPassword = function(email,cb){
    database(function(err, db){
        if(err){
            console.log('errro in email sending db error', err);
        }else{
            var collection = db.collection('saasla_user_info')
                .find({email :email}).toArray(function(err, data){
                    if(err){
                        console.log('here is again now iam in forgetPassword section in deep async', err);
                    }else{
                        if(data){
                            if(data.length !== 0){
                                if(data[0].email === email){
                                    var prop = {
                                        username : data[0].username,
                                        password : data[0].password
                                    }
                                    cb(prop);
                                }
                            }else{
                                console.log('email is not amtch')
                            }
                        }
                    }
                })
        }
        //  db.close();
    });
}

function randomPassword(username, given_password, cb){
    var pasword = Math.random().toString();
    var temp = pasword.match(/[1-9]/g);
    var pass = '';
    for(var i = 0; i < 7; i++){
        pass +=temp[i];
    }

    if(given_password !== null && given_password !== ''){
        var encrypt = '';
        var cipher = crypto.createCipher('aes192', username)
            .on('readable', function(){
                var data = cipher.read();
                if(data){
                    encrypt += data.toString('hex');
                    console.log('here is ENCRYPTED data',encrypt);
                    cb(data.toString('hex'),username);
                }
            });
        cipher.write(given_password);
        cipher.end();
        //-------------THIS CODE FOR DECRYPT THE DATA-------------
        //if(encrypt){
        //    console.log('here is data',encrypt);
        //    var decipher = crypto.createDecipher('aes192', '872909066')
        //        .on('readable', function(){
        //            var data = decipher.read();
        //            if(data){
        //                console.log('here is decrypt data', data.toString());
        //            }
        //        });
        //    decipher.write(encrypt, 'hex');
        //    decipher.end();
        //}
    }else{

        console.log('Listen your password is empty and i am being displayed to another one ok!');
        var encrypt = '';
        var cipher = crypto.createCipher('aes192', username)
            .on('readable', function(){
                var data = cipher.read();
                if(data){
                    console.log('here is ENCRYPTED data',encrypt);
                    encrypt += data.toString('hex');
                    cb(data.toString('hex'),username);
                }
            });
        cipher.write(pass);
        cipher.end();
    }
}

module.exports.deleteStudent = function(username, value, cb){
    database(function(err, db){
        if(err){
            console.log('hello here is an error in change password', err);
        }else{
            var collection = db.collection('saasla_user_info');
            collection.find({username : username}).toArray(function(err, data){
                if(err){
                    cosole.log('hello here also i am still in change password in async', err);
                }else{
                    if(data){
                        if(data.length !==0){
                            collection.update({username: username},{$set:{user_deleted : value}}).then(function(data){
                                console.log('updated data is', data);
                                if(data.result.ok === 1){
                                    cb('ok');
                                }
                            });
                        }else{
                            console.log('username did not match');
                        }
                    }
                }
            })
            //   db.close();
        }
    });
}

// PRICIPAL CREATED TEST
module.exports.createTest = function(result, id, callback){
    var array = [];
    var user_type_id = [1,2,3];
    var create_time = new Date().toString();
    console.log("isEmpty(result)  && result.length === 0", result.length);
    console.log('in registeratioin', result)
    if(isEmpty(result)){
        console.log('result.lenght is 0');
    }else{
        crud.validation(result, array, function(condition){
            if(condition === 'ok'){
                console.log('here i am enter in condition block');
                if(id === 1){
                    database(function(err,db){
                        if(err){
                            console.log('insert student database error', err);
                        }else{
                            var collection = db.collection('pricipal_created_test');
                            collection.find({test_name : result[0], organiztion_id  : result[1]}).toArray(function(err, data){
                                if(err){
                                    console.log('insert studnet database error in deep async', err);
                                }else{
                                    if(data){
                                        if(data.length === 0){
                                            collection.insertOne({
                                                test_name : result[0],
                                                test_perform_date : result[2],
                                                test_created_time : create_time,
                                                organiztion_id  : result[1],
                                                test_status : 1,
                                                test_students:[],
                                                testdeleted_deleted : ''

                                            }).then(function(inserted_data){
                                                callback('ok' +
                                                    '');
                                            });
                                            console.log('here you submitted efficently')
                                        }else{
                                            callback('not_ok')
                                            console.log('student is already present')
                                        }
                                    }
                                }
                            })
                        }
                    });
                }
            }else{
                console.log('here is issue', condition);
            }
        });
    }

}

// PRICIPAL CREATED TEST For EDIT
module.exports.editTest = function(result, id, callback){
    var array = [];
    var user_type_id = [1,2,3];
    var create_time = new Date().toString();
    console.log("isEmpty(result)  && result.length === 0", result.length);
    console.log('in registeratioin', result)
    if(isEmpty(result)){
        console.log('result.lenght is 0');
    }else{
        crud.validation(result, array, function(condition){
            if(condition === 'ok'){
                console.log('here i am enter in condition block');
                if(id === 1){
                    database(function(err,db){
                        if(err){
                            console.log('insert student database error', err);
                        }else{
                            var collection = db.collection('pricipal_created_test');
                            collection.find({test_name : result[0], organiztion_id  : result[1]}).toArray(function(err, data){
                                if(err){
                                    console.log('insert studnet database error in deep async', err);
                                }else{
                                    if(data){
                                        if(data.length !== 0){
                                            collection.update({test_name : result[0], organiztion_id  : result[1]},
                                                { $set : { test_name : result[0],
                                                    test_perform_date : result[2],
                                                    updatedTimeOfTest : create_time,
                                                    organiztion_id  : result[1]
                                                }}).then(function(inserted_data){
                                                    callback('ok');
                                                });
                                            console.log('here you submitted efficently')
                                        }else{
                                            callback('not_ok')
                                            console.log('student is already present')
                                        }
                                    }
                                }
                            })
                        }
                    });
                }
            }else{
                console.log('here is issue', condition);
            }
        });
    }

}

