"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeySharesPayloadV3 = void 0;
const tslib_1 = require("tslib");
const underscore_1 = tslib_1.__importDefault(require("underscore"));
const ethers = tslib_1.__importStar(require("ethers"));
const class_validator_1 = require("class-validator");
/**
 * Key Shares Payload v2.
 */
class KeySharesPayloadV3 {
    constructor() {
        this.readable = null;
        this.raw = null;
    }
    decodeRSAShares(arr) {
        return arr.map(item => ('0x' + Buffer.from(item, 'base64').toString('hex')));
    }
    sharesToBytes(publicKeys, privateKeys) {
        const encryptedShares = this.decodeRSAShares(privateKeys);
        const arrayPublicKeys = new Uint8Array(publicKeys.map(pk => [...ethers.utils.arrayify(pk)]).flat());
        const arrayEncryptedShares = new Uint8Array(encryptedShares.map(sh => [...ethers.utils.arrayify(sh)]).flat());
        // public keys hex encoded
        const pkHex = ethers.utils.hexlify(arrayPublicKeys);
        // length of the public keys (hex), hex encoded
        const pkHexLength = String(pkHex.length.toString(16)).padStart(4, '0');
        // join arrays
        const pkPsBytes = Buffer.concat([arrayPublicKeys, arrayEncryptedShares]);
        // add length of the public keys at the beginning
        // this is the variable that is sent to the contract as bytes, prefixed with 0x
        return `0x${pkHexLength}${pkPsBytes.toString('hex')}`;
    }
    build(data) {
        return [
            data.validatorPublicKey,
            data.operatorsIds.join(','),
            this.sharesToBytes(data.encryptedShares.map((share) => share.publicKey), data.encryptedShares.map((share) => share.privateKey)),
            data.ssvAmount,
        ];
    }
    /**
     * Setting data in array or object format or cleaning it up.
     * @param data
     */
    setData(data) {
        // Cleanup
        if (!data === null) {
            this.raw = null;
            this.readable = null;
            return;
        }
        // Payload array
        if (underscore_1.default.isArray(data)) {
            this.raw = this.toRaw(data);
            this.readable = this.toReadable(data);
            return;
        }
        // Payload object (typically from key shares file)
        if (underscore_1.default.isObject(data)) {
            if (data.readable) {
                this.readable = data.readable;
            }
            if (data.raw) {
                this.raw = data.raw;
            }
        }
    }
    /**
     * Building raw payload for web3.
     * @param payload
     */
    toRaw(payload) {
        return payload.join(',');
    }
    /**
     * Building readable payload structure.
     * @param payload
     */
    toReadable(payload) {
        return {
            validatorPublicKey: payload[KeySharesPayloadV3.PAYLOAD_INDEX_VALIDATOR_PUBLIC_KEY],
            operatorIds: payload[KeySharesPayloadV3.PAYLOAD_INDEX_OPERATOR_IDS],
            shares: payload[KeySharesPayloadV3.PAYLOAD_INDEX_SHARES_KEYS],
            ssvAmount: payload[KeySharesPayloadV3.PAYLOAD_INDEX_SSV_AMOUNT],
        };
    }
    validate() {
        // Find out how final payload can be validated.
    }
}
KeySharesPayloadV3.PAYLOAD_INDEX_VALIDATOR_PUBLIC_KEY = 0;
KeySharesPayloadV3.PAYLOAD_INDEX_OPERATOR_IDS = 1;
KeySharesPayloadV3.PAYLOAD_INDEX_SHARES_KEYS = 2;
KeySharesPayloadV3.PAYLOAD_INDEX_SSV_AMOUNT = 3;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)()
], KeySharesPayloadV3.prototype, "readable", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], KeySharesPayloadV3.prototype, "raw", void 0);
exports.KeySharesPayloadV3 = KeySharesPayloadV3;
//# sourceMappingURL=KeySharesPayloadV3.js.map