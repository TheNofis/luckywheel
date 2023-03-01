// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   let test = 1;
//   setTimeout(()=>{
//     test++;
//     console.log(test);
//   }, 1000)
//   res.status(200).json({ name: test })
// }

import { Server } from 'socket.io'

const wheelColor = ['green', 'red', 'black', 'yellow','green', 'red', 'black', 'yellow']
const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server);

    io.on('connection', socket => {
      socket.on('wheelStart', ()=>{
        wheelStart();
      })
      function wheelStart(){       
        console.log('round start');
        const endStep = Math.floor(Math.random() * (2000 - 720) + 720);
        let step = 0;
        const interval = 5;
        const timer = setInterval(()=>{
            step+=interval;
            const endAngle = endStep-(Math.floor(endStep/360)*360);
            const endColor = wheelColor[Math.floor(endAngle/45)];
            io.emit('wheelAngle', step)
            if(step+interval>=endStep){
              console.log('new round');
              wheelEnd(endColor);
              clearInterval(timer);
            }
        }, 0.1);
      }
      function wheelEnd(endColor){
        let step = 500;
        const interval = 1;
        console.log(`round end`);
        setTimeout(() => {
            socket.emit('wheelWinColor', endColor);
            const timer = setInterval(()=>{
                step-=interval;
                socket.emit('wheelTimer', step);
                if(step<=0){
                    wheelStart();
                    clearInterval(timer);
                }
            }, 10)
        }, 5000);
    }
      socket.on('start', msg => {
        // wheelStart()
      })
    })
    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler
