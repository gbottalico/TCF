module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'production':
            return {
                        "connectionString": "mongodb://ftc.finconsgroup.com:27017/tcf",
                        "apiUrl": "http://ftc.finconsgroup.com:4000",
                        "secret": "TciFincons2017"  
                    };
        default:
            return {
                        "connectionString": "mongodb://localhost:27017/tcf",
                        "apiUrl": "http://localhost:4000",
                        "secret": "TciFincons2017"  
                    };
    }
};

