const bcrypt = require('bcryptjs');
const db = require('../data/database');

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async exists() {
    const existingUser = await db.getDb().collection('users').findOne({ email: this.email });
    return existingUser;
  }

  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const user = { email: this.email, password: hashedPassword };
    await db.getDb().collection('users').insertOne(user);
  }

  static async findByEmail(email) {
    return await db.getDb().collection('users').findOne({ email });
  }

  async comparePassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

module.exports = User;
