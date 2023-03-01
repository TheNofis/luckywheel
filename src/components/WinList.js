export default function WinList({data}) {
  return (
    <div className='lastWin blockMenu'>
      {data.map((e, i) => (
        <div className={'blockWin '+e} key={'lastWin'+i}></div>
      ))}
    </div>
  )
}
