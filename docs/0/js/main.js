window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    const author = 'ytyaru'
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/Html.VanJS.Tuple.20250210091537/`}, 'Tuple')),
        van.tags.p('名前付き配列。'),
//        p('Named array.'),
    )
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make())
    const a = new Assertion();
    a.t(true);
    //a.t(()=>Tuple.of() instanceof Tuple);
    a.e(TypeError, `Tuple.of/mut/imm()の第一引数は文字列であるべきです。:undefined:undefined`, ()=>Tuple.of())
    a.e(TypeError, `Tuple.of/mut/imm()の第一引数は文字列であるべきです。:undefined:undefined`, ()=>Tuple.of(undefined))
    a.e(TypeError, `Tuple.of/mut/imm()の第一引数は文字列であるべきです。:null:object`, ()=>Tuple.of(null))
    a.e(TypeError, `Tuple.of/mut/imm()の第一引数は文字列であるべきです。:NaN:number`, ()=>Tuple.of(NaN))
    //a.t(()=>Tuple.of('') instanceof Tuple);
    a.e(TypeError, `キーが未設定です。::`, ()=>Tuple.of(''))// 空文字列
    a.t(()=>{
        const t = Tuple.of('x'); // 型や値がない時、型はStringで値は''である
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && ''===t.x && ''===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && ''===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x:i'); // 型があり値がない時、値は型の初期値である
        console.log(t)
        console.log(t.x)
        console.log(t._get('x'))
        console.log(t instanceof Tuple , 'x' in t , t._has('x') , 0===t.x, t.x)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 0===t.x && 0===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 0===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x:I'); // 型があり値がない時、値は型の初期値である
        console.log(t)
        console.log(t.x)
        console.log(t._get('x'))
        console.log(t instanceof Tuple , 'x' in t , t._has('x') , 0n===t.x, t.x)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 0n===t.x && 0n===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 0n===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x:f'); // 型があり値がない時、値は型の初期値である
        console.log(t)
        console.log(t.x)
        console.log(t._get('x'))
        console.log(t instanceof Tuple , 'x' in t , t._has('x') , 0===t.x, t.x)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 0===t.x && 0===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 0===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x:b'); // 型があり値がない時、値は型の初期値である
        console.log(t)
        console.log(t.x)
        console.log(t._get('x'))
        console.log(t instanceof Tuple , 'x' in t , t._has('x') , 0===t.x, t.x)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && false===t.x && false===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && false===o.v
    });
    a.e(TypeError, `キーが未設定です。:::i`, ()=>Tuple.of(':i'))// 名がない
    a.e(TypeError, `キーが未設定です。:::`, ()=>Tuple.of(':'))
    a.e(TypeError, `キーが未設定です。::=`, ()=>Tuple.of('='))
    a.e(TypeError, `キーが未設定です。::=def`, ()=>Tuple.of('=def'))
    a.t(()=>{
        const t = Tuple.of('x=9'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 9===t.x && 9===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 9===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=9n'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 9n===t.x && 9n===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 9n===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=.1'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 0.1===t.x && 0.1===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 0.1===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=v'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && true===t.x && true===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && true===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=_'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && false===t.x && false===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && false===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0b11'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 3===t.x && 3===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 3===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0o77'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 63===t.x && 63===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 63===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0xff'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 255===t.x && 255===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 255===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0xFF'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 255===t.x && 255===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 255===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0vvv'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 1023===t.x && 1023===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 1023===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0vVV'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 1023===t.x && 1023===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 1023===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0zzz'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 1295===t.x && 1295===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 1295===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0zZZ'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 1295===t.x && 1295===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 1295===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0B11'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 3n===t.x && 3n===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 3n===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0O77'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 63n===t.x && 63n===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 63n===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0Xff'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 255n===t.x && 255n===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 255n===o.v
    });
    a.t(()=>{
        const t = Tuple.of('x=0XFF'); // 型がなく値がある時、型は値から推論する
        console.log(t)
        const o = t._get('x')
        return t instanceof Tuple && 1===t._size && 'x' in t && t._has('x') && 255n===t.x && 255n===t[0]
//            && 0===o.i && 'x'===o.k && o.t instanceof StringDataType && ''===o.v
            && 0===o.i && 'x'===o.k && 255n===o.v
    });
    a.t(()=>{
        const t = Tuple.of('name=Yamada');
        console.log(t)
        console.log(t._get('name'))
        console.log(t instanceof Tuple , 'name' in t , 'Yamada'===t.name , 'Yamada'===t[0])
        console.log(t instanceof Tuple , t._has('name') , t.name, t[0], 'Yamada'===t.name , 'Yamada'===t[0])
        return t instanceof Tuple && 1===t._size && 'name' in t && t._has('name') && 'Yamada'===t.name && 'Yamada'===t[0]
    });
    a.t(()=>{
        const t = Tuple.of('id:I=0 name:s=Yamada age:i=12 isMale:b=v weight:f=65.1');
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && 0n===t.id && 0n===t[0]
            && 'Yamada'===t.name && 'Yamada'===t[1]
            && 12===t.age && 12===t[2]
            && true===t.isMale && true===t[3]
            && 65.1===t.weight && 65.1===t[4]
    });
    a.e(TypeError, `無効な名前です。次のパターンのみ有効です。:あ:/^[a-zA-Z][a-zA-Z0-9]*$/`, ()=>Tuple.of('あ'))
    a.e(TypeError, `存在しないキーです。:y`, ()=>{
        const t = Tuple.of('x');
        t.y
    });
    a.e(TypeError, `代入禁止です。`, ()=>{
        const t = Tuple.of('x');
        t.x = ''
    });
    a.e(TypeError, `削除禁止です。`, ()=>{
        const t = Tuple.of('x');
        delete t.x
    });
    a.e(TypeError, `プロトタイプへの代入禁止です。`, ()=>{
        const t = Tuple.of('x');
        Object.setPrototypeOf(t, {value:0})
    });
    a.t(()=>{
        const t = Tuple.of('x');
        console.log(t)
        console.log(Object.keys(t))
        const keys = [...Object.keys(t)]
        console.log(keys.length, keys, t)
        for(let key of Object.keys(t)){console.log(key)}
        return 1===keys.length && 'x'===keys[0]
    })
    a.t(()=>{
        const t = Tuple.of('id:I=0 name:s=Yamada age:i=12 isMale:b=v weight:f=65.1');
        console.log(t)
        console.log([...t])
        console.log(t._entries)
        // ReferenceError: Cannot access 't' before initialization
        //for (let [i,k,t,v] of t) {
        //for (let [i,k,t,v] of t._entries) {
        //for (let x of t._entries) {
        //for (let [i,k,t,v] of t._arrays) {
        //for (let [i,k,t,v] of ...t._arrays) {
        //for (let [i,k,t,v] of t._arrays) {
        //for (let x of t._arrays) {
        for (let o of t._entries) {
            console.log(o)
                 if (0===o.i) {a.t(0n===o.v && 'id'===o.k)}
            else if (1===o.i) {a.t('Yamada'===o.v && 'name'===o.k)}
            else if (2===o.i) {a.t(12===o.v && 'age'===o.k)}
            else if (3===o.i) {a.t(true===o.v && 'isMale'===o.k)}
            else if (4===o.i) {a.t(65.1===o.v && 'weight'===o.k)}
        }
        for (let o of t._entries) {
            const {i,k,t,v} = {...o}
            console.log(o,i,i,t,v)
                 if (0===i) {a.t(0n===v && 'id'===k)}
            else if (1===i) {a.t('Yamada'===o.v && 'name'===k)}
            else if (2===i) {a.t(12===v && 'age'===k)}
            else if (3===i) {a.t(true===v && 'isMale'===k)}
            else if (4===i) {a.t(65.1===v && 'weight'===k)}
        }
        for (let A of t._arrays) {
            const [i,k,t,v] = [...A]
            console.log(A,i,i,t,v)
                 if (0===i) {a.t(0n===v && 'id'===k)}
            else if (1===i) {a.t('Yamada'===v && 'name'===k)}
            else if (2===i) {a.t(12===v && 'age'===k)}
            else if (3===i) {a.t(true===v && 'isMale'===k)}
            else if (4===i) {a.t(65.1===v && 'weight'===k)}
        }
        /*
        for (let {i,k,t,v} of {...t._entries}) {
            console.log(i,i,t,v)
                 if (0===i) {a.t(0n===v && 'id'===k)}
            else if (1===i) {a.t('Yamada'===o.v && 'name'===k)}
            else if (2===i) {a.t(12===v && 'age'===k)}
            else if (3===i) {a.t(true===v && 'isMale'===k)}
            else if (4===i) {a.t(65.1===v && 'weight'===k)}
        }
        for (let [i,k,t,v] of [...t._array]) {
            console.log(i,i,t,v)
                 if (0===i) {a.t(0n===v && 'id'===k)}
            else if (1===i) {a.t('Yamada'===o.v && 'name'===k)}
            else if (2===i) {a.t(12===v && 'age'===k)}
            else if (3===i) {a.t(true===v && 'isMale'===k)}
            else if (4===i) {a.t(65.1===v && 'weight'===k)}
        }
        */
        /*
        for (let o of t._entries) {
            console.log(x)
                 if (0===i) {a.t(0n===v && 'id'===k)}
            else if (1===i) {a.t('Yamada'===v && 'name'===k)}
            else if (2===i) {a.t(12===v && 'age'===k)}
            else if (3===i) {a.t(true===v && 'isMale'===k)}
            else if (4===i) {a.t(65.1===v && 'weight'===k)}
        }
        */
        /*
        console.log(t)
        console.log(Object.keys(t))
        const keys = [...Object.keys(t)]
        console.log(keys.length, keys, t)
        for(let key of Object.keys(t)){console.log(key)}
        return 1===keys.length && 'x'===keys[0]
        */
        return true
    })
    a.fin();
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

