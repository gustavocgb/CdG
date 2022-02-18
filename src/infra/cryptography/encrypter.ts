import env from "../dotenv"

export class Encrypter {
  private readonly encrypter;
	private readonly secret = env.GEOAPI_SECRET;

  constructor() {
    this.encrypter = new (require("encrypter"))(this.secret);
  }

  encrypt(data: string): string {
    return this.encrypter.encrypt(data);
  }

  decrypt(data: string): string {
    return this.encrypter.decrypt(data);
  }
}
