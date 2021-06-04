//Crypto JS Library
import * as CryptoJS from 'crypto-js';

export class Cryptography{

    private secretKey: string = "weikjnal4df46sddgHF";

    constructor(){}

    public AesEncryptData(data: any) {
      try {
        var key = CryptoJS.enc.Hex.parse('37383234363661376461646131333435');
        var plaintText = data;
        var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        var enced = encryptedData.ciphertext.toString()
        return enced;
      } catch (e) {
        return null;
      }
    }

    public AesDecryptData(data: any) {
      var key = CryptoJS.enc.Hex.parse('37383234363661376461646131333435');
      var dec = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(data), key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return dec.toString(CryptoJS.enc.Utf8);
    }

    public EncryptData(data: any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    } catch (e) {
      return null;
    }
  }

    public DecryptData(data: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.secretKey);

      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }

    } catch (e) {
      return null;
    }
  }
}
