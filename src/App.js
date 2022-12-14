import './App.css'
import React, { useState, useEffect } from 'react'
import { Board } from './Board/Board'
import { Brush } from './Brush/Brush'

function App() {
  const [state, setState] = useState({
    isCrossMove: true,
    board: Array(9).fill('')
  })
  const [winner, setWinner] = useState({
    winner: '',
    winRow: null
  })

  const makeMove = (cellIndex) => {
    console.log(`move: ${cellIndex}`)
    if (winner.winner !== '') {
      return
    }
    const isCrossMove = state.isCrossMove
    setState({
      board: state.board
        .map((v, i) => i === cellIndex ? isCrossMove ? 'X' : 'O' : v),
      isCrossMove: !isCrossMove
    })
  }

  useEffect(() => {
    checkWinner()
  }, [state])

  const getWinnerBrushStyles = () => {
    const styles = {
      position: 'absolute'
    }
    console.log('winner.winRow' + winner.winRow)
    if (winner.winRow.every(v => [0, 1, 2].includes(v))) {
      styles.left = '-30%'
      styles.top = '0'
    }
    if (winner.winRow.every(v => [3, 4, 5].includes(v))) {
      styles.left = '-30%'
      styles.top = '34%'
    }
    if (winner.winRow.every(v => [6, 7, 8].includes(v))) {
      styles.left = '-30%'
      styles.top = '67%'
    }
    if (winner.winRow.every(v => [0, 3, 6].includes(v))) {
      styles.rotate = '90deg'
      styles.left = '-65%'
      styles.top = '37%'
    }
    if (winner.winRow.every(v => [1, 4, 7].includes(v))) {
      styles.rotate = '90deg'
      styles.left = '-30%'
      styles.top = '37%'
    }
    if (winner.winRow.every(v => [0, 4, 8].includes(v))) {
      styles.rotate = '45deg'
      styles.left = '-28%'
      styles.top = '32%'
    }
    if (winner.winRow.every(v => [2, 4, 6].includes(v))) {
      styles.rotate = '-45deg'
      styles.left = '-33%'
      styles.top = '32%'
    }
    return styles
  }

  const checkWinner = () => {
    const b = state.board
    const winRowOptions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    const winRow = winRowOptions.filter(w =>
      b[w[0]] === b[w[1]] && b[w[1]] === b[w[2]] && b[w[0]] !== ''
    )
    console.log('Result of winner check: ' + winRow)

    if (winRow.length > 0) {
      const newWinner = b[winRow[0][0]]
      console.log('Winner: ' + newWinner)
      setWinner({ winner: newWinner, winRow: winRow[0] })
    }
  }

  return (
    <div className="app">
      <header className="app__header">
      {winner.winner !== '' ? `Winner: ${winner.winner}` : 'Let the battle begin.'}
      </header>
      <div className="app__board">
        <Board isCrossMove={state.isCrossMove} board={state.board} makeMove={makeMove} className=""/>
        { winner.winner !== '' ? <Brush imageStyles={getWinnerBrushStyles()} /> : null}
      </div>
    </div>
  )
}

export default App
