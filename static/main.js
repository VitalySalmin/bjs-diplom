class Profile {
  constructor(user) {
    this.user = user;
  	}
  	addNewUser({
            username,
            name: { firstName, lastName },
            password,
        }, callback) {
  	  console.log(`Creating user  ${this.user.username}... `);
  	  return ApiConnector.createUser({
            username,
            name: { firstName, lastName },
            password,
        }, (err, data) => {
            console.log(`Please wait a few moments, creation of user ${this.user.username} is almost completed `);
            callback(err, data);
        });
    }	

    addMoney({ currency, amount }, callback) {
        console.log(`Adding ${amount} of ${currency} to ${this.user.username}`);
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            callback(err, data);
        });
    }
    
    performLogin({ username, password }, callback) {
      console.log( `Please wait while I'm logging you in, ${this.user.name.firstName}`);
      return ApiConnector.performLogin({ username, password}, (err, data) => {
          callback(err, data);
        });
    }
    
    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
      console.log(`Converting ${fromCurrency}s into ${targetCurrency}s for you to have ${targetAmount} ${targetCurrency}s`);
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
          callback(err, data);
        });
    } 
    
    transferMoney({ to, amount }, callback) {
      console.log(`Transferring ${amount} token(s) to ${to}`);
      return ApiConnector.transferMoney({ to, amount },  (err, data) => {
        callback(err, data);
     });    
    }
}
   
let stocks = (callback) => {
  return ApiConnector.getStocks((err, data) => {
  	callback(err, data);
   });
} 

 let currentStocks = stocks((err, data) => { 
        if (err) {
                console.error('Couldnt get the stocks');
        } else {
                console.log(`Stocks list successfully retrieved`);
 }})
 
 console.log(`currentStocks  ${currentStocks} `)
 



const Ivan = new Profile({
                    username: 'Ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'can_be_guessed',
});

const Maria = new Profile({
                    username: 'Maria',
                    name: { firstName: 'Maria', lastName: 'Chernysheva' },
                    password: 'the_same_as_Ivan_has',
});
       
Ivan.addNewUser(Ivan.user, (err, data) => {
  if (err) {
    console.error(`Error creating user ${Ivan.user.name.firstName}`);
  } else {
    console.log(`User  ${Ivan.user.name.firstName} has been successfully created`);
  }
  });

Ivan.performLogin({username:Ivan.user.username, password:Ivan.user.password,}, (err, data) => {
  if (err) {
    console.error(`An error occured I couldnt log you in, ${Ivan.user.name.firstName}, sorry`);
  } else {
    console.log(`You're now logged in, ${Ivan.user.name.firstName}`);
  }
});

Ivan.addMoney({ currency: 'RUB', amount: 100000 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Ivan');
        } else {
                console.log(`Added 100 rubles to Ivan`);
}});

Ivan.convertMoney({
    username: "Ivan",
    fromCurrency: "RUB",
    targetCurrency: "NETCOIN",
    targetAmount: 1
    }, (err, data) => {
        if (err) {
                console.error('Oops.. I couldnt perform the requested conversion, please check you have enough money and that your request has no mistakes');
        } else {
                console.log(`Done. You have additional ${targetAmount} ${targetCurrensy}s now`);
}});

Maria.addNewUser(Maria.user, (err, data) => {
  if (err) {
    console.error(`Error creating user ${Maria.user.name.firstName}`);
  } else {
    console.log(`User  ${Maria.user.name.firstName} has been successfully created`);
  }
  });

Maria.performLogin({username:Maria.user.username, password:Maria.user.password,}, (err, data) => {
  if (err) {
    console.error(`An error occured I couldnt log you in, ${Maria.user.name.firstName}, sorry`);
  } else {
    console.log(`You're now logged in, ${Maria.user.name.firstName}`);
  }
});


Maria.addMoney({ currency: 'RUB', amount: 100000 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Maria');
        } else {
                console.log(`Added 100 rubles to Maria`);
}});


Maria.convertMoney({
    username: "Maria",
    fromCurrency: "RUB",
    targetCurrency: "NETCOIN",
    targetAmount: 1
    }, (err, data) => {
        if (err) {
                console.error('Oops.. I couldnt perform the requested conversion, please check you have enough money and that your request has no mistakes');
        } else {
                console.log(`Done. You have additional ${targetAmount} ${targetCurrensy}s now`);
}});

