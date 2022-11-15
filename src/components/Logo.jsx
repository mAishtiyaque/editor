import './logo.css'

export default function Logo() {
    const dot_count=22;
    const initial_r=10;
    const arr=Array.apply(null,Array(initial_r));

    return (
        <div >
            {arr.map((e,i)=>
            <OneCircle key={i} count={dot_count} idx={i} />
            )}
         
        </div>)
}
function OneCircle({ count,idx }) {
    let arr = Array.apply(null, Array(count));
    for(let i=0;i<arr.length;i++){
        let a = 360 / arr.length * i+(idx%2?(180/count):0);
        arr[i]={ x: a, y: a };
    }

    return (
        <div className='overlap_circle'>
            <div className='logo_wrap'>
                {arr.map((val, i) => 
                <Dot
                    count={idx}
                    key={i}
                    x={val.x}
                    y={val.y}
                />)}
            </div>
        </div>)
}
function Dot({ x, y,count }) {
    return (<div className='dot' style={{ transform: `rotate(${x}deg) translate(${(count)*10}px) `, clipPath: `circle(${.6*count}px)`}}>A</div>)
}