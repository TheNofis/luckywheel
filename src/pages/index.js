import LastWin from '@/components/WinList.js';
import Footer from '@/components/Footer.js';
import Wheel from '@/components/Wheel.js';
import WheelTimer from '@/components/WheelTimer.js'

import { useEffect, useState } from 'react';

export default function Home() {
  const [socket, SetSocket] = useState('');
  const [lastWin, SetLastWin] = useState([]);
  const [wheelAngle, SetWheelAngle] = useState(0);
  const [wheelTimer, SetWheelTimer] = useState(0);
  useEffect(() => {
    fetch('/api/socketIO').finally(() => {
      const sockets = io.connect();
      sockets.on('connect', () => {
        sockets.emit('start')
      })
      sockets.on('wheelAngle', data => SetWheelAngle(data) )
      sockets.on('wheelWinColor', data => {
        console.log(lastWin);
        SetLastWin(old => [...old, data].reverse());
      })
      sockets.on('wheelTimer', (data)=> SetWheelTimer(data/100) )
      sockets.on('disconnect', () => {
        console.log('disconnect')
      })
      SetSocket(sockets);
    })
  }, []);
  
  function startWheel(){
    socket.emit('wheelStart')
  }
  return (
    <div className='root'>
      <div className='container'>
        <Wheel data={wheelAngle} />
        <WheelTimer data={wheelTimer} />
        <LastWin data={lastWin} />
        <Footer/>
        <button onClick={startWheel}>12</button>
      </div>
    </div>
  )
}
