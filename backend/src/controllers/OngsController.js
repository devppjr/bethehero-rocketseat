const connection = require('../database/connection');
const { crypto } = require('crypto');

module.exports = {
	async index(req, res) {
		const { page = 1 } = req.query;

		const [count] = await connection("ongs").count();

		res.header("X-Total-Count", count["count(*)"]);

		return res.json(
			await connection("ongs")
				.limit(5)
				.offset((page - 1) * 5)
				.select("*")
		);
	},

	async create(req, res) {
		const { name, email, whatsapp, city, uf } = req.body;
		const id = crypto.randomBytes(4).toString("HEX");

		await connection("ongs").insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});

		return res.json({ id });
	},
};
