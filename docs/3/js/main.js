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

    // 複数行
    a.t(()=>{
        const t = Tuple.of(`id	name	age	isMale	weight
:I	s	i	b	f
=0		0	_	0
0	Yamada	12	v	65.1`);
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && 0n===t.id && 0n===t[0]
            && 'Yamada'===t.name && 'Yamada'===t[1]
            && 12===t.age && 12===t[2]
            && true===t.isMale && true===t[3]
            && 65.1===t.weight && 65.1===t[4]
    })
    a.t(()=>{
        const t = Tuple.of(`id	name	age	isMale	weight
:I	s	i	b	f
=0	Yamada	12	v	65.1`);
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && 0n===t.id && 0n===t[0]
            && 'Yamada'===t.name && 'Yamada'===t[1]
            && 12===t.age && 12===t[2]
            && true===t.isMale && true===t[3]
            && 65.1===t.weight && 65.1===t[4]
    })
    a.t(()=>{
        const t = Tuple.of(`id	name	age	isMale	weight
:I	s	i	b	f
0	Yamada	12	v	65.1`);
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && 0n===t.id && 0n===t[0]
            && 'Yamada'===t.name && 'Yamada'===t[1]
            && 12===t.age && 12===t[2]
            && true===t.isMale && true===t[3]
            && 65.1===t.weight && 65.1===t[4]
    })
    a.t(()=>{
        const t = Tuple.of(`id	name	age	isMale	weight
=0n		0	_	0.0
0n	Yamada	12	v	65.1`);
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && 0n===t.id && 0n===t[0]
            && 'Yamada'===t.name && 'Yamada'===t[1]
            && 12===t.age && 12===t[2]
            && true===t.isMale && true===t[3]
            && 65.1===t.weight && 65.1===t[4]
    })
    a.t(()=>{
        const t = Tuple.of(`id	name	age	isMale	weight
=0n	Yamada	12	v	65.1`);
        console.log(t)
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && 0n===t.id && 0n===t[0]
            && 'Yamada'===t.name && 'Yamada'===t[1]
            && 12===t.age && 12===t[2]
            && true===t.isMale && true===t[3]
            && 65.1===t.weight && 65.1===t[4]
    })
    a.t(()=>{
        const t = Tuple.of(`id	name	age	isMale	weight
:I	s	i	b	f`);
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && 0n===t.id && 0n===t[0]
            && ''===t.name && ''===t[1]
            && 0===t.age && 0===t[2]
            && false===t.isMale && false===t[3]
            && 0===t.weight && 0===t[4];
    })
    a.t(()=>{
        const t = Tuple.of(`id	name	age	isMale	weight
0n	Yamada	12	v	65.1`);
        console.log(t)
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && 0n===t.id && 0n===t[0]
            && 'Yamada'===t.name && 'Yamada'===t[1]
            && 12===t.age && 12===t[2]
            && true===t.isMale && true===t[3]
            && 65.1===t.weight && 65.1===t[4]
    })
    a.t(()=>{
        const t = Tuple.of(`id	name	age	isMale	weight`);
        console.log(t)
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
            && ''===t.id && ''===t[0]
            && ''===t.name && ''===t[1]
            && ''===t.age && ''===t[2]
            && ''===t.isMale && ''===t[3]
            && ''===t.weight && ''===t[4];
    })
    a.t(()=>{
        const t = Tuple.of(`id name age isMale weight`);
        console.log(t)
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
//            && null===t.id && null===t[0]
//            && null===t.name && null===t[1]
//            && null===t.age && null===t[2]
//            && null===t.isMale && null===t[3]
//            && null===t.weight && null===t[4];
            && ''===t.id && ''===t[0]
            && ''===t.name && ''===t[1]
            && ''===t.age && ''===t[2]
            && ''===t.isMale && ''===t[3]
            && ''===t.weight && ''===t[4];
    })

    // Tuple.mut()
    a.t(()=>{
        const t = Tuple.mut(`id name age isMale weight`);
        console.log(t)
        return t instanceof Tuple
            && 5===t._size
            && 'id name age isMale weight'.split(' ').every(v=>v in t)
            && 'id name age isMale weight'.split(' ').every(v=>t._has(v))
//            && null===t.id && null===t[0]
//            && null===t.name && null===t[1]
//            && null===t.age && null===t[2]
//            && null===t.isMale && null===t[3]
//            && null===t.weight && null===t[4];
            && ''===t.id && ''===t[0]
            && ''===t.name && ''===t[1]
            && ''===t.age && ''===t[2]
            && ''===t.isMale && ''===t[3]
            && ''===t.weight && ''===t[4];
    })
    a.t(()=>{
        const t = Tuple.mut(`name`);
        t.name = 'NAME' // TypeError: 代入禁止です。 にならない。
        console.log(t, t.name, t[0])
        return t instanceof Tuple && 1===t._size && 'NAME'===t.name && 'NAME'===t[0]
    })

    // anyValue（テキスト表現非対応な型のデータをセットする）
    a.t(()=>{
        const t = Tuple.of(`url`, new URL('https://www.google.co.jp/'));
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.google.co.jp/'===t.url.href
    })
    a.t(()=>{
        const t = Tuple.of(`url:any`, new URL('https://www.google.co.jp/'));
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.google.co.jp/'===t.url.href
    })
    a.t(()=>{
        const t = Tuple.of(`url:any=X`, new URL('https://www.google.co.jp/'));
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.google.co.jp/'===t.url.href
    })
    a.t(()=>{
        const t = Tuple.of(`url
:any
=X
Y`, new URL('https://www.google.co.jp/'));
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.google.co.jp/'===t.url.href
    })
    a.t(()=>{
        const t = Tuple.mut(`url`, new URL('https://www.google.co.jp/'));
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.google.co.jp/'===t.url.href
    })
    a.t(()=>{
        const t = Tuple.mut(`url:any`, new URL('https://www.google.co.jp/'));
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.google.co.jp/'===t.url.href
    })
    a.t(()=>{
        const t = Tuple.mut(`url:any=X`, new URL('https://www.google.co.jp/'));
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.google.co.jp/'===t.url.href
    })
    a.t(()=>{
        const t = Tuple.mut(`url
:any
=X
Y`, new URL('https://www.google.co.jp/'));
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.google.co.jp/'===t.url.href
    })
    // Tuple.mut()で値の代入確認する
    a.t(()=>{// any型は何でも代入できる
        const t = Tuple.mut(`url`, new URL('https://www.google.co.jp/'));
        t.url = new URL('https://www.yahoo.co.jp/')
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.yahoo.co.jp/'===t.url.href
    })
    a.t(()=>{
        const t = Tuple.mut(`url:any`, new URL('https://www.google.co.jp/'));
        t.url = new URL('https://www.yahoo.co.jp/')
        return t instanceof Tuple && 1===t._size && t._has('url') && t.url instanceof URL && 'https://www.yahoo.co.jp/'===t.url.href
    })
    a.e(TypeError, `値の型が不正です。:1:number:string`, ()=>{
        const t = Tuple.mut(`name:s=A`);
        t.name = 1;
    })
    a.e(TypeError, `値の型が不正です。:x:string:integer`, ()=>{
        const t = Tuple.mut(`age:i=0`);
        t.age= 'x';
    })
    // Tuple.of()で初期値代入における型エラー確認（String型はエラーが起きない）
    a.e(TypeError, `Boolean型への変換に失敗しました。Boolean型の値は_,v,空文字のいずれかで表現されます。:true:true`, ()=>Tuple.of('name:b=true'));
    a.e(TypeError, `Float型への変換に失敗しました。:x:NaN`, ()=>Tuple.of('name:f=x'));
    a.e(TypeError, `Int型への変換に失敗しました。:x:NaN:10:`, ()=>Tuple.of('name:i=x'));
    a.e(TypeError, `Int型への変換に失敗しました。:x:NaN:2:b`, ()=>Tuple.of('name:i2=x'));
    a.e(TypeError, `Int型への変換に失敗しました。:x:NaN:8:o`, ()=>Tuple.of('name:i8=x'));
    a.e(TypeError, `Int型への変換に失敗しました。:x:NaN:10:`, ()=>Tuple.of('name:i10=x'));
    a.e(TypeError, `Int型への変換に失敗しました。:x:NaN:16:x`, ()=>Tuple.of('name:iH=x'));
    a.e(TypeError, `Int型への変換に失敗しました。:x:NaN:16:x`, ()=>Tuple.of('name:i16=x'));
    a.e(TypeError, `Int型への変換に失敗しました。:x:NaN:32:v`, ()=>Tuple.of('name:i32=x'));
    a.e(TypeError, `Int型への変換に失敗しました。:_:NaN:36:z`, ()=>Tuple.of('name:i36=_'));
    a.e(TypeError, `BigInt型への変換に失敗しました。:x`, ()=>Tuple.of('name:I=x'));
    a.e(TypeError, `BigInt型への変換に失敗しました。:0Bx`, ()=>Tuple.of('name:I2=x'));
    a.e(TypeError, `BigInt型への変換に失敗しました。:0Ox`, ()=>Tuple.of('name:I8=x'));
    a.e(TypeError, `BigInt型への変換に失敗しました。:x`, ()=>Tuple.of('name:I10=x'));
    a.e(TypeError, `BigInt型への変換に失敗しました。:0Xx`, ()=>Tuple.of('name:IH=x'));
    a.e(TypeError, `BigInt型への変換に失敗しました。:0Xx`, ()=>Tuple.of('name:I16=x'));
    a.fin();
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

