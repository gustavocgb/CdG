import { Encrypter } from "../../../../src/infra/cryptography/encrypter";

describe("Encrypter", () => {
  test("should encrypt a string", () => {
    const encrypter = new Encrypter();
    const encrypted = encrypter.encrypt("value");
    expect(encrypted).not.toBe("value");
  });

  test("should decrypt a string", () => {
    const encrypter = new Encrypter();
    const encrypted = encrypter.encrypt("value");
    const decrypted = encrypter.decrypt(encrypted);
    expect(decrypted).toBe("value");
  });
});
