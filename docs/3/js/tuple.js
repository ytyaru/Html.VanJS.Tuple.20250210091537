;(function(){
class Tuple {
    static #NOT_CALL_CONSTRUCTOR = 'Tupleのコンストラクタは呼出禁止です。代わりにTupe.of()またはTuple.mut()してください。'
    static #KEY_PATTERN = /^[a-zA-Z][a-zA-Z0-9]*$/;
    static of(script, ...anyValues) {return this.#new(script,false,...anyValues)}// 'key value ...' / 'key=value ...' / 'key:type' / 'key:type=def ...'
//    static imm(script) {return this.of(script)}
    static mut(script, ...anyValues) {return this.#new(script,true,...anyValues)}// ミュータブル（値の代入ができる版。キーの追加・削除は変わらず不可）
    static #new(script, isMutable, ...anyValues) {
        const ins = new Tuple(this.#NOT_CALL_CONSTRUCTOR)
        this.#defineInner(ins, '_obj', this.#parse(script, ...anyValues), isMutable);
        this.#defineInner(ins, '_originalTarget', ins, isMutable);
        this.#defineInner(ins, '_iterI', 0, true);
        this.#defineInner(ins, '_mutable', isMutable, false);
        for (let o of ins._obj){this.#defineMember(ins, o.k, o.v, isMutable)}
        return new Proxy(ins, this.#handler())
    }
    constructor(from) {
        if (Tuple.#NOT_CALL_CONSTRUCTOR!==from){throw new TypeError(Tuple.#NOT_CALL_CONSTRUCTOR)}
    }
    static #handler() { return {
        get: (target, key, receiver)=>{
                 if (Symbol.iterator===key){console.log('Symbol.iterator===key');return target[Symbol.iterator].bind(target);}
            else if (/^(-)?\d+$/.test(key)) {
                const i = parseInt(key);
                //const idx = i < 0 ? (target._obj.length - (key*-1)) % target._obj.length : key
                const idx = i < 0 ? (target._obj.length - (i*-1)) % target._obj.length : i
                return target._obj[idx].v;
                // 負数の場合、剰余で必ず範囲内にさせるか、超過例外させるか。
            } else if (Type.isStr(key)) {
                if (key in target) {
                    if (Type.hasGetter(target, key)) { return Reflect.get(target, key) } // ゲッター
                    else if ('function'===typeof target[key]) { return target[key].bind(target) } // メソッド参照
                    return target[key] // プロパティ値
                } else {
                    throw new TypeError(`存在しないキーです。:${key}`)
                    this.#throwName(key);
                }
            } else {throw new TypeError(`キーの型は整数か文字列であるべきです。:${key}:${typeof key}`)}
        },
        set: (target, key, value, receiver)=>{
            if (['_originalTarget', '_obj', '_iterI', '_mutable'].some(v=>v===key) && value instanceof Namespace) {target[key]=value;return true}
            if (!target._mutable){throw new TypeError(`代入禁止です。`)}
            // target._obj
            const iOrK = this.#getKey(key, target._obj.length);
            const i = target._obj.findIndex(o=>Type.isInt(iOrK) ? o.i===iOrK : o.k===iOrK)
            if (-1!==i) {target._obj[i].v = value}
            if (key in target) {target[key] = value;}
        },
        //ownKeys(target){return Reflect.ownKeys(target)},
        deleteProperty(target, key) {throw new TypeError(`削除禁止です。`)},
        isExtensible(target) {return false}, // 新しいプロパティ追加禁止
        //isExtensible(target) {throw new TypeError(`新しいプロパティ追加禁止です。`);return false}, // 新しいプロパティ追加禁止
        setPrototypeOf(target, prototype) {throw new TypeError(`プロトタイプへの代入禁止です。`)}
    } }
    static #getKey(key, len) {
        if (/^(-)?\d+$/.test(key)) {
            const i = parseInt(key);
            //const idx = i < 0 ? (target._obj.length - (key*-1)) % target._obj.length : key
            return i < 0 ? (len - (i*-1)) % len : i
        }
        else if (Type.isStr(key)) {return key}
        else {throw new TypeError(`キーの型は整数か文字列であるべきです。:${key}:${typeof key}`)}
    }
    static #validName(name) {return this.#KEY_PATTERN.test(name)} // obj['key']でなくobj.keyで参照可能かつキャメルケースのみ
    static #throwName(name) {if(!this.#validName(name)){throw new TypeError(`無効な名前です。次のパターンのみ有効です。:${name}:${this.#KEY_PATTERN}`)}}
    static #parse(script, ...anyValues) {// [{i:0, k:'Key', v:'Val', t:DataType}, ...]
        console.log(anyValues)
        if (!Type.isStr(script)){throw new TypeError(`Tuple.of/mut/imm()の第一引数は文字列であるべきです。:${script}:${typeof script}`)}
        if (script.includes('\n')) {return this.#parseMultiLine(script, ...anyValues)}
        else {return this.#parseOneLine(script, ...anyValues)}
    }
    static #parseOneLine(script, ...anyValues) {
        console.log(anyValues)
        const items = [];
        const textValues = Splitter.split(script);
        const ktvs = textValues.map(v=>Ktv.parse(v));
        for (let o of ktvs) {
            if (!o.key){throw new TypeError(`キーが未設定です。:${o.key}:${script}`)}
//            if (!o.type){throw new TypeError(`値が未設定です。TupleはTuple.of,Type.mutメソッドの第一引数(文字列型)にてその要素を定義します。一つ以上の要素を持ち、それらはスペース、カンマ、セミコロン、改行のいずれかによって区切られます。要素は「key:type=value」で定義します。typeは任意であり最低でも「key=value」形式で要素を定義せねばなりません。:${script}`)}
        }
           
           
        for (let i=0; i<ktvs.length; i++) {
            const type = undefined===ktvs[i].type ? LiteralType.get(ktvs[i].def) : TypeParser.getType(ktvs[i].type, ktvs[i].def)
            const value = (ktvs.length===anyValues.length)
                ? anyValues[i]
                : type ? type.deserialize(ktvs[i].def) : ktvs[i].def ?? ''
//            const value = undefined===ktvs[i].type
//                //? (ktvs.length===anyValues.length ? anyValues[i] : ktvs[i].def ?? null)
//                ? (ktvs.length===anyValues.length ? anyValues[i] : ktvs[i].def ?? '')
//                : type.deserialize(ktvs[i].def)
            console.log(type, value, ktvs.length, anyValues.length)
            items.push({
                i:i, 
                k:ktvs[i].key,
                t:type,
                //v:type ? type.deserialize(ktvs[i].def) : ktvs[i].def ?? null,
                v:value,
            })
        }
        return items;
    }
    static #parseMultiLine(script, ...anyValues) {
        console.log(anyValues)
        const lines = script.replace(/(\r\n|\r)/gm,'\n').split('\n')
        console.log(lines)
        const tsv = lines.map(line=>line.split('\t'))
        console.log(tsv)
        const [typeTxts, typeIdx] = this.#getMlTypeTxts(tsv);
        const [defTxts, defIdx] = this.#getMlDefTxts(tsv);
        const [valueTxts, valueIdx] = Math.max(0,typeIdx,defIdx)+1 < tsv.length
            ? [tsv[tsv.length-1], Math.max(0,typeIdx,defIdx)+1]
            : [Array.of(...tsv[0]).map(v=>''), -1]
//        console.log(typeIdx, defIdx)
        console.log('typeTxts, idx:', typeTxts, typeIdx)
        console.log('defTxts, idx:', defTxts, defIdx)
        console.log('valueTxts, idx:', valueTxts, valueIdx)
        const types = this.#getTypes(typeTxts, typeIdx, defTxts, defIdx, valueTxts, valueIdx);
        console.log(types, valueTxts)
//        const values = valueTxts.map((v,i)=>types[i].deserialize(v))
        //const values = types.length===anyValues.length && types.every(t=>Type.isIns(t, AnyDataType))
        const values = types.length===anyValues.length
            ? anyValues
            : valueTxts.map((v,i)=>types[i].deserialize(v))
        console.log(values)
        const keys = tsv[0]
        console.log(types)
        if (keys.length !== types.length || keys.length !== defTxts.length || keys.length !== values.length) {
            throw new TypeError(`Tuple複数行表記にて列数が不正です。名、型、初期値、値の各行はすべて同じ列数であるべきです。`)
        }
        return keys.reduce((a,k,i)=>{a.push({i:i,k:k,t:types[i],v:values[i]});return a}, [])
    }
    static #getTypes(typeTxts, typeIdx, defTxts, defIdx, valueTxts, valueIdx) {
             if (-1!==typeIdx) {return typeTxts.map((t,i)=>TypeParser.getType(t,defTxts[i]) ?? this.#getLiteralType(valueTxts[i],defTxts[i]))}
        else if (-1!==valueIdx) {return valueTxts.map((v,i)=>this.#getLiteralType(valueTxts[i],valueTxts[i]))}
        else if (-1!==defIdx) {return defTxts.map((d,i)=>this.#getLiteralType(defTxts[i],defTxts[i]))}
        else {return tsv[0].map(v=>new AnyDataType())}
    }
    static #getMlTypeTxts(tsv) {
        if (tsv[1][0].startsWith(':')) {tsv[1][0] = tsv[1][0].slice(1); return [tsv[1], 1];}
        else {return [Array.of(...tsv[0]).map(v=>null), -1]}
    }
    static #getMlDefTxts(tsv) {
             if (tsv[1][0].startsWith('=')) {tsv[1][0] = tsv[1][0].slice(1); return [tsv[1], 1];}
        else if (2 < tsv.length && tsv[2][0].startsWith('=')) {tsv[2][0] = tsv[2][0].slice(1); return [tsv[2], 2];}
        else {return [Array.of(...tsv[0]).map(v=>null), -1]}
    }
    static #getMlTypes(tsv) {
        return typeTxts.map((t,i)=>TypeParser.getType(t,defTxts[i]) ?? this.#getLiteralType(rowTxts[i],defTxts[i]))
    }

    static #getLiteralType(value, defTxts) {console.log(`#getLiteralType: value:${value}, defTxts:${defTxts}`);return (''===value && ''===defTxts) ? new AnyDataType(defTxts[i]) : LiteralType.get(value,defTxts)}
    static #defineMember(ins, k, v, isMutable=false) {this.#throwName(k);this.#define(ins, k, v, true, isMutable);}
    static #defineInner(ins, k, v, isMutable=false) {this.#define(ins, k, v, false, isMutable)}
    static #define(ins, k, v, enumerable=false, writable=false) {
        Object.defineProperty(ins, `${k}`, {// Protected
            value: v,
            enumerable: enumerable, // 鍵列挙可（Object.keys()）
            writable: writable,     // 値変更禁止（obj[key] = v）
            configurable: false,    // キー削除禁止（delete obj[key]）
        });
    }
    _has(iOrK) {
             if (Type.isInt(iOrK)) {return !!this._obj.find(o=>o.i===iOrK)}
        else if (Type.isStr(iOrK)) {return !!this._obj.find(o=>o.k===iOrK)}
        else {throw new TypeError(`引数は整数か文字列であるべきです。:${iOrK}:${typeof iOrK}`)}
    }
    _get(iOrK) {
             if (Type.isInt(iOrK)) {return this._obj.find(o=>o.i===iOrK)}
        else if (Type.isStr(iOrK)) {return this._obj.find(o=>o.k===iOrK)}
        else {throw new TypeError(`引数は整数か文字列であるべきです。:${iOrK}:${typeof iOrK}`)}
    }
    get _size() {return this._obj.length}
    get _indexies() {return this._obj.map(o=>o.i)}
    get _keys() {return this._obj.map(o=>o.k)}
    get _types() {return this._obj.map(o=>o.t)}
    get _defaults() {return this._obj.map(o=>o.d)}
    get _values() {return this._obj.map(o=>o.v)}
    get _entries() {return this._obj.map(o=>o)}
    get _arrays() {return this._obj.map(o=>[o.i, o.k, o.t, o.v])}
    *[Symbol.iterator]() {for (let o of this._obj) {yield o}}
}
class Splitter {
    static split(text) {
        const D = this.suggestDelimiter(text);
        return D ? text.split(D) : [text];
    }
    static suggestDelimiter(text) {
        if (text.includes(' ') && !text.includes(',') && !text.includes(';') && !text.includes('\t')) {return ' '}
        else if (text.includes(',') && !text.includes(';') && !text.includes('\t')) {return ','}
        else if (text.includes(';') && !text.includes('\t')) {return ';'}
        else if (text.includes('\t')) {return '\t'}
        else {return ''}
    }
}
class LiteralType {//リテラル値から型を推論する
    static get(text, defTxt) {
        console.log(`LiteralType.get:`, text, defTxt, /^(-)?\d+n$/.test(text), /^(-)?[0-9]+n$/.test(text), /^(-)?[0-9]+n$/.test('0n'))
             if (/^[_v]+$/.test(text)){return new BooleanDataType(defTxt)}
        else if (/^(-)?(\d+)?\.\d+$/.test(text)){return new FloatDataType(defTxt)}
        else if (/^(-)?\d+$/.test(text)){return new IntDataType(10,defTxt)}
        else if (/^0b[0-1]+$/.test(text)){return new IntDataType(2,defTxt)}
        else if (/^0o[0-7]+$/.test(text)){return new IntDataType(8,defTxt)}
        else if (/^0x[0-9a-fA-F]+$/.test(text)){return new IntDataType(16,defTxt)}
        else if (/^0v[0-9a-vA-V]+$/.test(text)){return new IntDataType(32,defTxt)}
        else if (/^0z[0-9a-zA-Z]+$/.test(text)){return new IntDataType(36,defTxt)}
        else if (/^(-)?\d+n$/.test(text)){return new BigIntDataType(10,defTxt)}
        else if (/^0B[0-1]+$/.test(text)){return new BigIntDataType(2,defTxt)}
        else if (/^0O[0-7]+$/.test(text)){return new BigIntDataType(8,defTxt)}
        else if (/^0X[0-9a-fA-F]+$/.test(text)){return new BigIntDataType(16,defTxt)}
        //else if (''===text && ''===defTxt){return AnyDataType()}
        else {return new StringDataType(defTxt)}
    }
}
class Ktv {// KeyTypeValue
    static parse(text) {// key:type=valueを三値に分離する（keyは必須。type,valueは任意）
        const typeIdx = text.indexOf(':')
        const defIdx = text.indexOf('=')
//        console.log(typeIdx , defIdx)
        const keyLen = ((-1===typeIdx && -1===defIdx)
            ? text.length
            : ((-1!==typeIdx && -1!==defIdx)
                ? Math.min(typeIdx,defIdx)
                : Math.max(typeIdx,defIdx)))
//        console.log(typeIdx, defIdx, keyLen)
        const key = text.slice(0, keyLen)
        const type = -1===typeIdx ? undefined : text.slice(keyLen+1, -1===defIdx ? text.length : defIdx)
        const def = -1===defIdx ? undefined : text.slice(defIdx+1)
        return {key:key, type:type, def:def}
    }
}
class TypeParser {
    static getType(typeTxt, defTxt) {// 型名や初期値から型インスタンスを取得する
        if (!DataType.isStr(typeTxt)) {return null}
        // 型名のみ
        for (let type of [BooleanDataType, FloatDataType, StringDataType]){
            if (type.alias.some(t=>t===typeTxt)){return new type(defTxt)}
        }
        for (let type of [IntDataType, BigIntDataType]){
            if (type.alias.some(t=>t===typeTxt)){return new type(10,defTxt)}
        }
        // 型名＝初期値
        for (let type of [IntDataType, BigIntDataType]){
            if (type.alias.some(t=>typeTxt.startsWith(t+'='))){
                const defaultValue = typeTxt.slice(typeTxt.indexOf('=')+1)
                return new type(10, defaultValue)
            }
        }
        for (let type of [BooleanDataType, FloatDataType, StringDataType]){
            if (type.alias.some(t=>typeTxt.startsWith(t+'='))){
                const E = typeTxt.indexOf('=')
                const defaultValue = typeTxt.slice(-1===E ? typeTxt.length : E+1)
                return new type(defaultValue)
            }
        }
        // 型名＋基数
        for (let type of [IntDataType, BigIntDataType]){
            if (type.alias.some(t=>typeTxt.startsWith(t) && type.BaseAlias.some(b=>typeTxt.endsWith(b)))){
                const base = type.BaseAlias.filter(b=>typeTxt.endsWith(b))[0]
                return new type(base)
            }
        }
        // 型名＋基数＝初期値
        for (let type of [IntDataType, BigIntDataType]){
            if (type.alias.some(t=>typeTxt.startsWith(t) && type.BaseAlias.some(b=>typeTxt.includes(b+'=')))){
                const E = typeTxt.indexOf('=')
                const keyT = typeTxt.slice(0, E)
                const valT = typeTxt.slice(E+1)
                const base = type.BaseAlias.filter(b=>keyT.endsWith(b))[0]
                return new type(base, valT)
            }
        }
    }
    static read(typeTxt, defValTxt, textValues) {
        if (['s','str','string'].some(t=>t===typeTxt)) {return  new StringDataType(defValTxt)}
        else if ('i|int|integer'.split('|').some(t=>typeTxt?.startsWith(t))){
            const base = IntDataType.BaseAlias.some(b=>typeTxt.endsWith(b))
                ? IntDataType.BaseAlias.filter(b=>typeTxt.endsWith(b)).map(b=>b)[0]
                : 10
            return new IntDataType('H'===base ? 16 : parseInt(base), defValTxt)
        }
        else if (['f','flt','float'].some(t=>t===typeTxt)) {return new FloatDataType(defValTxt)}
        else if (['b','bln','bool','boolean'].some(t=>t===typeTxt)) {return new BooleanDataType(defValTxt)}
        else if (['I','bi','bgi','bigint','biginteger'].some(t=>t===typeTxt)) {
            const base = BigIntDataType.BaseAlias.some(b=>typeTxt.includes(b))
                ? typeTxt.split(BigIntDataType.BaseAlias.filter(b=>typeTxt.includes(b))[0])[1]
                : 10
            return new BigIntDataType(base,defValTxt)
        }
        else {return this.#suggestFromValueText(textValues, defValTxt)}
    }
    static #suggestFromValueText(textValues, defValTxt) {
        // ^$ で空文字判定する。空文字を許可するには ^(.+)?$ とする。各型の書式と空値(略記)を許容する
             if (textValues.every(t=>/^$/.test(t))){return new StringDataType(defValTxt)} // すべて空値なら文字列と判断する
        else if (textValues.every(t=>/^((\-)?[0-9]+)?$/.test(t))){return new IntDataType(10,defValTxt)}
        else if (textValues.every(t=>/^(0b[01]+)?$/.test(t))){return new IntDataType(2,defValTxt)}
        else if (textValues.every(t=>/^(0o[0-7]+)?$/.test(t))){return new IntDataType(8,defValTxt)}
        else if (textValues.every(t=>/^(0x[0-9a-fA-F]+)?$/.test(t))){return new IntDataType(16,defValTxt)}
        else if (textValues.every(t=>/^(0z[0-9a-zA-Z]+)?$/.test(t))){return new IntDataType(36,defValTxt)}
        else if (textValues.every(t=>/^((\-)?(\d)*\.[\d]+)?$/.test(t))){return new FloatDataType(defValTxt)}
        else if (textValues.every(t=>/^([_v])?$/.test(t))){return new BooleanDataType()}
        else if (textValues.every(t=>/^(0B[0-9]+)?$/.test(t))){return new BigIntDataType(2,defValTxt)}
        else if (textValues.every(t=>/^(0O[0-7]+)?$/.test(t))){return new BigIntDataType(8,defValTxt)}
        else if (textValues.every(t=>/^((\-)?([0-9]+n))?$/.test(t))){return new BigIntDataType(10,defValTxt)}
        else if (textValues.every(t=>/^(0X[0-9a-zA-Z]+)?$/.test(t))){return new BigIntDataType(16,defValTxt)}
        else {return new StringDataType()}
    }
    static serialize(type, value) {
        return null
    }
    static deserialize(type, text) {
        if (type instanceof DataType) {return type.deserialize(text)}
        else {throw new TypeError(`第一引数typeはDateType型であるべきです。`)}
    }
}
class DataType {
    constructor(id='string', defaultValue='') {
        this._id = id;
        this._defaultValue = defaultValue;
    }
    get id() {return this._id}
    get defaultValue() {return this._defaultValue}
    deserialize(text) {
        // NaNは「false===(NaN===Nan)」「'number'===typeof NaN」になるため注意。反意図性のクソ仕様であり禁止すべき。
        // undefinedもJS内部エラー値のため禁止すべき
        // nullもNULL安全をめざして禁止すべき
        // ''はデフォルト値に変換する
        if (this._isNUN(text)){text=''}
        return ''===text ? this.defaultValue : text
    }
    _isNUN(v) {return null===v || undefined===v || Number.isNaN(v)}
    _isStr(v) {return typeof v === 'string' || v instanceof String;}
    _isInt(v) {return Number.isInteger(v)}
    _isFlt(v) {return !this._isNUN(v) && !this._isInt(v) && 'number'===typeof v}
    _isBln(v) {return !this._isNUN(v) && 'boolean'===typeof v}
    static isNUN(v) {return null===v || undefined===v || Number.isNaN(v)}
    static isStr(v) {return typeof v === 'string' || v instanceof String;}
    static isInt(v) {return Number.isInteger(v)}
    static isFlt(v) {return !this._isNUN(v) && !this._isInt(v) && 'number'===typeof v}
    static isBln(v) {return !this._isNUN(v) && 'boolean'===typeof v}
}
class AnyDataType extends DataType {
    constructor(defVal='') { super('any', defVal ?? '') }
    static get alias() {return 'any'.split('|')}
}
class StringDataType extends DataType {
    constructor(defVal='') { super('string', defVal ?? '') }
//    get alias() {return 's|str|string'.split('|')}
    static get alias() {return 's|str|string'.split('|')}
    //deserialize(text) {return super.deserialize(text).replace(/\\n/g,'\n').replace(/\\t/g,'\t')}
    deserialize(text) {return ''===text ? this.defaultValue : super.deserialize(text).replace(/\\n/g,'\n').replace(/\\t/g,'\t')}
}
class FloatDataType extends DataType {
    constructor(defVal=0) {
        super('float', defVal ?? 0);
        super._defaultValue = this.deserialize(defVal);
    }
    static get alias() {return 'f|flt|float'.split('|')}
    deserialize(text) {
        const v = parseFloat(super.deserialize(text))
        if (Number.isNaN(v)) {throw new TypeError(`Float型への変換に失敗しました。:${text}:${v}`)}
        return v
    }
    // NaNは禁止
    // -1e5 のような指数表記を認めるべきか
    // Infinity のような無限数を認めるべきか
}
class BooleanDataType extends DataType {
    constructor(defVal=false) {
        super('boolean', defVal ?? false);
    }
    static get alias() {return 'b|bln|bool|boolean'.split('|')}
    get valueTexts() {return ['_','v']}
    deserialize(text, type) {
        const v = super.deserialize(text)
        if (super._isBln(v)) {return v}
        if (''===v || '_'===v) {return false}
        else if ('v'===v) {return true}
        else {throw new TypeError(`Boolean型への変換に失敗しました。Boolean型の値は_,v,空文字のいずれかで表現されます。:${text}:${v}`)}
    }
}
class IntDataType extends DataType {
    static BaseAlias = 'H|2|8|10|12|16|24|32|36'.split('|');
    constructor(base=10, defVal=0) {
        super('integer', defVal ?? 0);
        this._base = this.#base(base);
        this._basePrefix = {b:2, o:8, x:16, v:32, z:36}
    }
    #base(base) {
        if ('H'===base){base=16}
        const baseInt = parseInt(base)
        if (super._isStr(base) && !super._isNUN(baseInt) && 2 <= baseInt && baseInt <= 36){base=baseInt}
        if (super._isNUN(base)  || !super._isInt(base) || base < 2 || 36 < base){throw new TypeError(`Intのbaseは2〜36までの整数値であるべきです。:${base}:${typeof base}`)}
        return base
    }
    get base() {return this._base}
    static get alias() {return 'i|int|integer'.split('|')}
    get baseAlias() {return 'H|2|8|12|16|24|32|36'.split('|')}
    get baseValues() {return this.basePrefixs.map(k=>this._basePrefix[k])}
    get basePrefixs() {return Object.getOwnPropertyNames(this._basePrefix)}
    get basePrefix() {
        const bi = this.baseValues.indexOf(this.base)
        return bi===-1 || 10===this.base ? '' : this.basePrefixs[bi];
    }
    deserialize(text) {
        const d = super.deserialize(text)
        if ('number'===typeof d){return d}
        const v = parseInt(this.#delPrefix(d), this.base)
        if (Number.isNaN(v)){throw new TypeError(`Int型への変換に失敗しました。:${text}:${v}:${this.base}:${this.basePrefix}`)}
        if (Infinity!==v && Number.MAX_SAFE_INTEGER < v){throw new TypeError(`Infinityでないにも関わらずNumber.MAX_SAFE_INTEGERよりも大きい値です。正確な値を保てないためエラーとします。:${v}:${text}`)}
        if (-Infinity!==v && v < Number.MIN_SAFE_INTEGER){throw new TypeError(`-Infinityでないにも関わらずNumber.MIN_SAFE_INTEGERよりも小さい値です。正確な値を保てないためエラーとします。:${v}:${text}`)}
        return v
    }
    #delPrefix(d){return (this._isStr(d) && ''!==this.basePrefix && d.startsWith(`0${this.basePrefix}`)) ? d.slice(2) : d}
}
class BigIntDataType extends DataType {
    static BaseAlias = 'H|2|8|10|16'.split('|');
    constructor(base=10, defVal=0n) {
        super('bigint', defVal ?? 0n);
        this._base = this.#base(base);
        this._basePrefix = {B:2, O:8, X:16} // parseInt('', 36) のように36進数変換できない
        this._defaultValue = this.deserialize(defVal)
    }
    #base(base) {
        if ('H'===base){base=16}
        const baseInt = parseInt(base)
        if (super._isStr(base) && !super._isNUN(baseInt) && 2 <= baseInt && baseInt <= 16){base=baseInt}
        if (super._isNUN(base)  || !super._isInt(base) || base < 2 || 16 < base){throw new TypeError(`BigIntのbaseは2〜16までの整数値であるべきです。:${base}:${typeof base}`)}
        return base
    }
    get base() {return this._base}
    static get alias() {return 'I|bi|bgi|bigint|biginteger'.split('|')}
    get baseAlias() {return 'H|2|8|10|16|'.split('|')}
    get baseValues() {return this.basePrefixs.map(k=>this._basePrefix[k])}
    get basePrefixs() {return Object.getOwnPropertyNames(this._basePrefix)}
    get basePrefix() {
        const bi = this.baseValues.indexOf(this.base)
        return bi===-1 ? '' : this.basePrefixs[bi];
    }
    deserialize(text) {
        const d = super.deserialize(text)
        if ('bigint'===typeof d){return d}
        if (this._isStr(text) && /^[0-9]+n$/.test(text)){text=text.slice(0,-1)}
        if (10!==this.base && !/^0[box]/i.test(text)) {text = '0' + this.basePrefix + text}
        try {return BigInt(text)}
        catch(err){throw new TypeError(`BigInt型への変換に失敗しました。:${text}`)}
        
    } // BigInt('x') SyntaxError: Cannot convert x to a BigInt
}
class RegExpDataType extends DataType {
    constructor(defVal=null) {
        super('regexp', defVal ?? null);
        const l = text.lastIndexOf('/');
        this._pattern = text.slice(0, l);
        this._option = text.slice(l);
    }
    get pattern() {return this._pattern}
    get option() {return this._option}
    static get alias() {return 'r|reg|regexp'.split('|')}
    deserialize(text, type) {
        const d = super.deserialize(text)
        if (d instanceof RegExp){return d}
        return new RegExp(type.pattern, type.option)
    }
}
class RangeDataType extends DataType {
    constructor(defVal=0, min=0, max=100) {
        super('range', defVal ?? 0);
        this._min = min; // range.age(0,0,100)
        this._max = max; // cols(age:range.age=5)
    }
    static get alias() {return 'rng|range'.split('|')} // rはRegExpのために取っておく
}
class EnumDataType extends DataType {// 列挙値。文字列で指定できる任意型の値リスト。
    constructor(defVal=0, name='') {
        super('enum', defVal ?? 0);
    }
    static get alias() {return 'enm|enum|enumrated'.split('|')}
}
class SectionDataType extends DataType {// 区間。列挙型の値が整数値であり、歯抜けを許さない版
    constructor(defVal=0, name='') {
        super('section', defVal ?? 0);
    }
    static get alias() {return 'sct|section'.split('|')}
}
class NamespaceDataType extends DataType {// 名前空間
}


window.Tuple = Tuple;
})();
