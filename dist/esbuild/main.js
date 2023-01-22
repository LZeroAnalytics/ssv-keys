"use strict";(()=>{var Br=Object.create;var nr=Object.defineProperty;var Er=Object.getOwnPropertyDescriptor;var Lr=Object.getOwnPropertyNames;var Yr=Object.getPrototypeOf,Ur=Object.prototype.hasOwnProperty;var n=(s=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(s,{get:(r,e)=>(typeof require!="undefined"?require:r)[e]}):s)(function(s){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+s+'" is not supported')});var Hr=(s,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of Lr(r))!Ur.call(s,i)&&i!==e&&nr(s,i,{get:()=>r[i],enumerable:!(t=Er(r,i))||t.enumerable});return s};var K=(s,r,e)=>(e=s!=null?Br(Yr(s)):{},Hr(r||!s||!s.__esModule?nr(e,"default",{value:s,enumerable:!0}):e,s));var c=(s,r,e,t)=>{for(var i=t>1?void 0:t?Er(r,e):r,a=s.length-1,o;a>=0;a--)(o=s[a])&&(i=(t?o(r,e,i):o(i))||i);return t&&i&&nr(r,e,i),i};var u=(s,r,e)=>new Promise((t,i)=>{var a=p=>{try{l(e.next(p))}catch(y){i(y)}},o=p=>{try{l(e.throw(p))}catch(y){i(y)}},l=p=>p.done?t(p.value):Promise.resolve(p.value).then(a,o);l((e=e.apply(s,r)).next())});var Nr=K(n("atob")),gr=n("js-base64");var m=n("class-validator");var Rr=K(n("underscore")),d=n("class-validator");var f=n("class-validator");var W=n("class-validator");var vr=n("js-base64");var cr;try{window.crypto,cr=n("jsencrypt").JSEncrypt}catch(s){cr=n("node-jsencrypt")}var j=cr;var X=n("js-base64");var w=class extends Error{constructor(e,t){super(t);this.operator=e}},x=class{constructor(r,e){this.RAW_OPERATOR_PUBLIC_KEY_SIGNATURE=RegExp(/------BEGIN RSA PUBLIC KEY-----/,"gmi");this.operators=r.map(t=>this.RAW_OPERATOR_PUBLIC_KEY_SIGNATURE.test(t)?t:(0,X.decode)(t)),this.shares=e}encrypt(){let r=[];return Object.keys(this.operators).forEach(e=>{let t=new j({});try{t.setPublicKey(this.operators[e])}catch(o){throw new w({rsa:this.operators[e],base64:(0,X.encode)(this.operators[e])},`Operator is not valid RSA Public Key: ${o}`)}let i=t.encrypt(this.shares[e].privateKey),a={operatorPublicKey:this.operators[e],privateKey:String(i),publicKey:this.shares[e].publicKey};return r.push(a),a}),r}};var Pr=s=>{try{let r="Invalid operator key format, make sure the operator exists in the network",e=(0,vr.decode)(s);if(s.length<98)throw Error("The length of the operator public key must be at least 98 characters.");if(!e.startsWith("-----BEGIN RSA PUBLIC KEY-----"))throw Error(r);let t=new j({});try{t.setPublicKey(e)}catch(i){throw new w({rsa:e,base64:s},r)}return!0}catch(r){let{message:e}=r;return e}};var $=class extends Error{constructor(e,t){super(t);this.operator=e}},F=class extends Error{constructor(e,t){super(t);this.operator=e}},N=class extends Error{constructor(e,t,i){super(i);this.listOne=e,this.listTwo=t}},M=class extends Error{constructor(e,t){super(t);this.publicKey=e}};var T=class{validate(r){let e=Pr(r);if(e!==!0)throw new M(r,`${e}`);return!0}defaultMessage(){return"Invalid operator public key"}};T=c([(0,W.ValidatorConstraint)({name:"operatorPublicKey",async:!1})],T);function Ar(s){return function(r,e){(0,W.registerDecorator)({target:r.constructor,propertyName:e,options:s,constraints:[],validator:T})}}var D=class{setData(r){r.id&&(this.id=r.id),r.publicKey&&(this.publicKey=r.publicKey)}validate(){(0,f.validateSync)(this)}};c([(0,f.IsNotEmpty)({message:"The operator id is null"}),(0,f.IsDefined)({message:"The operator id is undefined"}),(0,f.IsInt)({message:"The operator id must be an integer"})],D.prototype,"id",2),c([(0,f.IsNotEmpty)({message:"The operator public key is null"}),(0,f.IsDefined)({message:"The operator public key is undefined"}),(0,f.IsString)({message:"The operator public key must be a string"}),Ar()],D.prototype,"publicKey",2);var Dr=K(n("underscore"));var pr;try{window.crypto,pr=n("bls-eth-wasm/browser")}catch(s){pr=n("bls-eth-wasm")}var h=pr;var Or=n("js-base64"),k=n("class-validator");var z=n("class-validator");var B=class{validate(r,e){let[t,i]=e.constraints,a=e.object[t].length;if(!Array.isArray(r))Object.values(r).forEach(o=>{if(a!==o.length)throw new N(e.object[t],r,i.message)});else if(a!==r.length)throw new N(e.object[t],r,i.message);return!0}defaultMessage(){return"The length of the entries lists are not equal"}};B=c([(0,z.ValidatorConstraint)({name:"MatchLength",async:!1})],B);function J(s,r){return function(e,t){(0,z.registerDecorator)({target:e.constructor,propertyName:t,options:r,constraints:[s,r],validator:B})}}var wr=K(n("web3")),O=new wr.default,xr=(s,r)=>s.map(e=>{let t=r?Object(e)[r]:e;return String(t).startsWith("0x")?t:O.eth.abi.encodeParameter("string",t)});var _=class{setData(r){r.publicKeys&&(this.validateArrayOfStrings(r.publicKeys),this.publicKeys=r.publicKeys),r.encryptedKeys&&(this.validateArrayOfStrings(r.encryptedKeys),this.encryptedKeys=r.encryptedKeys)}validate(){this.validatePublicKeys(),this.validateEncryptedKeys()}validateEncryptedKeys(){let r="";try{(this.encryptedKeys||[]).map(e=>{let t=e;t.startsWith("0x")&&(r=t,t=O.eth.abi.decodeParameter("string",e)),(0,Or.decode)(String(t))})}catch(e){throw Error(`Can not ABI decode shares encrypted key: ${r}. Error: ${String(e)}`)}}validatePublicKeys(){let r="";try{for(let e of this.publicKeys||[])r=e,h.deserializeHexStrToPublicKey(e.replace("0x",""))}catch(e){throw Error(`Can not BLS deserialize shares public key: ${r}. Error: ${String(e)}`)}}validateArrayOfStrings(r){if(!Dr.default.isArray(r)||!r.every(t=>typeof t=="string"))throw Error("Keys should be an array of strings")}};c([(0,k.IsArray)(),(0,k.MinLength)(98,{each:!0})],_.prototype,"publicKeys",2),c([(0,k.IsArray)(),(0,k.MinLength)(98,{each:!0}),J("publicKeys",{message:"Length of encrypted and public keys should be equal."})],_.prototype,"encryptedKeys",2);var q=n("class-validator");var L=class{validate(r){let e=new Set,t=new Set;for(let i of r||[]){if(e.has(i.id))throw new $(i,"Operator ID already exists");if(e.add(i.id),t.has(i.publicKey))throw new F(i,"Operator public key already exists");t.add(i.publicKey)}return!0}defaultMessage(){return"The list of operators contains duplicate entries"}};L=c([(0,q.ValidatorConstraint)({name:"operatorsList",async:!1})],L);function _r(s){return function(r,e){(0,q.registerDecorator)({target:r.constructor,propertyName:e,options:s,constraints:[],validator:L})}}var Q=n("class-validator");var G=class extends Error{constructor(e,t){super(t);this.publicKey=e}};var Y=class{validate(r){return u(this,null,function*(){try{yield h.init(h.BLS12_381),h.deserializeHexStrToPublicKey(r.replace("0x",""))}catch(e){throw new G(r,"Failed to BLS deserialize validator public key")}return!0})}defaultMessage(){return"Invalid public key"}};Y=c([(0,Q.ValidatorConstraint)({name:"publicKey",async:!0})],Y);function kr(s){return function(r,e){(0,Q.registerDecorator)({target:r.constructor,propertyName:e,options:s,constraints:[],validator:Y})}}var I=class{constructor(){this.publicKey=null;this.operators=null;this.shares=null}setData(r){if(r.publicKey&&(this.publicKey=r.publicKey),r.operators&&(this.operators=r.operators.map(e=>{let t=new D;return t.setData(e),t})),r.shares){let e=new _;Rr.default.isArray(r.shares)?e.setData({publicKeys:r.shares.map(t=>t.publicKey),encryptedKeys:r.shares.map(t=>t.privateKey)}):e.setData(r.shares),this.shares=e}}validate(){return u(this,null,function*(){(0,d.validateSync)(this)})}get sharesPublicKeys(){var r;return((r=this.shares)==null?void 0:r.publicKeys)||[]}get sharesEncryptedKeys(){var r;return((r=this.shares)==null?void 0:r.encryptedKeys)||[]}get operatorIds(){var r;return(r=this.operators)!=null&&r.length?this.operators.map(e=>parseInt(String(e.id),10)):[]}get operatorPublicKeys(){var r;return(r=this.operators)!=null&&r.length?this.operators.map(e=>String(e.publicKey)):[]}};c([(0,d.IsOptional)(),(0,d.IsString)(),(0,d.Length)(98,98),kr()],I.prototype,"publicKey",2),c([(0,d.IsOptional)(),(0,d.ValidateNested)({each:!0}),_r()],I.prototype,"operators",2),c([(0,d.IsOptional)(),(0,d.ValidateNested)(),J("operators",{message:"Length of operators and shares should be equal."})],I.prototype,"shares",2);var lr=K(n("underscore"));var v=n("class-validator");var E=class{constructor(){this.readable=null;this.raw=null}build(r){return[r.validatorPublicKey,r.operatorsIds.join(","),r.encryptedShares.map(e=>e.publicKey),xr(r.encryptedShares,"privateKey"),r.ssvAmount]}setData(r){if(!r===null){this.raw=null,this.readable=null;return}if(lr.default.isArray(r)){this.raw=this.toRaw(r),this.readable=this.toReadable(r);return}lr.default.isObject(r)&&(r.readable&&(this.readable=r.readable),r.raw&&(this.raw=r.raw))}toRaw(r){return r.join(",")}toReadable(r){return{validatorPublicKey:r[E.PAYLOAD_INDEX_VALIDATOR_PUBLIC_KEY],operatorIds:r[E.PAYLOAD_INDEX_OPERATOR_IDS],sharePublicKeys:r[E.PAYLOAD_INDEX_SHARE_PUBLIC_KEYS],sharePrivateKey:r[E.PAYLOAD_INDEX_SHARE_PRIVATE_KEYS],ssvAmount:r[E.PAYLOAD_INDEX_SSV_AMOUNT]}}validate(){return u(this,null,function*(){})}},g=E;g.PAYLOAD_INDEX_VALIDATOR_PUBLIC_KEY=0,g.PAYLOAD_INDEX_OPERATOR_IDS=1,g.PAYLOAD_INDEX_SHARE_PUBLIC_KEYS=2,g.PAYLOAD_INDEX_SHARE_PRIVATE_KEYS=3,g.PAYLOAD_INDEX_SSV_AMOUNT=4,c([(0,v.IsOptional)(),(0,v.IsObject)()],g.prototype,"readable",2),c([(0,v.IsOptional)(),(0,v.IsString)()],g.prototype,"raw",2);var Z=class extends I{};var yr=K(n("underscore")),rr=K(n("ethers")),P=n("class-validator");var R=class{constructor(){this.readable=null;this.raw=null}decodeRSAShares(r){return r.map(e=>"0x"+Buffer.from(e,"base64").toString("hex"))}sharesToBytes(r,e){let t=this.decodeRSAShares(e),i=new Uint8Array(r.map(y=>[...rr.utils.arrayify(y)]).flat()),a=new Uint8Array(t.map(y=>[...rr.utils.arrayify(y)]).flat()),o=rr.utils.hexlify(i),l=String(o.length.toString(16)).padStart(4,"0"),p=Buffer.concat([i,a]);return`0x${l}${p.toString("hex")}`}build(r){return[r.validatorPublicKey,r.operatorsIds.join(","),this.sharesToBytes(r.encryptedShares.map(e=>e.publicKey),r.encryptedShares.map(e=>e.privateKey)),r.ssvAmount]}setData(r){if(!r===null){this.raw=null,this.readable=null;return}if(yr.default.isArray(r)){this.raw=this.toRaw(r),this.readable=this.toReadable(r);return}yr.default.isObject(r)&&(r.readable&&(this.readable=r.readable),r.raw&&(this.raw=r.raw))}toRaw(r){return r.join(",")}toReadable(r){return{validatorPublicKey:r[R.PAYLOAD_INDEX_VALIDATOR_PUBLIC_KEY],operatorIds:r[R.PAYLOAD_INDEX_OPERATOR_IDS],shares:r[R.PAYLOAD_INDEX_SHARES_KEYS],ssvAmount:r[R.PAYLOAD_INDEX_SSV_AMOUNT]}}validate(){}},b=R;b.PAYLOAD_INDEX_VALIDATOR_PUBLIC_KEY=0,b.PAYLOAD_INDEX_OPERATOR_IDS=1,b.PAYLOAD_INDEX_SHARES_KEYS=2,b.PAYLOAD_INDEX_SSV_AMOUNT=3,c([(0,P.IsOptional)(),(0,P.IsObject)()],b.prototype,"readable",2),c([(0,P.IsOptional)(),(0,P.IsString)()],b.prototype,"raw",2);var V=class{constructor({version:r}){this.byVersion={payload:{[V.VERSION_V2]:g,[V.VERSION_V3]:b},data:{[V.VERSION_V2]:I,[V.VERSION_V3]:Z}};this.version=r,this.data=this.getByVersion("data",r),this.payload=this.getByVersion("payload",r)}generateContractPayload(r){var t;let e=this.payload.build(r);(t=this.payload)==null||t.setData(e)}setData(r){!r||(this.data.setData(r),this.validate())}getByVersion(r,e){if(!this.byVersion[r])throw Error(`"${r}" is unknown entity`);if(!this.byVersion[r][e])throw Error(`"${r}" is not supported in version of key shares: ${e}`);return new this.byVersion[r][e]}validate(){(0,m.validateSync)(this)}fromJson(r){return typeof r=="string"&&(r=JSON.parse(r)),this.setData(r.data),this}toJson(){return JSON.stringify({version:this.version,data:this.data||null,payload:this.payload||null,createdAt:new Date().toISOString()},null,"  ")}},S=V;S.VERSION_V2="v2",S.VERSION_V3="v3",c([(0,m.IsString)(),(0,m.IsDefined)(),(0,m.IsNotEmpty)()],S.prototype,"version",2),c([(0,m.IsOptional)(),(0,m.ValidateNested)()],S.prototype,"data",2),c([(0,m.IsOptional)(),(0,m.ValidateNested)()],S.prototype,"payload",2);var ur=class extends Error{constructor(e,t){super(t);this.operators=e}},hr=class extends Error{constructor(e,t){super(t);this.operator=e}},mr=class{constructor(){this.shares=[]}static get DEFAULT_THRESHOLD_NUMBER(){return 3}create(r,e){return u(this,null,function*(){e.map(l=>{if(!Number.isInteger(l))throw new hr(l,`Operator must be integer. Got: ${String(l)}`)});let t=(e.length-1)/3;if(!Number.isInteger(t))throw new ur(e,"Invalid operators length. It should satisfy conditions: \u2016 Operators \u2016 := 3 * F + 1 ; F \u2208 \u2115");yield h.init(h.BLS12_381);let i=[],a=[];this.validatorPrivateKey=h.deserializeHexStrToSecretKey(r),this.validatorPublicKey=this.validatorPrivateKey.getPublicKey(),i.push(this.validatorPrivateKey),a.push(this.validatorPublicKey);for(let l=1;l<e.length-t;l+=1){let p=new h.SecretKey;p.setByCSPRNG(),i.push(p);let y=p.getPublicKey();a.push(y)}for(let l of e){let p=new h.Id;p.setInt(l);let y=new h.SecretKey;y.share(i,p);let A=new h.PublicKey;A.share(a,p),this.shares.push({privateKey:`0x${y.serializeToHexStr()}`,publicKey:`0x${A.serializeToHexStr()}`,id:p})}return{validatorPrivateKey:`0x${this.validatorPrivateKey.serializeToHexStr()}`,validatorPublicKey:`0x${this.validatorPublicKey.serializeToHexStr()}`,shares:this.shares}})}},er=mr;var dr=K(n("crypto")),Vr=n("scrypt-js"),tr=K(n("ethereumjs-wallet")),sr=n("ethereumjs-util");var fr=class{constructor(r){this.privateKey="";if(!r)throw new Error("Key store data should be JSON or string");if(typeof r=="string"?this.keyStoreData=JSON.parse(r):this.keyStoreData=r,!this.keyStoreData.version)throw new Error("Invalid keystore file")}getPublicKey(){var r;if(this.keyStoreData)switch((r=this.keyStoreData.version)!=null?r:this.keyStoreData.Version){case 1:return this.keyStoreData.Address;case 3:return this.keyStoreData.id;case 4:return this.keyStoreData.pubkey}return""}getPrivateKey(r=""){return u(this,null,function*(){if(this.privateKey)return this.privateKey;switch(this.keyStoreData.version){case 1:this.wallet=yield tr.default.fromV1(this.keyStoreData,r);break;case 3:this.wallet=yield tr.default.fromV3(this.keyStoreData,r,!0);break;case 4:this.wallet=yield this.fromV4(this.keyStoreData,r);break}if(this.wallet&&(this.privateKey=this.wallet.getPrivateKey().toString("hex"),!this.privateKey))throw new Error("Invalid password");return this.privateKey})}fromV4(r,e){return u(this,null,function*(){let t=typeof r=="object"?r:JSON.parse(r);if(t.version!==4)throw new Error("Not a V4 wallet");let i,a;if(t.crypto.kdf.function==="scrypt")a=t.crypto.kdf.params,i=(0,Vr.syncScrypt)(Buffer.from(e),Buffer.from(a.salt,"hex"),a.n,a.r,a.p,a.dklen);else if(t.crypto.kdf.function==="pbkdf2"){if(a=t.crypto.kdf.params,a.prf!=="hmac-sha256")throw new Error("Unsupported parameters to PBKDF2");i=dr.default.pbkdf2Sync(Buffer.from(e),Buffer.from(a.salt,"hex"),a.c,a.dklen,"sha256")}else throw new Error("Unsupported key derivation scheme");let o=Buffer.from(t.crypto.cipher.message,"hex"),l=Buffer.concat([Buffer.from(i.slice(16,32)),o]),y={keccak256:sr.keccak256,sha256:sr.sha256}[t.crypto.checksum.function];if(y(l).toString("hex")!==t.crypto.checksum.message)throw new Error("Invalid password");let H=dr.default.createDecipheriv(t.crypto.cipher.function,i.slice(0,16),Buffer.from(t.crypto.cipher.params.iv,"hex")),C=this.runCipherBuffer(H,o);return new tr.default(C)})}runCipherBuffer(r,e){return Buffer.concat([r.update(e),r.final()])}static toHexString(r){return Array.from(r,e=>`0${(e&255).toString(16)}`.slice(-2)).join("")}},ir=fr;var ar=class{constructor(r){if(!Object.values(ar.VERSION).includes(r))throw Error("Version is not supported");this.version=r,this.keySharesInstance=new S({version:this.version})}get keyShares(){return this.keySharesInstance}getPrivateKeyFromKeystoreData(r,e){return u(this,null,function*(){try{return new ir(r).getPrivateKey(e)}catch(t){return t}})}createThreshold(r,e){return u(this,null,function*(){return this.threshold=yield new er().create(r,e),this.threshold})}encryptShares(r,e,t=""){return u(this,null,function*(){try{let i=r.map(o=>String((0,gr.encode)((0,Nr.default)(o))));return new x(i,e).encrypt().map(o=>(o.operatorPublicKey=(0,gr.encode)(o.operatorPublicKey),t===ar.SHARES_FORMAT_ABI&&(o.operatorPublicKey=O.eth.abi.encodeParameter("string",o.operatorPublicKey),o.privateKey=O.eth.abi.encodeParameter("string",o.privateKey)),o))}catch(i){return i}})}buildShares(r,e,t){return u(this,null,function*(){let i=yield this.createThreshold(r,e);return console.log("?????",i),this.encryptShares(t,i.shares)})}getThreshold(){return this.threshold}getValidatorPublicKey(){var r;return((r=this.getThreshold())==null?void 0:r.validatorPublicKey)||""}buildPayload(r,e,t,i){return this.keyShares.generateContractPayload({validatorPublicKey:r,operatorsIds:e,encryptedShares:t,ssvAmount:i}),this.keyShares.payload}buildPayloadFromKeyShares(r,e){var l,p,y,A,H,C,br,Sr,Kr,Ir;let t=((p=(l=r.data)==null?void 0:l.shares)==null?void 0:p.publicKeys)||[],i=(y=r.data)==null?void 0:y.publicKey,a=((H=(A=r.data)==null?void 0:A.shares)==null?void 0:H.encryptedKeys)||[],o=((C=r.data)==null?void 0:C.operatorPublicKeys)||[];if(t.length!==a.length||t.length!==o.length||a.length!==o.length||!a.length||!o.length||!t.length)throw Error("Operator public keys and shares public/encrypted keys length does not match or have zero length.");return this.keyShares.generateContractPayload({validatorPublicKey:i,operatorsIds:(Sr=(br=r.data)==null?void 0:br.operators)==null?void 0:Sr.map(or=>or.id),encryptedShares:t.map((or,Tr)=>({publicKey:or,privateKey:a[Tr]})),ssvAmount:e||((Ir=(Kr=r.payload)==null?void 0:Kr.readable)==null?void 0:Ir.ssvAmount)||0}),this.keyShares.payload}},U=ar;U.SHARES_FORMAT_ABI="abi",U.VERSION={V2:"v2",V3:"v3"};})();
