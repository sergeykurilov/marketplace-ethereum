const { catchRevert } = require("./utils/exceptions")
const CourseMarketplace = artifacts.require("Coursemarketplace");

contract("Coursemarketplace", accounts => {
    const courseId = "0x00000000000000000000000000003130";
    const proof = "0x0000000000000000000000000000313000000000000000000000000000003130"
    const value = "900000000";

    let _contract = null;
    let contactOwner = null;
    let buyer = null;
    let courseHash = null;

    before(async () => {
        _contract = await CourseMarketplace.deployed();
        contactOwner = accounts[0];
        buyer = accounts[1];
    })

    describe("Purchase the new course", () => {

       before(async () => {
           await _contract.purchaseCourse(courseId, proof, {from: buyer, value: value});
       })
       it("should not allow to repurchase already owned course", async () => {
           await catchRevert(_contract.purchaseCourse(courseId, proof, {from: buyer, value: value}));
       })


       it("can get the purchase course hash by index", async () => {
            const index = 0;
            courseHash = await _contract.getCourseHashAtIndex(index);
            const expectedHash = web3.utils.soliditySha3(
                {type: "bytes16", value: courseId},
                {type: "address", value: buyer},
            );

            assert.equal(courseHash, expectedHash, "Course hash is not matching the purchased course!");
       })

       it("should match the purchased of the course purchased by buyer", async () => {
            const expectedIndex = 0;
            const index = 0;
            const expectedState = 0;
            const course = await _contract.getCourseByHash(courseHash);

            assert.equal(course.id, expectedIndex, "Course index shoule be 0!");
            assert.equal(course.price, value, `Course index should be ${value}!`);
            assert.equal(course.proof, proof, `Course index should be ${proof}!`);
            assert.equal(course.owner, buyer, `Course index should be ${buyer}!`);
            assert.equal(course.state, expectedIndex, `Course index should be ${expectedIndex}!`);
       });
    });

    describe("Activate the purchased course", () => {
        it("should NOT be able to activate course by NOT contract owner", async () => {
            await catchRevert(_contract.activateCourse(courseHash, {from: buyer}))
        })

        it("should have 'activated' state", async () => {
            await _contract.activateCourse(courseHash, {from: contactOwner})
            const course = await _contract.getCourseByHash(courseHash)
            const exptectedState = 1

            assert.equal(course.state, exptectedState, "Course should have 'activated' state")
        })
    })

    describe("Transfer ownership", () => {
        let currentOwner = null;
        before(async () => {
            currentOwner = await _contract.getContractOwner()
        })

        it("getContractOwner should return deployer address", async () => {
            assert.equal(contactOwner, currentOwner, "Contract owner is not matching the one from getContractOwner function")
        })

        it("should not tranfer ownership when owner is not sending TX", async () => {
            await catchRevert(_contract.transferOwnership(accounts[3], {from: accounts[4]}))
        })

        it("should transfer ownership to 3rd address from 'accounts'", async () => {
            await _contract.transferOwnership(accounts[2], {from: currentOwner})
            const owner = await _contract.getContractOwner()
            assert.equal(owner, accounts[2], "Contract owner is not the second account")
        })

        it("should transfer ownership back to initial contract owner'", async () => {
            await _contract.transferOwnership(contactOwner, {from: accounts[2]})
            const owner = await _contract.getContractOwner()
            assert.equal(owner, contactOwner, "Contract owner is not set")
        })
    })
})
