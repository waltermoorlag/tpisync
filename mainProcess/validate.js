function validate(){
    let resultValidate = {
        ok: true,
        dataError: ''
    };
    if(!process.env['db_user']){
        resultValidate.ok = false;
        resultValidate.dataError += "Falta parametrizar variable de entorno db_user\n";
    }
    if(!process.env['db_pass']){
        resultValidate.ok = false;
        resultValidate.dataError += "Falta parametrizar variable de entorno db_pass\n";
    }
    if(!process.env['db_host']){
        resultValidate.ok = false;
        resultValidate.dataError += "Falta parametrizar variable de entorno db_host\n"
    }
    return resultValidate;
}

module.exports = { validate };