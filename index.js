const grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

const ee = new EventTarget()

ee.addEventListener('win', ({ value: letter }) => {
  text.innerText = letter + ' wins'
})

ee.addEventListener('draw', () => {
  text.innerText = 'Draw!'
})

const state = { steps: 0 }

const app = document.getElementById('app')

const table = document.createElement('table')

app.appendChild(table)

const text = document.createElement('div')

app.appendChild(text)

const update = () => {
  Array.from(table.children).map((c) => c.remove())

  grid.map((line, line_ix) => {
    const tr = document.createElement('tr')
    line.map((cell, cell_ix) => {
      const td = document.createElement('td')
      td.style.border = '1px solid #000'
      td.style.width = '3rem'
      td.style.height = '3rem'
      td.style.textAlign = 'center'
      td.addEventListener('click', () => {
        console.log('pos', line_ix, cell_ix)
        const step = state.steps++
        const player = step % 2
        td.innerText = grid[line_ix][cell_ix] = player == 0 ? 'X' : 'O'
        check()
      })
      td.innerText = grid[line_ix][cell_ix]
      tr.appendChild(td)
    })
    table.appendChild(tr)
  })
}

update()

const check = () => {
  const lines = [
    // horizontal
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // veritcal
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonal
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ]

  const winners = lines.map(([l1, l2, l3], line_ix) => {
    const [x, y] = l1
    const letter = grid[x][y] // X ou O

    if (grid[l1[0]][l1[1]] == '') return
    if (grid[l2[0]][l2[1]] == '') return
    if (grid[l3[0]][l3[1]] == '') return

    if (grid[l1[0]][l1[1]] == grid[l2[0]][l2[1]] && grid[l2[0]][l2[1]] == grid[l3[0]][l3[1]]) {
      return letter
    }

    return null
  })

  const winner = winners.find((w) => w !== null)
  if (winner) {
    const ev = new CustomEvent('win')
    ev.value = winner
    ee.dispatchEvent(ev)
  } else {
    const all_filled = grid.every((line) => line.every((cell) => cell != ''))
    if (all_filled) {
      ee.dispatchEvent(new CustomEvent('draw'))
    }
  }
}
