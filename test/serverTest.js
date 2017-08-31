import supertest from 'supertest';
import chai from 'chai';
import userData from '../model/schema';
import sinon from 'sinon';
import app from '../bin/initial';
let url = 'http://localhost:3011';
let sinonStubFetch = sinon.stub(userData, 'find');
 let sinonStubInsert = sinon.stub(userData.prototype, 'save');
let sinonStubUpdate  =  sinon.stub(userData.prototype, 'update');
let sinonStubDeletee = sinon.stub(userData, 'remove');

describe('Test fetch data',() =>{
	
	before(() => {
		sinonStubFetch.yields(null, [{Name: 'Chandra',EmpId: 50042935, Address :'Lucknow' }]);
	});
	it('validation',(done) => {
		
	
		supertest(url)
			.get('/')
			.expect(200)
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if (err) return done(err);
				chai.expect(res.body[0].Name).to.equal("Chandra");
				chai.expect(res.body[0].EmpId).to.equal(50042935);
                chai.expect(res.body[0].Address).to.equal('Lucknow');
				done();
		});
	});
});

 describe('Insert Testing',() =>{
	
  let user = {Name: 'shivam', EmpId: 50042950, Address:'Lucknow'};
  before((done) => 
  {
  	sinonStubInsert.yields(null, [user]);
	done();	
  });

	it('Insert data',(done) => {
		supertest(url)
			.post('/users')
			.expect(200)
			.expect('Content-Type', /json/)
			.send(user)
			.end((err, res) => {				
				if (err) return done(err);
		     	chai.expect(res.body[0].Name).to.equal('shivam');
				chai.expect(res.body[0].EmpId).to.equal(50042950);
				chai.expect(res.body[0].Address).to.equal('Lucknow');
				done();
			});
          
			 
		});
	});



describe('Update Testing',(done) =>{
	
        beforeEach(() => {
		
		sinonStubUpdate.withArgs({Name : 'Chandra'},
			{$set : {Address : 'Delhi'}}).yields(null, { ok: 1, nModified: 0, n: 0});
		
	    });
     
	it('Update data',(done) => {
		supertest(url)
			.put('/update/:Chandra')
			.expect("Content-Type", /json/)
			.send({$set : {Address : 'Delhi'}})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				chai.expect(res.body.ok).to.equal(1)
				chai.expect(res.body.nModified).to.equal(0);
				chai.expect(res.body.n).to.equal(0);

				done();
			});		 
		});
	});

describe('Delete Testing',(done) =>{
	 
        beforeEach(() => {
		sinonStubDeletee.withArgs({ EmpId : 50042935 }).yields(null, {ok:1, nRemoved: 1, n:1});
		
	    });

	it('Delete data',(done) => {
		supertest(url)
			.delete('/deletee')
			.expect("Content-Type", /json/)
			.send({ EmpId : 50042935})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				chai.expect(res.body.ok).to.equal(1);	
				chai.expect(res.body.nRemoved).to.equal(1);
				chai.expect(res.body.n).to.equal(1);
                
				done();
			
				
			});
          
			 
		});
	});