const sequelize = require('../../src/db/models/index').sequelize;
const User = require("../../src/db/models").User;
const userQueries = require("../../src/db/queries/queries.users.js");

describe('User', () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      done();
    });
  });

  describe('Create', () => {

    it('Should create a user object with valid email, username, and password', (done) => {
      User.create({
        email: 'whatever@totally.com',
        password: '123456789',
        username: 'cooldude420'
      })
      .then((user) => {
        expect(user.email).toBe('whatever@totally.com');
        expect(user.username).toBe('cooldude420');
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        done();
      });
    });

    it('Should not create a user with invalid email', (done) => {
      User.create({
        email: "It's-a me, Mario!",
        password: "1234567890",
        username: "harden07deep"
      })
      .then((user) => {
        // This code block should not run
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it('Should not create a user with invalid password', (done) => {
      let newUser = {
        username: "lebronjames09",
        email: "ponylover@gmail.com",
        password: "1234"
      }

      userQueries.createUser(newUser, (err, user) => {
        if(err){
          expect(err).not.toBeNull();
          expect(err.message).toContain("Must be a valid password with 8-20 characters");
          done();
        } else {
          // This code block should not run
        }
       });
    });

    it('Should not create a user with invalid username', (done) => {
      User.create({
        username: "ho",
        email: "ponylover@gmail.com",
        password: "1234567890"
      })
      .then((user) => {
        // This code block should not run
      })
      .catch((err) => {
        expect(err).not.toBeNull();
        expect(err.message).toContain("Validation error: must be a valid username with 4-15 characters");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {
      
      let newUser = {
        email: 'dSizzy@gmail.com', 
        password: '12345678', 
        username: 'derekSheep',
        role: 0 
      };

      userQueries.createUser(newUser, (err, user) => {
        if(err){
          // This code block should not run
        }
        else { 
          userQueries.createUser(newUser, (err, user) => {
            if(err){
              expect(err).not.toBeNull();
              expect(err.message).toContain('Validation error');
              done();
            } else { 
              // This code block should not run
            }
          });
        }
      });        
    });
  });     
  
  describe('User role', () => {

    it('Should default to 0 when not provided.', (done) => {
      User.create({
        email: 'whatever@totally.com',
        password: '123456789',
        username: 'cooldude420'
      })
      .then((user) => {
        expect(user.email).toBe('whatever@totally.com');
        expect(user.username).toBe('cooldude420');
        expect(user.id).toBe(1);
        expect(user.role).toBe(0);
        done();
      })
      .catch((err) => {
        done();
      });
    });
  }); 
});

