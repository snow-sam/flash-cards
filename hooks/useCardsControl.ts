import React, { useState, useRef, useMemo } from 'react'
import { toast } from 'react-hot-toast'

export type useCardsControlData = {
    totalAnswers: number
    respostas: { acertos: number, erros: number },
    childRefs: Array<React.RefObject<any>>,
    onCardLeftScreen: (pos: string, index: number) => void,
    swiped: (direction: string, index: number) => void,
    swipe: (direcao: string) => Promise<void>,
    goBack: () => Promise<void>,
};

export const useCardsControl = (nCards: number): useCardsControlData => {
    const [respostas, setRespostas] = useState({ acertos: 0, erros: 0 })
    const [lastDirection, setLastDirection] = useState<string>('')
    const [currentIndex, setCurrentIndex] = useState(nCards - 1)
    const currentIndexRef = useRef(currentIndex)

    const canGoBack = currentIndex < nCards - 1
    const canSwipe = currentIndex >= 0

    const childRefs = useMemo<Array<React.RefObject<any>>>(() =>
        Array(nCards)
            .fill(0)
            .map((i) => React.createRef()),
        [nCards]
    )

    const onCardLeftScreen = (pos: string, index: number) => {
        const conf = {
            id: Math.random().toString(),
            duration: 1000,
            style: { backgroundColor: '#121212', color: 'white' },
        };

        if (pos === 'left') toast.error('Que pena!', conf);
        if (pos === 'right') toast.success('Boa!', conf);
        currentIndexRef.current >= index && childRefs[index].current.restoreCard()
    };


    const updateCurrentIndex = (val: any) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const swiped = (direction: string, index: number) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
        const { acertos, erros } = respostas
        if (direction === 'left') {
            setRespostas({ ...respostas, erros: erros + 1 })
        } else {
            setRespostas({ ...respostas, acertos: acertos + 1 })
        }
    }

    const swipe = async (direcao: string) => {
        if (canSwipe && currentIndex < nCards) {
            await childRefs[currentIndex].current.swipe(direcao) // Swipe the card!
        }
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const { acertos, erros } = respostas
        if (lastDirection === 'left') {
            setRespostas({ ...respostas, erros: erros - 1 })
        } else {
            setRespostas({ ...respostas, acertos: acertos - 1 })
        }

        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
        console.log(childRefs[newIndex])
    }

    const totalAnswers = (respostas.acertos + respostas.erros) / nCards * 100

    return {
        respostas,
        childRefs,
        onCardLeftScreen,
        swiped,
        swipe,
        goBack,
        totalAnswers
    }
}