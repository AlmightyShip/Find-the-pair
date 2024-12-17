/* Основной стиль */
body {
    font-family: 'Chalkboard SE', serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(images/clouds.png) no-repeat center center;
    background-size: cover;
    height: 100vh;
    justify-content: center;
    margin: 0;
    overflow: hidden;
    position: relative;
}

h1 {
    color: #ff6f61;
    font-size: 32px;
    margin-bottom: 1px;
    text-shadow: 2px 2px 4px rgba(255, 223, 191, 0.75);
}

p {
    color: #ff6f61;
    font-size: 24px;
    text-shadow: 2px 2px 4px rgba(255, 223, 191, 0.75);
}

#game {
    padding:30px;
    display: flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:center;
    gap: 5px;
    margin-bottom: 70px;
}

.card {
    width: 60px;
    height: 60px;
    perspective: 1000px;
    cursor: pointer;
    box-shadow: 0 8px 16px rgba(200, 200, 200, 0.45);
    border-radius: 20px;
    transition: transform 0.2s ease-in-out;
}

.card:hover {
    transform: scale(1.07);
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.card.flipped .card-inner {
    transform: rotateY(180deg);
}

.face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #ffffff;
    border-radius: inherit;
    transition: background-color 0.3s;
}

.front {
    background: linear-gradient(135deg, #fd79a8, #fed6bd);
    background-image: url('images/stars.png');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
}

.back {
    transform: rotateY(180deg);
}

#next-level-button {
    display: none;
    margin-bottom: 50px;
    padding: 20px 40px;
    font-size: 28px;
    cursor: pointer;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(255, 153, 51, 0.85);
    transition: background-color 0.3s, transform 0.3s;
}

#next-level-button:hover {
    background-color: #ff4500;
    transform: scale(1.1);
}

#next-level-button.show {
    animation: bounceInUp 0.5s forwards;
}

#start-game-button {
    background-color: #ff6f61; 
    border: none; 
    color: white; 
    padding: 15px 32px; 
    text-align: center; 
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

#start-game-button:hover {
    background-color: #ff6f61;
}

@keyframes bounceInUp {
    from,
    60%,
    75%,
    90%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        transform: translate3d(0, 3000px, 0);
    }

    60% {
        opacity: 1;
        transform: translate3d(0, -20px, 0);
    }

    75% {
        transform: translate3d(0, 10px, 0);
    }

    90% {
        transform: translate3d(0, -5px, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}

/* Адаптация под мобильные устройства */
@media screen and (max-width: 350px) {
    body {
        height: auto;
        min-height: 100vh;
        justify-content: flex-start;
    }
    
    h1 {
        font-size: 48px;
    }
    
    p {
        font-size: 18px;
    }
    
    #game {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 25px;
        margin-top: 80px;
    }
    
    .card {
        width: 50px;
        height: 50px;
    }
    
    .front, .back {
        font-size: 42px;
    }
    
    #next-level-button {
        margin-bottom: 30px;
        padding: 15px 30px;
        font-size: 22px;
    }
}
