/**
 * Created by erginus-hybrid on 14/4/17.
 */
module.exports.validation = function(result, array, call){
    var i = 0;
    switch(1) {
        case 1:
            i += 1;
            if(i <= result.length){
                if (result[0] === '' ) {
                    call(" First Is Empty")
                } else {
                    array.push(' ');
                }
            }
        case 2:
            i += 1;
            if(i <= result.length){
                if (result[1] === '') {
                    call("Second Name Is Empty")
                } else {
                    array.push(' ');
                }
            }
        case 3:
            i += 1;
            if(i <= result.length){
                if (result[2] === '') {
                    call("Third Name Is Empty")
                } else {
                    array.push(' ');
                }
            }
        case 4:
            i += 1;
            if(i <= result.length){
                if (result[3] === '') {
                    call("Fouth Is Empty")
                } else {
                    array.push(' ');
                }
            }
        case 5:
            i += 1;
            if(i <= result.length){
                if (result[4] === '') {
                    call("Fifth Name Is Empty")
                } else {
                    array.push(' ');
                }
            }
        case 6:
            i += 1;
            if(i <= result.length){
                if (result[5] === '') {
                    call("Sixth Is Empty")
                } else {
                    array.push(' ');
                }
            }
        case 7:
            console.log('here is array length'+array.length+' here is result.length'+result.length +' and here is i: '+i);
            if(array.length === result.length){
                call('ok');
            }else{
                call('not_ok')
            }
            break;
    }
}

module.exports.validationOnRegistration = function(result, array ,call){
    switch(1){
        case 1:
            if(result.firstname === '' || result.firstname === undefined){
                call('First Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 2:
            if(result.lastname === '' || result.lastname === undefined){
                call('Last Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 3:
            if(result.contact_no === '' || result.contact_no === undefined){
                call('Contact Number is empty');
                break;
            }else{
                array.push(' ');
            }
        case 4:
            if(result.category === '' || result.category === undefined){
                call('Category Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 5:
            if(result.alternative_no === '' || result.alternative_no === undefined){
                call('Alternative field is empty');
                break;
            }else{
                array.push(' ');
            }
        case 6:
            if(result.user_talent_current_position === '' || result.user_talent_current_position === undefined){
                call('Course Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 7:
            if(result.current_position === '' || result.current_position === undefined){
                call('Current Position Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 8:
            if(result.qualification === '' || result.qualification === undefined || result.qualification.length === 0){
                call('Qualification field is empty');
                break;
            }else{
                array.push(' ');
            }
        case 9:
            if(result.desired_compensation === '' || result.desired_compensation === undefined){
                call('Desired Compensation Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 10:
            if(result.email === '' || result.email === undefined){
                call('Email Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 11:
            if(result.experience_level === '' || result.experience_level === undefined){
                call('Experience level field is empty');
                break;
            }else{
                array.push(' ');
            }
        case 12:
            if(result.experience === '' || result.experience === undefined){
                call('Organization field is empty');
                break;
            }else{
                array.push(' ');
            }
        case 13:
            if(result.experience === '' || result.experience === undefined){
                call('Role filed is empty');
                break;
            }else{
                array.push(' ');
            }
        case 14:
            if(result.user_talent_current_position === '' || result.user_talent_current_position === undefined){
                call('School Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 15:
            if(result.skill === '' || result.skill === undefined){
                call('Skill name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 16:
            if(result.experience === '' || result.experience === undefined){
                call('Time in current role is empty');
                break;
            }else{
                array.push(' ');
            }
        case 17:
            if(result.desired_compensation === '' || result.desired_compensation === undefined){
                call('Desired Compensation id is empty');
                break;
            }else{
                array.push(' ');
            }
        case 18:
            console.log('here array length', array.length);
            if(array.length === 17){
                call('ok');
                break;
            }else{
                call('not_ok');
                break;
            }
    }
}

module.exports.validationOnRegisterCompany = function(result, array ,call){
    switch(1){
        case 1:
            if(result.first_name === '' || result.first_name === undefined){
                call('First Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 2:
            if(result.last_name === '' || result.last_name === undefined){
                call('Last Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 3:
            if(result.contact_number === '' || result.contact_number === undefined){
                call('Contact Number is empty');
                break;
            }else{
                array.push(' ');
            }
        case 4:
            if(result.company_name === '' || result.company_name === undefined){
                call('Company Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 5:
            if(result.position === '' || result.position === undefined){
                call('Positon field is empty');
                break;
            }else{
                array.push(' ');
            }
        case 6:
            if(result.localtion === '' || result.localtion === undefined){
                call('Location Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 7:
            if(result.password === '' || result.password === undefined){
                call('Password Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 8:
            if(result.confirm_password === '' || result.confirm_password === undefined){
                call('Confirm Password field is empty');
                break;
            }else{
                array.push(' ');
            }
        case 9:
            if(result.email === '' || result.email === undefined){
                call('Email Name is empty');
                break;
            }else{
                array.push(' ');
            }
        case 10:
            console.log('here array length', array.length);
            if(array.length === 9){
                call('ok');
                break;
            }else{
                call('not_ok');
                break;
            }
    }
}


//
//case 18:
//if(result.time_in_current_role === ''){
//    call('Timezones id is empty');
//    break;
//}else{
//    array.push(' ');
//}
//case 19:
//if(result.time_in_current_role === ''){
//    call('Timezones id is empty');
//    break;
//}else{
//    array.push(' ');
//}
