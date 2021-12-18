const Sequelize = require('sequelize');
// connection
const sequelize = new Sequelize({
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: './src/modules/db/db.sqlite',
})
// databases
const rship = sequelize.define('relationships', {
	userID1: Sequelize.STRING,
	userID2: Sequelize.STRING,
	percentage: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})
const profile = sequelize.define('profiles', {
	server: Sequelize.STRING,
	user: Sequelize.STRING,
	exp:{
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false
	},
	level:{
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false
	},
	currency:{
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false
	},
	cur_type: Sequelize.STRING,
	badges: Sequelize.STRING
})
const sProf = sequelize.define('shared_profile', {
	user: Sequelize.STRING,
	sBadges: Sequelize.STRING
})
// syncing
module.exports.sync = () => {
	rship.sync()
	profile.sync()
	sProf.sync()
}
// commands
module.exports.ship = async (userOne, userTwo) => {
	const results1 = await rship.findOne({where: {userID1: userOne, userID2: userTwo}})
	const results2 = await rship.findOne({where: {userID1: userTwo, userID2: userOne}})
	const result = results1 || results2;

	if(!result){
		const perc = Math.floor(Math.random() * 100 + 0.25)
		await rship.create({
			userID1: userOne,
			userID2: userTwo,
			percentage: perc
		})
		const results = await rship.findOne({where: {userID1: userOne, userID2: userTwo}})
		return results.get('percentage')
	} else return result.get('percentage')
}
module.exports.exec = async (yes) => {
	eval(yes)
}