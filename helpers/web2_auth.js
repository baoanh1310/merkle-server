const nearAPI = require("near-api-js");
const { keyStores, connect } = nearAPI;
const nacl = require('tweetnacl')
const { nearConfig } = require('./../config')

module.exports = async (account, encoded_signature, publicKey) => {
  // connect to NEAR blockchain
  const homedir = require("os").homedir();
  const CREDENTIALS_DIR = ".near-credentials";
  const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
  const config = { ...nearConfig };
  config['keyStore'] = keyStore;
	const near = await connect(config);

  // check if public key exists on-chain and belong to account or not
  const near_account = await near.account(account);
	let keys = await near_account.getAccessKeys();
	keys = keys.map(key => key['public_key']);
	let is_pub_key_onchain = keys.indexOf(publicKey);

	if (is_pub_key_onchain == -1) {
		return { isValid: false, type: 1, message: "You're trying to use invalid access key"};
	}

  // check if public key match secret key or not
  let message = new TextEncoder().encode(account);

  let pb = new Uint8Array(Buffer.from(baseDecode(publicKey.split(':')[1])));
  
  let signature = new Uint8Array(baseDecode(encoded_signature));

  let is_valid = nacl.sign.detached.verify(message, signature, pb);
  if (!is_valid) {
    return { isValid: false, type: 2, message: "Your public key and secret key are not match"};
  } else {
    return { isValid: true, type: 3, message: "Pass authenticate"};
  }
}