import React from 'react'

const Test = () => {
    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden'
        }}>

            {/* רקע */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
                opacity: 1,
                animation: 'fadeInBg 2.5s ease forwards',
                zIndex: -1
            }} />

            {/* תוכן */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                padding: '40px',
                color: 'white'
            }}>
                <h1>שלום 👋</h1>
                <p>התמונה נטענת לאט ברקע</p>
            </div>

            {/* keyframes inline */}
            <style>
                {`
      @keyframes fadeInBg {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}
            </style>

        </div>
    )
}

export default Test