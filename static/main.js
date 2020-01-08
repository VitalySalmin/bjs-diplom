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

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks info`);
        callback(err, data);
    });
}
 



const Vanya = new Profile({
                    username: 'Vanya',
                    name: { firstName: 'Vanya', lastName: 'Chernyshev' },
                    password: 'can_be_guessed',
});

const Maria = new Profile({
                    username: 'Maria',
                    name: { firstName: 'Maria', lastName: 'Chernysheva' },
                    password: 'the_same_as__has',
});
 
getStocks((err, data) => {
  if(err) {
    console.error('Error during getting stocks');
    throw err;
    } else {
      const currencies = data;
      console.log(currencies)
      let rubToNetcoin = currencies[99].RUB_NETCOIN;
      console.log("RUB to NETCOIN " + rubToNetcoin)
      let rubsToAdd = 10000;
      console.log("rubs to add " + rubsToAdd)
      let netcoinsFromRubs = Math.floor(rubsToAdd*rubToNetcoin);
      console.log("netcoins from rubs  " + netcoinsFromRubs)
      console.log(typeof (rubsToAdd));
      
      Vanya.addNewUser(Vanya.user, (err, data) => {
         if (err) {
           console.error(`Error creating user ${Vanya.user.name.firstName}`);
         } else {
           console.log(`User  ${Vanya.user.name.firstName} has been successfully created`);
           Vanya.performLogin({
                    username: Vanya.user.username,
                    password: Vanya.user.password,
                }, (err, data) => {
                  if (err) {
                    console.error(`An error occured I couldnt log you in, ${Vanya.user.name.firstName}, sorry`);
                   } else {
                     console.log(`You're now logged in, ${Vanya.user.name.firstName}`);
                     Vanya.addMoney({ currency: 'RUB', amount: rubsToAdd }, (err, data) => {
                       if (err) {
                         console.error('Error during adding money to Vanya');
                       } else {
                         console.log(`Added ${rubsToAdd} rubles to Vanya`); 
                         Vanya.convertMoney({
                            fromCurrency: "RUB",
                            targetCurrency: "NETCOIN",
                            targetAmount: 1
                         }, (err, data) => {
                           if (err) {
                             console.error('Oops.. I couldnt perform the requested conversion, please check you have enough money and that your request has no mistakes');
                             Maria.addNewUser(Maria.user, (err, data) => {
                               if (err) {
                                 console.error(`Error creating user ${Maria.user.name.firstName}`);
                               } else {
                                 console.log(`User  ${Maria.user.name.firstName} has been successfully created`);
                                 Maria.performLogin({username:Maria.user.username, password:Maria.user.password,}, (err, data) => {
                                   if (err) {
                                     console.error(`An error occured I couldnt log you in, ${Maria.user.name.firstName}, sorry`);
                                   } else {
                                     console.log(`You're now logged in, ${Maria.user.name.firstName}`);
                                     Vanya.transferMoney({ to: 'Maria', amount: 1 }, (err, data) => {
                                        if (err) {
                                          console.error('Failed to transfer');
                                        } else {
                                          console.log(`Transferred successfully`);
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }else {
                              console.log(`Done. You have additional ${targetAmount} ${targetCurrensy}s now`);
                            }
                          })
                        }
                      })
                    }
                  })
                  }
                })
              }
          });





/*getStocks((err, data) => {
  if(err) {
    console.error('Error during getting stocks');
    throw err;
    } else {
      const currencies = data;
      console.log(currencies)
      let rubToNetcoin = currencies[99].RUB_NETCOIN;
      console.log("RUB to NETCOIN " + rubToNetcoin)
      let rubsToAdd = 10000;
      console.log("rubs to add " + rubsToAdd)
      let netcoinsFromRubs = Math.floor(rubsToAdd*rubToNetcoin);
      console.log("netcoins from rubs  " + netcoinsFromRubs)
      console.log(typeof (rubsToAdd));
      
      Vanya.addNewUser(Vanya.user, (err, data) => {
         if (err) {
           console.error(`Error creating user ${Vanya.user.name.firstName}`);
         } else {
           console.log(`User  ${Vanya.user.name.firstName} has been successfully created`);
           Vanya.performLogin({
                    username: Vanya.user.username,
                    password: Vanya.user.password,
                }, (err, data) => {
                  if (err) {
                    console.error(`An error occured I couldnt log you in, ${Vanya.user.name.firstName}, sorry`);
                   } else {
                     console.log(`You're now logged in, ${Vanya.user.name.firstName}`);
                     Vanya.addMoney({ currency: 'RUB', amount: rubsToAdd }, (err, data) => {
                       if (err) {
                         console.error('Error during adding money to Vanya');
                       } else {
                         console.log(`Added ${rubsToAdd} rubles to Vanya`); 
                         Vanya.convertMoney({
                            fromCurrency: "RUB",
                            targetCurrency: "NETCOIN",
                            targetAmount: 1
                         }, (err, data) => {
                           if (err) {
                             console.error('Oops.. I couldnt perform the requested conversion, please check you have enough money and that your request has no mistakes');
                             Maria.addNewUser(Maria.user, (err, data) => {
                               if (err) {
                                 console.error(`Error creating user ${Maria.user.name.firstName}`);
                               } else {
                                 console.log(`User  ${Maria.user.name.firstName} has been successfully created`);
                                 Maria.performLogin({username:Maria.user.username, password:Maria.user.password,}, (err, data) => {
                                   if (err) {
                                     console.error(`An error occured I couldnt log you in, ${Maria.user.name.firstName}, sorry`);
                                   } else {
                                     console.log(`You're now logged in, ${Maria.user.name.firstName}`);
                                     Vanya.transferMoney({ to: 'Maria', amount: 1 }, (err, data) => {
                                        if (err) {
                                          console.error('Failed to transfer');
                                        } else {
                                          console.log(`Transferred successfully`);
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }else {
                              console.log(`Done. You have additional ${targetAmount} ${targetCurrensy}s now`);
                              Maria.addNewUser(Maria.user, (err, data) => {
                               if (err) {
                                 console.error(`Error creating user ${Maria.user.name.firstName}`);
                               } else {
                                 console.log(`User  ${Maria.user.name.firstName} has been successfully created`);
                                 Maria.performLogin({username:Maria.user.username, password:Maria.user.password,}, (err, data) => {
                                   if (err) {
                                     console.error(`An error occured I couldnt log you in, ${Maria.user.name.firstName}, sorry`);
                                   } else {
                                     console.log(`You're now logged in, ${Maria.user.name.firstName}`);
                                     Vanya.transferMoney({ to: 'Maria', amount: 1 }, (err, data) => {
                                        if (err) {
                                          console.error('Failed to transfer');
                                        } else {
                                          console.log(`Transferred successfully`);
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                  }
                })
              }
          });*/
