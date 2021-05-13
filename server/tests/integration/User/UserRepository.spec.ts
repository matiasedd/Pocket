/* eslint-disable no-undef */

const BASE_UUID = 'ddf2364c-771b-4045-9d01-9c133d998c83';
const ANOTHER_UUID = '402318ba-b41b-424f-884c-016c015fec54';

describe('Class: User repository', () => {
  context('Reading users', () => {
    describe('read(id)', () => {
      beforeEach(async () => {
        console.log('beforeEach');
      });

      afterEach(async () => {
        console.log('afterEach');
      });
      it('should return a user when the id exists', () => {

      });

      it('should return an empty object when the id does not exist', () => {

      });

      it('should return an empty object when no id is passed', () => {

      });
    });

    describe('Method: readByEmail', () => {
      it('should return a user when the email exists', () => {

      });

      it('should return an empty object when the email does not exist', () => {

      });

      it('should return an empty object when no email is passed', () => {

      });
    });

    describe('Method: readAll', () => {
      it('should return an array of users', () => {

      });
    });
  });

  context('Creating users', () => {
    describe('Method: insert', () => {
      it('should return a user with all model attributes when a valid user is passed', () => {

      });

      it('should throw an error when the user has not all obligatory attributes', () => {

      });

      it('should throw an error when no user is passed', () => {

      });
    });
  });

  context('Updating users', () => {
    describe('Method: update', () => {
      it('should return a user with updated attributes when a valid user is passed', () => {

      });

      it('should throw an error when the user id is invalid', () => {

      });

      it('should return a user with all attributes when the user id is valid but the attributes not', () => {

      });

      it('should throw an error when no user is passed', () => {

      });
    });
  });

  context('Removing users', () => {
    describe('Method: delete', () => {
      it('should return true when a valid user is passed', () => {

      });

      it('should throw an error when a user with invalid id is passed', () => {

      });

      it('should throw an error when no user is passed', () => {

      });
    });
  });
});
