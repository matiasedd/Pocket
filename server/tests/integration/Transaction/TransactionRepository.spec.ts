/* eslint-disable no-undef */
describe('Class: Transaction repository', () => {
  context('Reading transactions', () => {
    describe('Method: read', () => {
      it('should return a transaction when the id exists', () => {

      });

      it('should return an empty object when the id does not exist', () => {

      });

      it('should return an empty object when no id is passed', () => {

      });
    });

    describe('Method: readByUser', () => {
      it('should return a transactions array when the user exists', () => {

      });

      it('should return an empty array when the user does not exist', () => {

      });

      it('should return an empty array when no user is passed', () => {

      });
    });
  });

  context('Creating transactions', () => {
    describe('Method: insert', () => {
      it('should return a transaction with all model attributes when a valid transaction is passed', () => {

      });

      it('should throw an error when the transaction has not all obligatory attributes', () => {

      });

      it('should throw an error when no transaction is passed', () => {

      });
    });
  });

  context('Updating transactions', () => {
    describe('Method: update', () => {
      it('should return a transaction with updated attributes when a valid transaction is passed', () => {

      });

      it('should throw an error when the transaction id is invalid', () => {

      });

      it('should return a transaction with all attributes when the transaction id is valid but the attributes not', () => {

      });

      it('should throw an error when no transaction is passed', () => {

      });
    });
  });

  context('Removing transactions', () => {
    describe('Method: delete', () => {
      it('should return true when a valid transaction is passed', () => {

      });

      it('should throw an error when a transaction with invalid id is passed', () => {

      });

      it('should throw an error when no transaction is passed', () => {

      });
    });
  });
});
