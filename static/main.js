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
 



const Vitaly = new Profile({
                    username: 'Vitaly',
                    name: { firstName: 'Vitaly', lastName: 'Chernyshev' },
                    password: 'can_be_guessed',
});

const Svetlana = new Profile({
                    username: 'Svetlana',
                    name: { firstName: 'Svetlana', lastName: 'Chernysheva' },
                    password: 'the_same_as__has',
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
      
      Vitaly.addNewUser(Vitaly.user, (err, data) => {
         if (err) {
           console.error(`Error creating user ${Vitaly.user.name.firstName}`);
         } else {
           console.log(`User  ${Vitaly.user.name.firstName} has been successfully created`);
           Vitaly.performLogin({
                    username: Vitaly.user.username,
                    password: Vitaly.user.password,
                }, (err, data) => {
                  if (err) {
                    console.error(`An error occured I couldnt log you in, ${Vitaly.user.name.firstName}, sorry`);
                   } else {
                     console.log(`You're now logged in, ${Vitaly.user.name.firstName}`);
                     Vitaly.addMoney({ currency: 'RUB', amount: rubsToAdd }, (err, data) => {
                       if (err) {
                         console.error('Error during adding money to Vitaly');
                       } else {
                         console.log(`Added ${rubsToAdd} rubles to Vitaly`); 
                         Vitaly.convertMoney({
                            fromCurrency: "RUB",
                            targetCurrency: "NETCOIN",
                            targetAmount: 1
                         }, (err, data) => {
                           if (err) {
                             console.error('Oops.. I couldnt perform the requested conversion, please check you have enough money and that your request has no mistakes');
                             Svetlana.addNewUser(Svetlana.user, (err, data) => {
                               if (err) {
                                 console.error(`Error creating user ${Svetlana.user.name.firstName}`);
                               } else {
                                 console.log(`User  ${Svetlana.user.name.firstName} has been successfully created`);
                                 Svetlana.performLogin({username:Svetlana.user.username, password:Svetlana.user.password,}, (err, data) => {
                                   if (err) {
                                     console.error(`An error occured I couldnt log you in, ${Svetlana.user.name.firstName}, sorry`);
                                   } else {
                                     console.log(`You're now logged in, ${Svetlana.user.name.firstName}`);
                                     Vitaly.transferMoney({ to: 'Svetlana', amount: 1 }, (err, data) => {
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
*/




getStocks((err, data) => {
  if(err) {
    console.error('Error during getting stocks');
    throw err;
    } else {
      const currencies = data;
      let rubToNetcoin = currencies[99].RUB_NETCOIN;
      console.log("RUB to NETCOIN " + rubToNetcoin)
      let rubsToAdd = 10000;
      console.log("rubs to add " + rubsToAdd)
      let netcoinsFromRubs = Math.floor(rubsToAdd*rubToNetcoin);
      console.log("netcoins from rubs  " + netcoinsFromRubs)
      
      Vitaly.addNewUser(Vitaly.user, (err, data) => {
         if (err) {
           console.error(`Error creating user ${Vitaly.user.name.firstName}`);
         } else {
           console.log(`User  ${Vitaly.user.name.firstName} has been successfully created`);
           Vitaly.performLogin({
                    username: Vitaly.user.username,
                    password: Vitaly.user.password,
                }, (err, data) => {
                  if (err) {
                    console.error(`An error occured I couldnt log you in, ${Vitaly.user.name.firstName}, sorry`);
                   } else {
                     console.log(`You're now logged in, ${Vitaly.user.name.firstName}`);
                     Vitaly.addMoney({ currency: 'RUB', amount: rubsToAdd }, (err, data) => {
                       if (err) {
                         console.error('Error during adding money to Vitaly');
                       } else {
                         console.log(`Added ${rubsToAdd} rubles to Vitaly`); 
                         Vitaly.convertMoney({
                            fromCurrency: "RUB",
                            targetCurrency: "NETCOIN",
                            targetAmount: netcoinsFromRubs
                         }, (err, data) => {
                           if (err) {
                             console.error('Oops.. I couldnt perform the requested conversion, please check you have enough money and that your request has no mistakes');
                            } else {
                              console.log(`Done. You have additional ${netcoinsFromRubs} NETCOINS now`);
                              Svetlana.addNewUser(Svetlana.user, (err, data) => {
                               if (err) {
                                 console.error(`Error creating user ${Svetlana.user.name.firstName}`);
                               } else {
                                 console.log(`User  ${Svetlana.user.name.firstName} has been successfully created`);
                                 Svetlana.performLogin({username:Svetlana.user.username, password:Svetlana.user.password,}, (err, data) => {
                                   if (err) {
                                     console.error(`An error occured I couldnt log you in, ${Svetlana.user.name.firstName}, sorry`);
                                   } else {
                                     console.log(`You're now logged in, ${Svetlana.user.name.firstName}`);
                                     Vitaly.transferMoney({ to: 'Svetlana', amount: netcoinsFromRubs}, (err, data) => {
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
          });
